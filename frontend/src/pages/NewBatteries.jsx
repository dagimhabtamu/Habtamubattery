import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../hooks/useApi.js';
import { Search, Filter } from 'lucide-react';
import { formatCurrency } from '../utils/format.js';
import StockBadge from '../components/StockBadge.jsx';

export default function NewBatteries() {
  const { data, loading } = useApi('/new-batteries?limit=200');
  const [brand, setBrand] = useState('');
  const [minAmp, setMinAmp] = useState(35);
  const [maxAmp, setMaxAmp] = useState(200);
  const [q, setQ] = useState('');

  const items = data?.items || [];

  const brands = useMemo(() => [...new Set(items.map((b) => b.brand))], [items]);

  const filtered = items.filter((b) => {
    if (brand && b.brand !== brand) return false;
    if (b.amperage < minAmp || b.amperage > maxAmp) return false;
    if (q && !`${b.brand} ${b.model}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>New Batteries - Habtamu Batteries</title>
        <meta
          name="description"
          content="Browse our wide range of premium new car batteries from 35Ah to 200Ah. Filter by brand and amperage."
        />
        <meta
          property="og:title"
          content="New Car Batteries 35Ah-200Ah - Habtamu Batteries"
        />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-stone-900">New Batteries</h1>
          <p className="text-stone-600">Choose the right amp rating and brand for your vehicle.</p>
        </header>

        <div className="bg-white border border-stone-200 rounded-xl p-4 mb-6 grid gap-3 md:grid-cols-4">
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Search</span>
            <div className="relative mt-1">
              <Search size={16} className="absolute top-3 left-3 text-stone-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="input pl-9"
                placeholder="Brand or model"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Brand</span>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="input mt-1"
            >
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Min Amp</span>
            <input
              type="number"
              value={minAmp}
              min={35}
              max={200}
              onChange={(e) => setMinAmp(Number(e.target.value))}
              className="input mt-1"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Max Amp</span>
            <input
              type="number"
              value={maxAmp}
              min={35}
              max={200}
              onChange={(e) => setMaxAmp(Number(e.target.value))}
              className="input mt-1"
            />
          </label>
        </div>

        {loading ? (
          <div className="text-center py-16 text-stone-500">Loading batteries...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-500">No batteries match the filters.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((b) => (
              <article
                key={b._id}
                className="bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col"
              >
                <div
                  className="h-40 bg-cover bg-center bg-stone-100 flex items-center justify-center"
                  style={{
                    backgroundImage: b.imageUrl
                      ? `url(${b.imageUrl})`
                      : "linear-gradient(135deg, #fed7aa, #c2410c)",
                  }}
                  role="img"
                  aria-label={`${b.brand} ${b.amperage} amp battery`}
                >
                  {!b.imageUrl && <span className="text-white font-extrabold text-2xl tracking-wide">{b.amperage}Ah</span>}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-stone-900">{b.brand}</h3>
                  <p className="text-sm text-stone-500">{b.model || `${b.amperage}Ah`}</p>
                  <p className="text-stone-700 text-sm mt-2 line-clamp-2">{b.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-stone-500">Warranty: {b.warrantyMonths} months</span>
                    <StockBadge qty={b.stockQuantity} />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-extrabold text-brand-700">{formatCurrency(b.price)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
