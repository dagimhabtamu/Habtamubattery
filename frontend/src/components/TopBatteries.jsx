import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi.js';
import { formatCurrency } from '../utils/format.js';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal.jsx';

const PLACEHOLDER = 'https://th.bing.com/th/id/OIP.sztS7CqBqcIqIFUGTBgxhgHaE8?w=258&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3'; // Placeholder image for batteries without an image

export default function TopBatteries() {
  const { data, loading } = useApi('/new-batteries?limit=4');
  const items = data?.items || [];
  return (
    <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16' aria-labelledby='top-batteries-heading'>
      <Reveal>
        <div className='flex items-end justify-between mb-8 flex-wrap gap-3'>
          <div>
            <h2 id='top-batteries-heading' className='text-3xl font-extrabold text-stone-900'>Top-Selling Batteries</h2>
            <p className='text-stone-600 mt-1'>The ones our customers keep coming back for.</p>
          </div>
          <Link to='/batteries' className='text-brand-700 hover:text-brand-800 font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all'>
            View all <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
      {loading ? (<div className='text-center py-12 text-stone-500'>Loading batteries...</div>
      ) : items.length === 0 ? (<div className='text-center py-12 text-stone-500'>No batteries listed yet.</div>
      ) : (
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {items.map((b, i) => (
            <Reveal key={b._id} delay={i * 100}>
              <article className='bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group'>
                <div className='aspect-square bg-stone-100 flex items-center justify-center relative overflow-hidden'>
                  <img src={b.imageUrl || PLACEHOLDER} alt={b.brand + ' battery'} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' loading='lazy' onError={(e) => { e.currentTarget.src = PLACEHOLDER; }} />
                  {b.warrantyMonths > 0 && (
                    <span className='absolute top-2 left-2 inline-flex items-center gap-1 bg-brand-600 text-white text-[11px] font-semibold px-2 py-1 rounded shadow'>
                      <ShieldCheck size={12} /> {b.warrantyMonths}mo
                    </span>
                  )}
                  {b.stockQuantity === 0 && (
                    <span className='absolute top-2 right-2 bg-stone-900/90 text-white text-[11px] font-semibold px-2 py-1 rounded shadow'>Sold out</span>
                  )}
                </div>
                <div className='p-4'>
                  <p className='text-xs text-stone-500 uppercase tracking-wide'>{b.brand}</p>
                  <h3 className='font-bold text-stone-900 mt-0.5'>{b.amperage}Ah {b.model && ('Â· ' + b.model)}</h3>
                  <div className='flex items-center gap-1 mt-1 text-amber-500'>
                    <Star size={12} fill='currentColor' /><Star size={12} fill='currentColor' /><Star size={12} fill='currentColor' /><Star size={12} fill='currentColor' /><Star size={12} fill='currentColor' />
                  </div>
                  <div className='flex items-center justify-between mt-3'>
                    <span className='text-xl font-extrabold text-stone-900'>{formatCurrency(b.price)}</span>
                    <Link to='/batteries' className='text-sm font-semibold text-brand-700 hover:text-brand-800'>Details â†’</Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}