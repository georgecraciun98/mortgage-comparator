interface BestOffer {
    bank: string;
    product: string;
    interest: number;
    dae: number;
    monthly_payment: number;
    total_paid: number;
  }
  
  interface Props {
    offer?: BestOffer;
  }
  
  export default function BestOfferCard({ offer }: Props) {
    if (!offer) {
      return (
        <div className="bg-white/90
backdrop-blur-lg
border
border-slate-200 rounded-3xl shadow-lg p-8 h-full flex items-center justify-center">
          <p className="text-slate-400">
            Compare offers to see the best mortgage.
          </p>
        </div>
      );
    }
  
    return (
      <div className="rounded-3xl p-8 text-white shadow-xl bg-gradient-to-br from-cyan-500

via-blue-600

to-indigo-700">
  
        <div className="text-5xl mb-4">
          🏆
        </div>
  
        <p className="uppercase text-sm tracking-widest opacity-80">
          Best Offer
        </p>
  
        <h2 className="text-3xl font-bold mt-2">
          {offer.bank}
        </h2>
  
        <p className="opacity-90 mt-1">
          {offer.product}
        </p>
  
        <div className="mt-8">
  
          <p className="text-sm opacity-80">
            Monthly Payment
          </p>
  
          <h1 className="text-5xl font-bold">
            €
            {offer.monthly_payment.toLocaleString()}
          </h1>
  
        </div>
  
        <div className="grid grid-cols-2 gap-6 mt-10">
  
          <div>
  
            <p className="opacity-80 text-sm">
              Interest
            </p>
  
            <p className="text-2xl font-bold">
              {offer.interest.toFixed(2)}%
            </p>
  
          </div>
  
          <div>
  
            <p className="opacity-80 text-sm">
              DAE
            </p>
  
            <p className="text-2xl font-bold">
              {offer.dae.toFixed(2)}%
            </p>
  
          </div>
  
        </div>
  
      </div>
    );
  }