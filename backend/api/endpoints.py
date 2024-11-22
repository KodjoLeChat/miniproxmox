# api/endpoints.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.hypervisor import create_vm, list_vms, delete_vm, start_vm, stop_vm

router = APIRouter()

# Modèle pour la création d'une machine virtuelle
class VMCreateRequest(BaseModel):
    name: str
    memory: int
    vcpu: int
    disk_path: str

@router.post("/vms/")
def api_create_vm(request: VMCreateRequest):
    return create_vm(request)

@router.get("/vms/")
def api_list_vms():
    return list_vms()

@router.delete("/vms/{vm_name}")
def api_delete_vm(vm_name: str):
    return delete_vm(vm_name)

@router.post("/vms/{name}/start")
def api_start_vm(name: str):
    return start_vm(name)

@router.post("/vms/{name}/stop")
def api_stop_vm(name: str):
    return stop_vm(name)
