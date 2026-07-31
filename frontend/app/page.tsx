"use client";

import { useState } from "react";
import axios from "axios";

interface BankOffer {
  bank: string;
  interest: number;
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

  const compareLoans = async () => {
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

      setBanks(response.data);
    } catch (error) {
      console.error(error);
      alert("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Romanian Mortgage Comparator
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">

          <div className="grid grid-cols-3 gap-6">

            <div>
              <label className="block mb-2 font-semibold">
                Apartment Price (€)
              </label>

              <input
                type="number"
                className="w-full border rounded p-2"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Down Payment (%)
              </label>

              <input
                type="number"
                className="w-full border rounded p-2"
                value={down}
                onChange={(e) => setDown(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Loan Years
              </label>

              <input
                type="number"
                className="w-full border rounded p-2"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>

          </div>

          <button
            onClick={compareLoans}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Compare Banks
          </button>

        </div>

        {loading && (
          <p className="text-lg">
            Calculating offers...
          </p>
        )}

        {banks.length > 0 && (

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-4">
              Mortgage Offers
            </h2>

            <table className="w-full border-collapse">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-3">Bank</th>

                  <th className="text-left p-3">
                    Interest
                  </th>

                  <th className="text-left p-3">
                    Monthly Payment
                  </th>

                  <th className="text-left p-3">
                    Total Interest
                  </th>

                  <th className="text-left p-3">
                    Total Paid
                  </th>

                </tr>

              </thead>

              <tbody>

                {banks.map((bank) => (

                  <tr
                    key={bank.bank}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3 font-semibold">
                      {bank.bank}
                    </td>

                    <td className="p-3">
                      {bank.interest}%
                    </td>

                    <td className="p-3 text-green-600 font-bold">
                      €
                      {bank.monthly_payment.toLocaleString()}
                    </td>

                    <td className="p-3">
                      €
                      {bank.total_interest.toLocaleString()}
                    </td>

                    <td className="p-3">
                      €
                      {bank.total_paid.toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </main>
  );
}