from fastapi import HTTPException
import libvirt
from utils.disk_management import create_disk_image
from api.models import VMCreateRequest
import subprocess

def connect_hypervisor():
    """Se connecter à l'hyperviseur QEMU/KVM."""
    return libvirt.open('qemu:///system')

def create_vm(request: VMCreateRequest):
    """Créer une machine virtuelle persistante avec un disque principal et un ISO en lecteur de CD-ROM."""
    connexion = connect_hypervisor()
    if connexion is None:
        raise HTTPException(status_code=500, detail="Impossible de se connecter à l'hyperviseur.")

    disk_image_path = f"/home/user/Documents/miniproxmox/backend/{request.name}_disk.qcow2"
    create_disk_image(disk_image_path)

    vm_xml = f"""
    <domain type='kvm'>
      <name>{request.name}</name>
      <memory unit='KiB'>{request.memory * 1024}</memory>
      <vcpu placement='static'>{request.vcpu}</vcpu>
      <os>
        <type arch='x86_64' machine='pc-i440fx-2.9'>hvm</type>
        <boot dev='cdrom'/>
      </os>
      <devices>
        <disk type='file' device='disk'>
          <source file='{disk_image_path}'/>
          <target dev='vda' bus='virtio'/>
        </disk>
        <disk type='file' device='cdrom'>
          <source file='{request.disk_path}'/>
          <target dev='hda' bus='ide'/>
          <readonly/>
        </disk>
        <interface type='network'>
          <source network='default'/>
        </interface>
      </devices>
    </domain>
    """
    try:
        domaine = connexion.defineXML(vm_xml)
        if domaine is None:
            raise HTTPException(status_code=500, detail="La création de la VM a échoué.")
        domaine.create()
        return {"message": f"VM '{request.name}' créée et définie comme persistante avec succès."}
    except libvirt.libvirtError as e:
        raise HTTPException(status_code=500, detail=f"Libvirt Error: {str(e)}")
    finally:
        connexion.close()

def list_vms():
    """Lister toutes les machines virtuelles."""
    connexion = connect_hypervisor()
    if connexion is None:
        raise HTTPException(status_code=500, detail="Impossible de se connecter à l'hyperviseur.")
    
    # Utilisation de la commande virsh pour lister les VMs
    try:
        # Exécuter la commande virsh pour récupérer toutes les VMs (actives et éteintes) avec sudo
        result = subprocess.run(['sudo', 'virsh', 'list', '--all'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output = result.stdout.decode('utf-8')

        # Analyser la sortie et ignorer les lignes d'en-tête
        lines = output.splitlines()[2:]  # Ignorer les 2 premières lignes d'en-tête
        
        vm_list = []
        for line in lines:
            parts = line.split()
            print(parts)
            if len(parts) >= 3:
                vm_id = parts[0] if parts[0].isdigit() else None  # ID ou None si non actif
                name = parts[1]
                state = parts[2]  # "running", "shut off", etc.
                
                # Convertir l'état en code numérique

                print(state)
                if state == "fermé":
                    state_code = 0
                else:
                    state_code = 1  # "shut off"
                
                vm_info = {
                    "Nom": name,
                    "État": state_code,
                    "ID" : vm_id
                }
                vm_list.append(vm_info)

        # Si aucune VM n'est trouvée, on renvoie une liste vide
        return {"vms": vm_list}
    
    except subprocess.CalledProcessError as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la récupération des VMs: {str(e)}")
    finally:
        connexion.close()

def delete_vm(vm_name: str):
    """Supprimer une machine virtuelle par son nom."""
    connexion = connect_hypervisor()
    if connexion is None:
        raise HTTPException(status_code=500, detail="Impossible de se connecter à l'hyperviseur.")
    
    try:
        # Rechercher la VM par son nom
        domaine = connexion.lookupByName(vm_name)
        
        # Arrêter le domaine s'il est en cours d'exécution
        if domaine.isActive():
            domaine.destroy()  # Arrêter la VM

        # Vérifie si le domaine est transitoire ou persistant
        if domaine.isPersistent():
            domaine.undefine()  # Supprime la définition de la VM
        
        return {"message": f"VM '{vm_name}' supprimé avec succès."}
    except libvirt.libvirtError as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la suppression de la VM '{vm_name}': {e}")
    finally:
        connexion.close()


def start_vm(name: str):
    """Démarrer une VM par son nom."""
    connexion = connect_hypervisor()
    if connexion is None:
        raise HTTPException(status_code=500, detail="Impossible de se connecter à l'hyperviseur.")
    try:
        # Rechercher la VM par son nom
        domaine = connexion.lookupByName(name)
        if domaine.isActive():
            raise HTTPException(status_code=400, detail=f"VM {name} est déjà active.")
        domaine.create()  # Démarrer la VM
        return {"message": f"VM {name} démarrée avec succès."}
    except libvirt.libvirtError as e:
        raise HTTPException(status_code=500, detail=f"Libvirt Error: {str(e)}")
    finally:
        connexion.close()

def stop_vm(name: str):
    """Arrêter une VM par son nom."""
    connexion = connect_hypervisor()
    if connexion is None:
        raise HTTPException(status_code=500, detail="Impossible de se connecter à l'hyperviseur.")
    try:
        
        domaine = connexion.lookupByName(name)
        if not domaine.isActive():
            raise HTTPException(status_code=400, detail=f"VM {name} est déjà arrêtée.")
        domaine.destroy()  
        return {"message": f"VM {name} arrêtée avec succès."}
    except libvirt.libvirtError as e:
        raise HTTPException(status_code=500, detail=f"Libvirt Error: {str(e)}")
    finally:
        connexion.close()
