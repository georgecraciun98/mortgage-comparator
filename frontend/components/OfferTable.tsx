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
  
  interface Props {
    offers: BankOffer[];
  }
  
  export default function OfferTable({ offers }: Props) {
    if (offers.length === 0) return null;
  
    const cheapest = offers[0];
    const months = 30 * 12;
  
    return (
      <div className="space-y-6">
  
        <div>
  
          <h2 className="text-3xl font-bold text-slate-800">
            Mortgage Offers
          </h2>
  
          <p className="text-slate-500 mt-1">
            Sorted by lowest monthly payment
          </p>
  
        </div>
  
        {offers.map((offer, index) => {
  
          const monthlyDifference =
            offer.monthly_payment - cheapest.monthly_payment;
  
          const savings =
            offer.total_paid - cheapest.total_paid;
  
          return (
  
            <div
              key={offer.id}
              className={`rounded-3xl shadow-lg p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                index === 0
                  ? "border-2 border-blue-500 bg-blue-50"
                  : "bg-white"
              }`}
            >
  
              <div className="flex justify-between items-start">
  
                <div>
  
                  <div className="flex items-center gap-3">
  
                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl">
                      🏦
                    </div>
  
                    <div>
  
                      <h3 className="text-2xl font-bold">
                        {offer.bank}
                      </h3>
  
                      <p className="text-slate-500">
                        {offer.product}
                      </p>
  
                    </div>
  
                  </div>
  
                </div>
  
                {index === 0 && (
  
                  <div className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold">
                    🏆 Best Offer
                  </div>
  
                )}
  
              </div>
  
              <div className="grid md:grid-cols-5 gap-8 mt-8">
  
                <div>
  
                  <p className="text-slate-500 text-sm">
                    Interest
                  </p>
  
                  <p className="text-2xl font-bold">
                    {offer.interest.toFixed(2)}%
                  </p>
  
                </div>
  
                <div>
  
                  <p className="text-slate-500 text-sm">
                    DAE
                  </p>
  
                  <p className="text-2xl font-bold">
                    {offer.dae.toFixed(2)}%
                  </p>
  
                </div>
  
                <div>
  
                  <p className="text-slate-500 text-sm">
                    Monthly Payment
                  </p>
  
                  <p className="text-3xl font-bold text-blue-600">
                    €
                    {offer.monthly_payment.toLocaleString()}
                  </p>
  
                </div>
  
                <div>
  
                  <p className="text-slate-500 text-sm">
                    Difference
                  </p>
  
                  {index === 0 ? (
  
                    <p className="text-green-600 font-bold">
                      Cheapest
                    </p>
  
                  ) : (
  
                    <p className="text-red-500 font-bold">
                      +€
                      {monthlyDifference.toFixed(2)}
                      /month
                    </p>
  
                  )}
  
                </div>
  
                <div>
  
                  <p className="text-slate-500 text-sm">
                    Extra Cost
                  </p>
  
                  {index === 0 ? (
  
                    <p className="text-green-600 font-bold">
                      €0
                    </p>
  
                  ) : (
  
                    <p className="text-red-600 font-bold">
                      €
                      {savings.toLocaleString()}
                    </p>
  
                  )}
  
                </div>
  
              </div>
  
              <div className="mt-8">
  
                <div className="w-full bg-slate-200 rounded-full h-3">
  
                  <div
                    className="bg-gradient-to-r
from-blue-600
to-indigo-600 h-3 rounded-full"
                    style={{
                      width: `${100 - (monthlyDifference / 20)}%`,
                    }}
                  />
  
                </div>
  
              </div>
  
            </div>
  
          );
        })}
  
      </div>
    );
  }