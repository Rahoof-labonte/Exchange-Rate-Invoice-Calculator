from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .db import SessionLocal, engine, Base
from . import models, schemas
from decimal import Decimal, ROUND_HALF_UP
from datetime import date as date_type

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#endpoint1 POST /convert (calculate + persist)
@app.post("/convert", response_model=schemas.ConversionResponse)
def convert(data: schemas.ConversionCreate, db: Session = Depends(get_db)):
    if data.usd_amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid USD amount")
    if data.rate <= 0:
        raise HTTPException(status_code=400, detail="Invalid conversion rate")
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
    limit: int  = 25,
    offset: int = 0,
    date: date_type | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Conversion).order_by(models.Conversion.created_at.desc())
    if date:
        query   = query.filter(models.Conversion.conversion_date == date).order_by(models.Conversion.created_at.desc())
    total = query.count()
    conversions = query.offset(offset).limit(limit).all()
    if not conversions:
        raise HTTPException(status_code=404, detail="No conversions found")
    return {
        "data": conversions,
        "total": total
    }

#endpoint3 GET /conversions/{id} (detail)
@app.get("/conversions/{id}")
def get_conversion(id: int, db: Session = Depends(get_db)):
    conversion  = db.query(models.Conversion).filter(models.Conversion.id == id).first()
    if not conversion:
        raise HTTPException(status_code=404, detail="Conversion not found")
    return conversion

#endpoint4 DELETE /conversions/{id} (delete)
@app.delete("/conversions/{id}")
def delete_conversion(id: int, db: Session = Depends(get_db)):
    conversion  = db.query(models.Conversion).filter(models.Conversion.id == id).first()
    if not conversion:
        raise HTTPException(status_code=404, detail="Conversion not found")
    db.delete(conversion)
    db.commit()
    return { "message": "Conversion deleted","id": id}