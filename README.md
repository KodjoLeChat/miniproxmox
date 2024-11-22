
# Mini Proxmox - Gestion des Machines Virtuelles

Ce projet est une version simplifiée d'un gestionnaire de machines virtuelles inspiré de Proxmox, permettant de créer, gérer et supprimer des machines virtuelles via une interface utilisateur simple et intuitive.

## Fonctionnalités

- **Lister les machines virtuelles** : Affiche les informations des VM existantes, y compris leur état, leur nom, et leur ID.
- **Créer une machine virtuelle** : Permet de spécifier la mémoire, le nombre de CPU et le chemin ISO pour créer une nouvelle VM.
- **Arrêter une machine virtuelle** : Stoppe une machine virtuelle en cours d'exécution.
- **Supprimer une machine virtuelle** : Supprime une VM par son nom.
- **Démarrer une machine virtuelle** : Relance une machine virtuelle arrêtée.

---

## Prérequis

Pour exécuter ce projet, assurez-vous d'avoir :

### Système :
- **Debian/Ubuntu** (ou tout système Linux compatible).

### Backend :
- Python 3.X ou une version plus récente.
- Les bibliothèques nécessaires installées.

```bash
sudo apt update
sudo apt install -y python3 python3-pip libvirt-clients libvirt-daemon libvirt-python
pip install fastapi uvicorn[standard] pydantic libvirt-python
```

### Frontend :
- Node.js (version 16 ou plus récente).
- React.js avec Material-UI.

---

## Installation et Configuration

### Étapes pour le Backend

1. **Cloner le dépôt** :
    ```bash
    git clone <lien_du_dépôt>
    cd <dossier_du_projet>/backend
    ```

2. **Lancer le serveur backend** :
    ```bash
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```

3. Le backend sera disponible à l'adresse suivante : [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

### Étapes pour le Frontend

1. **Naviguer dans le dossier frontend** :
    ```bash
    cd ../front
    ```

2. **Installer les dépendances** :
    ```bash
    npm install
    ```

3. **Démarrer le serveur de développement** :
    ```bash
    npm start
    ```

4. L'interface utilisateur sera accessible à [http://localhost:3000](http://localhost:3000).

---

## Structure du Projet

```plaintext
.
├── backend
│   ├── api
│   │   ├── endpoints.py      # Gestion des routes pour les VMs.
│   │   └── models.py         # Définition des modèles de données.
│   ├── services
│   │   ├── hypervisor.py     # Interactions avec Libvirt pour la gestion des VMs.
│   │   
│   ├── utils
|   |   |── disk_management.py # Fonctions liées aux disques.
│   └── main.py               # Point d'entrée du backend.
│
├── front
│   ├── src
│   │   ├── components # tous les composants / créations, suppressions, listes
│   │   ├── pages
│   │   │   ├── Home.js       # Page d'accueil.
│   │   │   ├── VirtualMachines.js # Gestion des VMs.
│   │   ├── services
│   │   │   └── api.js        # Connexion au backend.
│   └── public
│       └── images            # Illustrations utilisées dans le projet.
```

---

## Exemple d'Utilisation

1. **Démarrer les serveurs backend et frontend.**
2. **Accéder à l'interface** via [http://localhost:3000](http://localhost:3000).
3. **Effectuer des actions** comme créer, arrêter ou supprimer une machine virtuelle via l'interface utilisateur.

---

## Technologies Utilisées

### Backend :
- Python (FastAPI)
- Libvirt

### Frontend :
- React.js
- Material-UI (MUI)

---

## Vidéo Démonstration

Pour une démonstration complète de l'application, veuillez consulter la vidéo disponible via ce lien : **[https://drive.google.com/file/d/1oEWmfu7SdLgHu1-DwM0j2ec4LijXL-Ct/view?usp=sharing](#)**

---

## Auteurs

-  **SISSANI Moud & Pérès ALLAÏSSEM**

---

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
