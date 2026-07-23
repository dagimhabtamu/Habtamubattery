import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../hooks/useApi.js';
import { Search, Phone, MapPin, Clock, ShoppingBag, ShieldCheck, Star } from 'lucide-react';
import { formatCurrency } from '../utils/format.js';
import Modal from '../components/Modal.jsx';

const SHOP_ADDRESS    = 'XP8P+C56, Addis Ababa, Ethiopia';
const SHOP_PHONE_DISP = '+251 91 113 4195';
const SHOP_PHONE_RAW  = '+251911134195';
const GMAP_DIR        = 'https://www.google.com/maps/dir/?api=1&destination=Habtamu+Battery+XP8P+C56+Addis+Ababa';
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=400&q=80';

export default function NewBatteries() {
  const { data, loading } = useApi('/new-batteries?limit=200');
  const [brand, setBrand] = useState('');
  const [minAmp, setMinAmp] = useState(35);
  const [maxAmp, setMaxAmp] = useState(200);
  const [q, setQ] = useState('');
  const [orderItem, setOrderItem] = useState(null);

  const items = data?.items || [];
  const brands = useMemo(() => [...new Set(items.map((b) => b.brand))], [items]);

  const filtered = items.filter((b) => {
    if (brand && b.brand !== brand) return false;
    if (b.amperage < minAmp || b.amperage > maxAmp) return false;
    if (q && !(`${b.brand} ${b.model}`).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const closeOrder = () => setOrderItem(null);

  return (
    <>
      <Helmet>
        <title>New Batteries - Habtamu Batteries</title>
        <meta name="description" content="Browse our wide range of premium new car batteries from 35Ah to 200Ah. Filter by brand and amperage." />
        <meta property="og:title" content="New Car Batteries 35Ah-200Ah - Habtamu Batteries" />
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
              <input value={q} onChange={(e) => setQ(e.target.value)} className="input pl-9" placeholder="Brand or model" />
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Brand</span>
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="input mt-1">
              <option value="">All brands</option>
              {brands.map((b) => (<option key={b} value={b}>{b}</option>))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Min Amp</span>
            <input type="number" value={minAmp} min={35} max={200} onChange={(e) => setMinAmp(Number(e.target.value))} className="input mt-1" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Max Amp</span>
            <input type="number" value={maxAmp} min={35} max={200} onChange={(e) => setMaxAmp(Number(e.target.value))} className="input mt-1" />
          </label>
        </div>

        {loading ? (
          <div className="text-center py-16 text-stone-500">Loading batteries...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-500">No batteries match the filters.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((b) => {
              const isOutOfStock = b.stockQuantity === 0;
              return (
                <article
                  key={b._id}
                  className={`bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isOutOfStock ? 'opacity-75' : ''}`}
                >
                  <div
                    className="h-40 bg-cover bg-center bg-stone-100 flex items-center justify-center relative"
                    style={{ backgroundImage: b.imageUrl ? `url(${b.imageUrl})` : `url(${PLACEHOLDER_IMG})` }}
                    role="img"
                    aria-label={`${b.brand} ${b.amperage} amp battery`}
                  >
                    {b.warrantyMonths > 0 && (
                      <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-brand-600 text-white text-[11px] font-semibold px-2 py-1 rounded shadow">
                        <ShieldCheck size={12} /> {b.warrantyMonths}mo
                      </span>
                    )}
                    {isOutOfStock && (
                      <span className="absolute inset-0 bg-stone-900/60 flex items-center justify-center">
                        <span className="bg-stone-900 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">Out of stock</span>
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-stone-900">{b.brand}</h3>
                    <p className="text-sm text-stone-500">{b.model || `${b.amperage}Ah`}</p>
                    <p className="text-stone-600 text-sm mt-2 line-clamp-2 flex-1">{b.description}</p>
                    <div className="flex items-center gap-1 text-amber-500 mt-3">
                      <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                      <span className="text-xs text-stone-500 ml-1">Top rated</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2">
                      <span className="font-extrabold text-brand-700 text-lg">{formatCurrency(b.price)}</span>
                      {isOutOfStock ? (
                        <button disabled className="text-sm text-stone-400 font-semibold cursor-not-allowed px-3 py-2">
                          Unavailable
                        </button>
                      ) : (
                        <button
                          onClick={() => setOrderItem(b)}
                          className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:scale-105 transition-all shadow-sm"
                        >
                          <ShoppingBag size={14} /> Order Now
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {orderItem && (
        <Modal
          open={!!orderItem}
          onClose={closeOrder}
          title="Complete Your Order"
          footer={<button onClick={closeOrder} className="btn-secondary">Close</button>}
        >
          <div className="space-y-4">
            <div className="bg-stone-50 rounded-xl p-4 flex items-center gap-4 border border-stone-200">
              <div
                className="w-20 h-20 rounded-lg bg-cover bg-center bg-stone-200 flex-shrink-0"
                style={{ backgroundImage: `url(${orderItem.imageUrl || PLACEHOLDER_IMG})` }}
                role="img"
                aria-label={orderItem.brand}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-stone-500 uppercase tracking-wide">{orderItem.brand}</p>
                <h3 className="font-bold text-stone-900 truncate">
                  {orderItem.amperage}Ah{orderItem.model && ' · ' + orderItem.model}
                </h3>
                <p className="text-brand-700 font-extrabold text-xl mt-1">{formatCurrency(orderItem.price)}</p>
                {orderItem.warrantyMonths > 0 && (
                  <p className="text-xs text-stone-500 mt-1 inline-flex items-center gap-1">
                    <ShieldCheck size={12} className="text-brand-600" /> {orderItem.warrantyMonths} month warranty
                  </p>
                )}
              </div>
            </div>

            <p className="text-sm text-stone-600 text-center">
              We don't sell online yet. To complete your order, give us a call or visit our shop directly.
            </p>

            <a
              href={`tel:${SHOP_PHONE_RAW}`}
              className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 px-4 rounded-lg transition-all hover:scale-[1.02] shadow"
            >
              <Phone size={18} /> Call {SHOP_PHONE_DISP}
            </a>

            <div className="border-t border-stone-200 pt-4 text-center">
              <p className="text-xs uppercase tracking-wide text-stone-500 mb-2">Or visit our shop</p>
              <p className="text-sm text-stone-700 font-semibold flex items-center justify-center gap-1.5">
                <MapPin size={14} className="text-brand-600" /> {SHOP_ADDRESS}
              </p>
              <a
                href={GMAP_DIR}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-brand-700 hover:text-brand-800 mt-2 font-semibold hover:gap-2 transition-all"
              >
                Get directions on Google Maps
              </a>
              <p className="text-xs text-stone-500 mt-3 flex items-center justify-center gap-1.5">
                <Clock size={12} />
                Mon-Sat 7:00 AM - 7:00 PM · Sunday Closed
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}