from fastapi import APIRouter
from app.services.data_service import upload_clean_data, get_clean_reviews

router = APIRouter(prefix="/data", tags=["Data"])

@router.post("/upload")
def upload():
    return upload_clean_data()


@router.get("/reviews")
def get_reviews(limit: int = 0):
    return get_clean_reviews(limit=limit)
