from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.health import router as health_router
from app.api.schools import router as schools_router
from app.core.config import settings

app = FastAPI(
    title="IDSuite API",
    version="0.1.0",
    description="Backend foundation for the IDSuite application.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Accept", "Authorization", "Content-Type"],
)

app.include_router(health_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
