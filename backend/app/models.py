from sqlalchemy import Column, Integer, Numeric, String, Date, DateTime
from datetime import datetime
from .db import Base

class Conversion(Base):

    __tablename__ = "conversions"

    id = Column(Integer, primary_key=True, index=True)
    usd_amount = Column(Numeric(12,2), nullable=False)
    rate = Column(Numeric(12,6), nullable=False)
    jpy_amount = Column(Numeric(12,0), nullable=False)
    rate_source = Column(String(50))
    conversion_date = Column(Date, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)