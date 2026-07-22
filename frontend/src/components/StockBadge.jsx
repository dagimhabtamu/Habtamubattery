export default function StockBadge({ qty, threshold = 5 }) {
  if (qty <= 0)
    return <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">Out of stock</span>;
  if (qty <= threshold)
    return <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-700">Low: {qty}</span>;
  return <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">In stock</span>;
}
