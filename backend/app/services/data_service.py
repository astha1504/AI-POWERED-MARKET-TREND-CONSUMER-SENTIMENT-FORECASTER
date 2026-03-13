<<<<<<< HEAD
import pandas as pd
from app.database import get_collection

def upload_clean_data():
    df = pd.read_csv("clean_reviews.csv")
=======
from pathlib import Path

import pandas as pd
from pymongo.errors import PyMongoError

from app.database import get_collection


CLEAN_REVIEWS_PATH = (
    Path(__file__).resolve().parents[3] / "clean_reviews.csv"
)


def upload_clean_data():
    df = pd.read_csv(CLEAN_REVIEWS_PATH)
>>>>>>> 29d27de (update code with backend integration)

    collection = get_collection("cleaned_reviews")
    collection.delete_many({})  # Clear old data

    collection.insert_many(df.to_dict("records"))

    return {"message": "Clean data uploaded successfully"}
<<<<<<< HEAD
=======


def get_clean_reviews(limit: int = 0):
    try:
        collection = get_collection("cleaned_reviews")
        cursor = collection.find({}, {"_id": 0})

        if limit and limit > 0:
            cursor = cursor.limit(limit)

        reviews = list(cursor)
        if reviews:
            return reviews
    except PyMongoError:
        # Fallback to local CSV if MongoDB is not available.
        pass

    df = pd.read_csv(CLEAN_REVIEWS_PATH)
    records = df.to_dict("records")

    if limit and limit > 0:
        return records[:limit]

    return records
>>>>>>> 29d27de (update code with backend integration)
