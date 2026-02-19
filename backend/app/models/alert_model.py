from pydantic import BaseModel

class AlertResponse(BaseModel):
    product: str
    message: str
    severity: str
