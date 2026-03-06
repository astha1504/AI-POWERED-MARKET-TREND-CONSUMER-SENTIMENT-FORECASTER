from apscheduler.schedulers.background import BackgroundScheduler
from app.services.trend_service import get_product_trends

scheduler = BackgroundScheduler()

def check_negative_trend():
    trends = get_product_trends()
    for t in trends:
        if t["average_score"] < -0.5:
            print("Alert: Negative trend detected for", t["_id"])

scheduler.add_job(check_negative_trend, "interval", minutes=60)
scheduler.start()
