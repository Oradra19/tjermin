import { SearchX } from "lucide-react";

export function EmptyState({ onReset }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-surface px-6 py-16 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-navy shadow-sm"><SearchX size={22} /></div>
      <h3 className="mt-5 text-lg font-bold">No products found</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">Try a different keyword or reset the filters to explore the full collection.</p>
      <button onClick={onReset} className="mt-6 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D355D]">Reset filters</button>
    </div>
  );
}
