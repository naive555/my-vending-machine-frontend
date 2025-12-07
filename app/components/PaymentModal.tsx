import { ProductWithStock } from "../api/products";
import { Change } from "../api/purchase";
import { VALID_DENOMS } from "../util/constant";

export default function PaymentModal({
  selected,
  payment,
  setPayment,
  loading,
  message,
  change,
  onPurchase,
}: {
  selected: ProductWithStock;
  payment: Record<number, number>;
  setPayment: (p: Record<number, number>) => void;
  loading: boolean;
  message: string;
  change: Change[] | null;
  onPurchase: () => void;
}) {
  const updateDenom = (denom: number, value: number) => {
    setPayment({ ...payment, [denom]: value });
  };

  return (
    <div className="p-4 border rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Buy: {selected.name}</h2>

      <div className="grid grid-cols-2 gap-2">
        {VALID_DENOMS.map((denom) => {
          const inputId = `denom-${denom}`;
          return (
            <div key={denom}>
              <label htmlFor={inputId} className="text-sm font-semibold">
                {denom} x
              </label>

              <input
                id={inputId}
                type="number"
                placeholder={`enter payment ${denom}`}
                min={0}
                value={payment[denom] || 0}
                onChange={(e) => updateDenom(denom, Number(e.target.value))}
                className="border p-2 w-full rounded"
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={onPurchase}
        disabled={loading}
        className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg w-full disabled:opacity-50"
      >
        {loading ? "Processing..." : "Purchase"}
      </button>

      {message && <div className="mt-3 text-sm font-semibold">{message}</div>}

      {change && (
        <div className="mt-2 text-sm">
          Change returned:
          <ul>
            {change.map((c) => (
              <li key={c.denomination}>
                {c.denomination} x {c.count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
