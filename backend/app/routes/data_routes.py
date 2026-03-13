from fastapi import APIRouter
<<<<<<< HEAD
from app.services.data_service import upload_clean_data
=======
from app.services.data_service import upload_clean_data, get_clean_reviews
>>>>>>>29d27de (update code with backend integration)

router = APIRouter(prefix="/data", tags=["Data"])

@router.post("/upload")
def upload():
    return upload_clean_data()
<<<<<<< HEAD
=======


@router.get("/reviews")
def get_reviews(limit: int = 0):
    return get_clean_reviews(limit=limit)
>>>>>>> 29d27de (update code with backend integration)
