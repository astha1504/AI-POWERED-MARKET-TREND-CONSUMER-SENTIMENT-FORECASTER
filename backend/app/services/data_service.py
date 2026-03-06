import pandas as pd
from app.database import get_collection

def upload_clean_data():
    df = pd.read_csv("clean_reviews.csv")

    collection = get_collection("cleaned_reviews")
    collection.delete_many({})  # Clear old data

    collection.insert_many(df.to_dict("records"))

    return {"message": "Clean data uploaded successfully"}
