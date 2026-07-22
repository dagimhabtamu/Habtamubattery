import { Helmet } from 'react-helmet-async';
import { useApi } from '../hooks/useApi.js';
import { formatCurrency } from '../utils/format.js';
import StockBadge from '../components/StockBadge.jsx';
import { Plug, Cable, Terminal, Package } from 'lucide-react';

const iconFor = (type) => {
  if (type === 'connector') return <Plug size={24} />;
  if (type === 'wire') return <Cable size={24} />;
  if (type === 'terminal') return <Terminal size={24} />;
  return <Package size={24} />;
};

export default function Accessories() {
  const { data, loading } = useApi('/accessories?limit=100');
  const items = data?.items || [];

  return (
    <>
      <Helmet>
        <title>Accessories - Habtamu Batteries</title>
        <meta
          name="description"
          content="Buy battery connectors, terminals, wires and other accessories for your vehicle."
        />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-stone-900">Accessories Shop</h1>
          <p className="text-stone-600">Quality battery accessories for every need.</p>
        </header>

        {loading ? (
          <div className="text-center py-16 text-stone-500">Loading accessories...</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((a) => (
              <article key={a._id} className="bg-white border border-stone-200 rounded-xl p-5">
                <div className="text-brand-600 mb-3">{iconFor(a.type)}</div>
                <h3 className="font-bold text-stone-900">{a.name}</h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">{a.type} &middot; {a.polarity}</p>
                <p className="text-sm text-stone-600 mt-2">Per {a.unit}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-extrabold text-brand-700">{formatCurrency(a.price)}</span>
                  <StockBadge qty={a.stockQuantity} />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
