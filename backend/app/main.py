from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .db import SessionLocal
from . import models, schemas
from decimal import Decimal, ROUND_HALF_UP
from datetime import date as date_type

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#endpoint1 POST /convert (calculate + persist)
@app.post("/convert", response_model=schemas.ConversionResponse)
def convert(data: schemas.ConversionCreate, db: Session = Depends(get_db)):
    if data.usd_amount <= 0 or data.rate <= 0:
        raise HTTPException(status_code=400, detail="Invalid input")
    usd     = Decimal(data.usd_amount)
    rate    = Decimal(data.rate)
    jpy     = (usd * rate).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
    conversion  = models.Conversion(
        usd_amount      =usd,
        rate            =rate,
        jpy_amount      =jpy,
        rate_source     =data.rate_source,  
        conversion_date =data.conversion_date
    )
    db.add(conversion)
    db.commit()
    db.refresh(conversion)
    return conversion

#endpoint2 GET /conversions?limit=&offset=&date=YYYY-MM-DD (history list)
@app.get("/conversions")
def get_conversions(
    limit: int  = 10,
    offset: int = 0,
    date: date_type | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Conversion)
    if date:
        query   = query.filter(models.Conversion.conversion_date == date)
    conversions = query.offset(offset).limit(limit).all()
    return conversions

#endpoint3 GET /conversions/{id} (detail)
@app.get("/conversions/{id}")
def get_conversion(id: int, db: Session = Depends(get_db)):
    conversion  = db.query(models.Conversion).filter(models.Conversion.id == id).first()
    if not conversion:
        raise HTTPException(status_code=404, detail="Conversion not found")
    return conversion