from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from calculator import monthly_payment
import json
from pathlib import Path

app = FastAPI()

# Allow the Next.js frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Locate banks.json regardless of where the app is started
BASE_DIR = Path(__file__).resolve().parent
BANKS_FILE = BASE_DIR.parent / "data" / "banks.json"


@app.get("/")
def home():
    return {"message": "Mortgage Comparison API is running!"}


@app.get("/compare")
def compare(price: float, down: float, years: int):
    # Load bank data
    with open(BANKS_FILE, "r") as f:
        banks = json.load(f)

    # Calculate loan amount
    loan = price * (1 - down / 100)

    results = []

    for bank in banks:
        payment = monthly_payment(
            principal=loan,
            annual_rate=bank["interest"],
            years=years,
        )

        total_paid = round(payment * years * 12, 2)
        total_interest = round(total_paid - loan, 2)

        results.append(
            {
                "bank": bank["bank"],
                "interest": bank["interest"],
                "loan_amount": round(loan, 2),
                "monthly_payment": payment,
                "total_paid": total_paid,
                "total_interest": total_interest,
            }
        )

    # Sort by cheapest monthly payment
    results.sort(key=lambda x: x["monthly_payment"])

    return results