export function Rating({ value }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      <span aria-label={`${value} out of 5 stars`}>★★★★★</span>
      <span className="ml-1 text-xs text-muted">{value.toFixed(1)}</span>
    </div>
  );
}
