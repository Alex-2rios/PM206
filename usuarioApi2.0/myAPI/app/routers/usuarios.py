from typing import Optional
from fastapi import HTTPException, Depends, APIRouter, status
import asyncio
from app.models.usuario import UsuarioBase
from app.security.auth import verificar_Peticion

from sqlalchemy.orm import Session
from app.data.db import get_db
from app.data.usuario import Usuario as usuarioDB 
router = APIRouter(
    prefix="/v1/usuarios",
    tags=["CRUD HTTP"]
)

@router.get("/") 
async def consulta_usuarios(db: Session = Depends(get_db)):
    usuarios_db = db.query(usuarioDB).all()
    return {
        "status": "200",
        "total": len(usuarios_db),
        "data": usuarios_db
    }

@router.get("/{id}")
async def consulta_usuario_por_id(id: int, db: Session = Depends(get_db)):
    usuario = db.query(usuarioDB).filter(usuarioDB.id == id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {
        "status": "200",
        "data": usuario
    }

@router.post("/", status_code=status.HTTP_201_CREATED)
async def agregar_usuarios(usuarioP: UsuarioBase, db: Session = Depends(get_db)):
    nuevo_usuario = usuarioDB(nombre=usuarioP.nombre, edad=usuarioP.edad)
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return {
        "mensaje": "Usuario agregado correctamente",
        "datos": nuevo_usuario,
        "status": "201"  
    }

@router.put("/{id}")
async def actualizar_usuario(id: int, usuarioP: UsuarioBase, db: Session = Depends(get_db)):
    usuario = db.query(usuarioDB).filter(usuarioDB.id == id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    usuario.nombre = usuarioP.nombre
    usuario.edad = usuarioP.edad
    
    db.commit()
    db.refresh(usuario)
    return {
        "mensaje": "Usuario actualizado completamente",
        "datos": usuario,
        "status": "200"
    }

@router.patch("/{id}")
async def patch_usuario(id: int, nombre: Optional[str] = None, edad: Optional[int] = None, db: Session = Depends(get_db)):
    usuario = db.query(usuarioDB).filter(usuarioDB.id == id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if nombre is not None:
        usuario.nombre = nombre
    if edad is not None:
        usuario.edad = edad
        
    db.commit()
    db.refresh(usuario)
    return {
        "mensaje": "Usuario actualizado parcialmente",
        "datos": usuario,
        "status": "200"
    }

@router.delete("/{id}")
async def eliminar_usuario(id: int, db: Session = Depends(get_db), usuarioAuth: str = Depends(verificar_Peticion)):
    usuario = db.query(usuarioDB).filter(usuarioDB.id == id).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    db.delete(usuario)
    db.commit()
    return {
        "mensaje": f"Usuario con ID {id} eliminado correctamente por {usuarioAuth}",
        "status": "200"
    }