"use client";

import { useState } from "react";
import axios from "axios";

import Slider from "@/components/Slider";
import LoanSummary from "@/components/LoanSummary";
import BestOfferCard from "@/components/BestOfferCard";
import OfferTable from "@/components/OfferTable";

interface BankOffer {
  id: number;
  bank: string;
  product: string;
  interest: number;
  dae: number;
  loan_amount: number;
  monthly_payment: number;
  total_paid: number;
  total_interest: number;
}

export default function Home() {
  const [price, setPrice] = useState(100000);
  const [down, setDown] = useState(20);
  const [years, setYears] = useState(30);

  const [banks, setBanks] = useState<BankOffer[]>([]);
  const [loading, setLoading] = useState(false);

  async function compareLoans() {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:8000/compare",
        {
          params: {
            price,
            down,
            years,
          },
        }
      );

      const sorted = [...response.data].sort(
        (a, b) => a.monthly_payment - b.monthly_payment
      );

      setBanks(sorted);
    } catch (err) {
      console.error(err);
      alert("Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">

        <div className="max-w-7xl mx-auto px-8 py-14">

          <h1 className="text-5xl font-bold">
            Romanian Mortgage Comparator
          </h1>

          <p className="mt-4 text-slate-300 text-xl max-w-2xl">
            Compare mortgage offers from Romania's leading banks,
            calculate your monthly payment and find the cheapest loan
            in seconds.
          </p>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Calculator + Best Offer */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left */}

          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-3xl shadow-xl p-8">

            <h2 className="text-3xl font-bold mb-10">
              Mortgage Calculator
            </h2>

            <div className="space-y-10">

              <Slider
                label="Apartment Price"
                value={price}
                min={30000}
                max={300000}
                step={5000}
                prefix="€"
                onChange={setPrice}
              />

              <Slider
                label="Down Payment"
                value={down}
                min={15}
                max={60}
                suffix="%"
                onChange={setDown}
              />

              <Slider
                label="Loan Duration"
                value={years}
                min={5}
                max={35}
                suffix=" years"
                onChange={setYears}
              />

            </div>

            <div className="mt-10">

              <LoanSummary
                price={price}
                down={down}
                years={years}
              />

            </div>

            <button
              onClick={compareLoans}
              className="w-full mt-8 rounded-xl bg-gradient-to-r
from-blue-600
to-indigo-600 hover:bg-blue-700 transition text-white font-bold text-lg py-4
hover:scale-[1.02]
hover:shadow-xl
transition-all
duration-300"
            >
              Compare Banks
            </button>

          </div>

          {/* Right */}

          <BestOfferCard
            offer={banks.length ? banks[0] : undefined}
          />

        </div>

        {/* Loading */}

        {loading && (

          <div className="mt-12 text-center">

            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>

            <p className="mt-4 text-slate-500">
              Calculating mortgage offers...
            </p>

          </div>

        )}

        {/* Results */}

        {!loading && banks.length > 0 && (

          <div className="mt-12">

            <OfferTable offers={banks} />

          </div>

        )}

      </div>

    </main>
  );
}