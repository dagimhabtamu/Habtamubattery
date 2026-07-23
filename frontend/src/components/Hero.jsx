import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Wrench, Recycle } from 'lucide-react';
import Reveal from './Reveal.jsx';
import useScrollY from '../hooks/useScrollY.js';

const HERO_IMG   = 'https://images.unsplash.com/photo-1676337167752-2062c6ca7366?auto=format&fit=crop&w=1920&q=80';
const IMG_TRADE  = 'https://images.unsplash.com/photo-1611159491892-c9d4d4b8b8e8?auto=format&fit=crop&w=800&q=80';
const IMG_REPAIR = 'https://images.unsplash.com/photo-1581094488379-6c9d2eb6b0ee?auto=format&fit=crop&w=800&q=80';
const IMG_SHOP   = 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80';

export default function Hero() {
  const scrollY = useScrollY();
  return (
    <section className='relative overflow-hidden'>
      <div
        className='relative h-[78vh] min-h-[560px] flex items-center justify-center bg-cover bg-center'
        style={{
          backgroundImage:
            'linear-gradient(rgba(28,25,23,0.65), rgba(28,25,23,0.75)), url(' + HERO_IMG + ')',
          transform: 'translateY(' + (scrollY * 0.3) + 'px) scale(' + (1 + scrollY * 0.0002) + ')',
          willChange: 'transform',
        }}
        aria-label='Habtamu Batteries showroom'
        role='img'
      >
        <div className='max-w-4xl mx-auto text-center px-6 text-white'>
          <Reveal>
            <p className='inline-block bg-brand-600/90 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 hover:scale-105 transition-transform'>
              Trusted Since Day One
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4'>
              Power Your Drive. <span className='text-brand-400'>Every Time.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className='text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-8'>
              Premium new car batteries from 35Ah to 200Ah, expert trade-ins,
              accessories, repairs, and battery acid by the liter.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className='flex flex-col sm:flex-row justify-center gap-3'>
              <Link to='/batteries' className='btn-primary inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg'>
                Shop Batteries <ArrowRight size={18} />
              </Link>
              <Link
                to='/services'
                className='inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold py-2.5 px-5 rounded-lg border border-white/30 hover:scale-105 transition-all'
              >
                Services <Wrench size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
        <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce'>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <path d='M6 9l6 6 6-6' />
          </svg>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10'>
        <div className='grid gap-4 md:grid-cols-3'>
          <Reveal>
            <FeatureCard
              icon={<ShieldCheck className='text-brand-600' />}
              title='Warranty on Every Battery'
              text='All new batteries include manufacturer warranty up to 24 months.'
              img={IMG_SHOP}
            />
          </Reveal>
          <Reveal delay={120}>
            <FeatureCard
              icon={<Recycle className='text-brand-600' />}
              title='Trade-In Program'
              text='Swap your old battery and pay only the price difference.'
              img={IMG_TRADE}
            />
          </Reveal>
          <Reveal delay={240}>
            <FeatureCard
              icon={<Wrench className='text-brand-600' />}
              title='Maintenance & Repairs'
              text='Acid change, terminal cleaning, oxygen refill and more.'
              img={IMG_REPAIR}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text, img }) {
  return (
    <article className='bg-white rounded-xl shadow p-6 border border-stone-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden'>
      <div className='h-32 -mx-6 -mt-6 mb-4 bg-cover bg-center' style={{ backgroundImage: 'url(' + img + ')' }} />
      <div className='mb-3 group-hover:scale-110 transition-transform duration-300'>{icon}</div>
      <h3 className='font-bold mb-1 text-stone-900'>{title}</h3>
      <p className='text-sm text-stone-600'>{text}</p>
    </article>
  );
}