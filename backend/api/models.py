# api/models.py
from pydantic import BaseModel

class VMCreateRequest(BaseModel):
    name: str
    memory: int
    vcpu: int
    disk_path: str
