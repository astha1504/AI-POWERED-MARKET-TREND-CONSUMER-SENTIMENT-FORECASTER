from fastapi import APIRouter
from app.services.trend_service import get_product_trends

router = APIRouter(prefix="/trend", tags=["Trend"])

@router.get("/")
def trends():
    return get_product_trends()
