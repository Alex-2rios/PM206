from fastapi import FastAPI
from app.routers import usuarios, misc
from app.data.db import engine
from app.data import usuario
from fastapi.middleware.cors import CORSMiddleware
usuario.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Mi primera API",
    description="Alex Rios Carballo", 
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(usuarios.router) 
app.include_router(misc.router)