import Reveal from './Reveal.jsx';
import { Camera } from 'lucide-react';

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80', alt: 'Battery display in shop',     tall: true  },
  { src: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80', alt: 'Premium car battery',          tall: false },
  { src: 'https://images.unsplash.com/photo-1599256871679-b6f17c2c4597?auto=format&fit=crop&w=800&q=80', alt: 'Battery terminals inspection', tall: false },
  { src: 'https://images.unsplash.com/photo-1620891549027-942faecbd1b?auto=format&fit=crop&w=800&q=80', alt: 'New battery ready to install', tall: true  },
  { src: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&w=800&q=80', alt: 'Battery acid refill service',  tall: false },
  { src: 'https://images.unsplash.com/photo-1632823471565-1ecdf5c6da77?auto=format&fit=crop&w=800&q=80',  alt: 'Expert installation service',  tall: false },
];

export default function Gallery() {
  return (
    <section className='bg-stone-50' aria-labelledby='gallery-heading'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <Reveal>
          <div className='text-center mb-10'>
            <p className='text-brand-700 font-semibold uppercase tracking-wider text-xs mb-2 flex items-center justify-center gap-1'>
              <Camera size={14} /> Inside Our Shop
            </p>
            <h2 id='gallery-heading' className='text-3xl font-extrabold text-stone-900'>A Look Behind the Counter</h2>
            <p className='text-stone-600 mt-2 max-w-xl mx-auto'>
              Real batteries. Real tools. Real people who know what they are doing.
            </p>
          </div>
        </Reveal>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]'>
          {PHOTOS.map((p, i) => (
            <Reveal
              key={p.src}
              delay={i * 80}
              className={
                i === 0 ? 'md:col-span-2 md:row-span-2' :
                i === 3 ? 'md:row-span-2' : ''
              }
            >
              <div className='group relative w-full h-full overflow-hidden rounded-xl bg-stone-200 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500'>
                <img
                  src={p.src}
                  alt={p.alt}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                  loading='lazy'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                  <p className='text-white text-sm font-semibold'>{p.alt}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}