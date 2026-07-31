from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from calculator import monthly_payment
from database import get_db
from models import MortgageProduct

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Mortgage Comparison API is running!"
    }


@app.get("/compare")
def compare(
    price: float,
    down: float,
    years: int,
    db: Session = Depends(get_db),
):
    loan = price * (1 - down / 100)

    products = (
        db.query(MortgageProduct)
        .filter(MortgageProduct.active == True)
        .all()
    )

    results = []

    for product in products:

        payment = monthly_payment(
            principal=loan,
            annual_rate=product.interest_rate,
            years=years,
        )

        total_paid = round(payment * years * 12, 2)
        total_interest = round(total_paid - loan, 2)

        results.append(
            {   "id": product.id,
                "bank": product.bank.name,
                "product": product.product_name,
                "interest": product.interest_rate,
                "dae": product.dae,
                "loan_amount": round(loan, 2),
                "monthly_payment": payment,
                "total_paid": total_paid,
                "total_interest": total_interest,
                "updated_at": product.updated_at,
            }
        )

    results.sort(key=lambda x: x["monthly_payment"])

    return results