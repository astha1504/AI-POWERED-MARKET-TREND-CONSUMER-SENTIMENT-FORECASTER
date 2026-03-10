import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import data_routes, sentiment_routes, trend_routes, rag_routes, alert_routes

app = FastAPI(title="AI Market Trend Forecaster")

frontend_origins = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in frontend_origins if origin.strip()],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_routes.router)
app.include_router(sentiment_routes.router)
app.include_router(trend_routes.router)
# app.include_router(rag_routes.router)
app.include_router(alert_routes.router)

@app.get("/")
def health_check():
    return {"status": "Backend Running Successfully"}
