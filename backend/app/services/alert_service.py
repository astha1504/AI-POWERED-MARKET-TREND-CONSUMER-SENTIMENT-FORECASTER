# from app.database import get_collection

# def check_alerts():
#     col = get_collection("sentiment_results")

#     pipeline = [
#         {"$group": {"_id": "$product", "avg_score": {"$avg": "$score"}}}
#     ]

#     results = list(col.aggregate(pipeline))

#     alerts = []

#     for r in results:
#         if r["avg_score"] < -0.5:
#             alerts.append({
#                 "product": r["_id"],
#                 "message": "Negative sentiment spike detected",
#                 "severity": "High"
#             })

#     return alerts


from app.database import get_collection

def check_alerts():
    col = get_collection("sentiment_results")

    pipeline = [
        {"$group": {"_id": "$product", "avg_score": {"$avg": "$score"}}}
    ]

    results = list(col.aggregate(pipeline))

    alerts = []

    for r in results:
        if r["avg_score"] < -0.5:
            alerts.append({
                "product": r["_id"],
                "message": "Negative sentiment spike detected",
                "severity": "High"
            })

    return alerts
