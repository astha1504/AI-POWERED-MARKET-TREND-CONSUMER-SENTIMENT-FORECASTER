from pydantic import BaseModel

class SentimentResponse(BaseModel):
    product: str
    review: str
    sentiment: str
    score: float
