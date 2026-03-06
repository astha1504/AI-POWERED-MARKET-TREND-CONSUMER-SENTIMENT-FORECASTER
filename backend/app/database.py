from pymongo import MongoClient
from app.config import MONGO_URI, DB_NAME

# Create MongoDB client
client = MongoClient(MONGO_URI)

# Select Database
db = client[DB_NAME]

cleaned_reviews_collection = db["cleaned_reviews"]
sentiment_results_collection = db["sentiment_results"]
alerts_collection = db["alerts"] 


def get_collection(name: str):
    return db[name]
