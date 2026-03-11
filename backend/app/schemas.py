from pydantic import BaseModel, Field
from datetime import date

class ConversionCreate(BaseModel):

    usd_amount: float
    rate: float
    rate_source: str
    conversion_date: date


class ConversionResponse(BaseModel):

    id: int
    usd_amount: float
    rate: float
    jpy_amount: float
    rate_source: str
    conversion_date: date

    class Config:
        orm_mode = True