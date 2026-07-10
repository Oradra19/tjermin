import { Minus, Plus } from "lucide-react";
export function QuantitySelector({ value, onChange }) {
  return (
    <div className="flex w-fit items-center gap-4 rounded-lg border border-slate-200 px-3 py-2">
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus size={16} />
      </button>
      <span className="w-4 text-center text-sm font-semibold">{value}</span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
