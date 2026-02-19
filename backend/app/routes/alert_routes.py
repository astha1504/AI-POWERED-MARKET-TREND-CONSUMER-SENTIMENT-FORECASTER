from fastapi import APIRouter
from app.services.alert_service import check_alerts

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("/")
def get_alerts():
    return check_alerts()
