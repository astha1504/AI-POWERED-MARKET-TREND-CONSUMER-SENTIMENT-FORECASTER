from pydantic import BaseModel

class Review(BaseModel):
    product: str
    review: str
    rating: float
