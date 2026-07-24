import Reveal from './Reveal.jsx';
import { Camera } from 'lucide-react';

const PHOTOS = [
  { src: 'https://th.bing.com/th/id/R.5a39880faad139f50ca127b1bb447204?rik=N%2fJE%2bfcrgTJmug&riu=http%3a%2f%2fwww.exebatteries.com%2fimg%2fbattery_stock_1.jpg&ehk=vnyUcBOmoSiui35jSHqWWj7EQcFbRFFZiU6UXeBYIjM%3d&risl=&pid=ImgRaw&r=0', alt: 'Battery display in shop',     tall: true  },
  { src: 'https://images.unsplash.com/photo-1661997608910-da43d46039a8?auto=format&fit=crop&w=800&q=80', alt: 'Premium car battery',          tall: false },
  { src: 'https://images.unsplash.com/photo-1625055930842-b9ad84b7facd?auto=format&fit=crop&w=800&q=80', alt: 'Battery terminals inspection', tall: false },
  { src: 'https://plus.unsplash.com/premium_photo-1661770030805-0abb8fd880f1?auto=format&fit=crop&w=800&q=80', alt: 'New battery ready to install', tall: true  },
  { src: 'https://plus.unsplash.com/premium_photo-1661434779070-cf8fc0e253ab?auto=format&fit=crop&w=800&q=80', alt: 'Battery acid refill service',  tall: false },
  { src: 'https://plus.unsplash.com/premium_photo-1661717357358-67ae75ca57cd?auto=format&fit=crop&w=800&q=80',  alt: 'Expert installation service',  tall: false },
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