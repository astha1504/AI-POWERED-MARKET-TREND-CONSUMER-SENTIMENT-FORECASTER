from fastapi import APIRouter
from app.services.data_service import upload_clean_data

router = APIRouter(prefix="/data", tags=["Data"])

@router.post("/upload")
def upload():
    return upload_clean_data()
