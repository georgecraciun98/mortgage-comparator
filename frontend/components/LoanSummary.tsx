interface Props {
    price: number;
    down: number;
    years: number;
  }
  
  export default function LoanSummary({
    price,
    down,
    years,
  }: Props) {
  
    const loan = price * (1 - down / 100);
  
    return (
  
      <div className="bg-white rounded-3xl shadow-lg p-8">
  
        <h2 className="text-2xl font-bold mb-8">
          Mortgage Calculator
        </h2>
  
        <div className="space-y-6">
  
          <div className="flex justify-between">
  
            <span className="text-slate-500">
              Apartment
            </span>
  
            <span className="font-bold">
              €
              {price.toLocaleString()}
            </span>
  
          </div>
  
          <div className="flex justify-between">
  
            <span className="text-slate-500">
              Down payment
            </span>
  
            <span className="font-bold">
              {down}%
            </span>
  
          </div>
  
          <div className="flex justify-between">
  
            <span className="text-slate-500">
              Loan Amount
            </span>
  
            <span className="text-emerald-600 text-xl font-bold">
              €
              {loan.toLocaleString()}
            </span>
  
          </div>
  
          <div className="flex justify-between">
  
            <span className="text-slate-500">
              Duration
            </span>
  
            <span className="font-bold">
              {years} years
            </span>
  
          </div>
  
        </div>
  
      </div>
  
    );
  }