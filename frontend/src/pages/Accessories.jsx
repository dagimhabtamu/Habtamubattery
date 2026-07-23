import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../hooks/useApi.js';
import { formatCurrency } from '../utils/format.js';
import Modal from '../components/Modal.jsx';
import { Plug, Cable, Terminal, Package, Phone, MapPin, Clock, ShoppingBag } from 'lucide-react';

const SHOP_ADDRESS    = 'XP8P+C56, Addis Ababa, Ethiopia';
const SHOP_PHONE_DISP = '+251 91 113 4195';
const SHOP_PHONE_RAW  = '+251911134195';
const GMAP_DIR        = 'https://www.google.com/maps/dir/?api=1&destination=Habtamu+Battery+XP8P+C56+Addis+Ababa';

const iconFor = (type) => {
  if (type === 'connector') return <Plug size={24} />;
  if (type === 'wire') return <Cable size={24} />;
  if (type === 'terminal') return <Terminal size={24} />;
  return <Package size={24} />;
};

export default function Accessories() {
  const { data, loading } = useApi('/accessories?limit=100');
  const items = data?.items || [];
  const [orderItem, setOrderItem] = useState(null);
  const closeOrder = () => setOrderItem(null);

  return (
    <>
      <Helmet>
        <title>Accessories - Habtamu Batteries</title>
        <meta name="description" content="Buy battery connectors, terminals, wires and other accessories for your vehicle." />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-stone-900">Accessories Shop</h1>
          <p className="text-stone-600">Quality battery accessories for every need.</p>
        </header>

        {loading ? (
          <div className="text-center py-16 text-stone-500">Loading accessories...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-stone-500">No accessories listed yet.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((a) => {
              const isOutOfStock = a.stockQuantity === 0;
              return (
                <article
                  key={a._id}
                  className={`bg-white border border-stone-200 rounded-xl p-5 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${isOutOfStock ? 'opacity-75' : ''}`}
                >
                  <div className="text-brand-600 mb-3">{iconFor(a.type)}</div>
                  <h3 className="font-bold text-stone-900">{a.name}</h3>
                  <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">{a.type} &middot; {a.polarity}</p>
                  <p className="text-sm text-stone-600 mt-2 flex-1">Per {a.unit}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-extrabold text-brand-700 text-lg">{formatCurrency(a.price)}</span>
                    {isOutOfStock ? (
                      <button disabled className="text-sm text-stone-400 font-semibold cursor-not-allowed px-3 py-2">
                        Unavailable
                      </button>
                    ) : (
                      <button
                        onClick={() => setOrderItem(a)}
                        className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-3 py-2 rounded-lg hover:scale-105 transition-all shadow-sm"
                      >
                        <ShoppingBag size={14} /> Order Now
                      </button>
                    )}
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
              <div className="w-16 h-16 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                {iconFor(orderItem.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-stone-500 uppercase tracking-wide">{orderItem.type}</p>
                <h3 className="font-bold text-stone-900 truncate">{orderItem.name}</h3>
                <p className="text-xs text-stone-500 mt-0.5">Polarity: {orderItem.polarity} &middot; Per {orderItem.unit}</p>
                <p className="text-brand-700 font-extrabold text-xl mt-1">{formatCurrency(orderItem.price)}</p>
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
                Mon-Sat 7:00 AM - 7:00 PM &middot; Sunday Closed
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}