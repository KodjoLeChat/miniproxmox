# utils/disk_management.py
import os
import subprocess

def create_disk_image(disk_image_path: str, size: str = "10G"):
    if not os.path.exists(disk_image_path):
        subprocess.run(["qemu-img", "create", "-f", "qcow2", disk_image_path, size], check=True)
