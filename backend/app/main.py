from fastapi import FastAPI
from app.routes import data_routes, sentiment_routes, trend_routes, rag_routes, alert_routes

app = FastAPI(title="AI Market Trend Forecaster")

app.include_router(data_routes.router)
app.include_router(sentiment_routes.router)
app.include_router(trend_routes.router)
# app.include_router(rag_routes.router)
app.include_router(alert_routes.router)

@app.get("/")
def health_check():
    return {"status": "Backend Running Successfully"}
