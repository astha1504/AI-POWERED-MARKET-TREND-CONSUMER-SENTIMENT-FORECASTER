from app.database import sentiment_results_collection

def get_product_trends():
    pipeline = [
        {"$match": {"sentiment": "negative"}},
        {"$group": {"_id": "$product", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]

    return list(sentiment_results_collection.aggregate(pipeline))



