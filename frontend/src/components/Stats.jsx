import { useEffect, useState } from 'react';
import { Award, Battery, Users, Star, CheckCircle2 } from 'lucide-react';
import useInView from '../hooks/useInView.js';

const STATS = [
  { Icon: Award,  value: 8,     suffix: '+', label: 'Years in Business',  detail: 'Since 2017',            glow: 'bg-yellow-400/30' },
  { Icon: Battery, value: 5000,  suffix: '+', label: 'Batteries Sold',     detail: 'All major brands',      glow: 'bg-cyan-400/30'   },
  { Icon: Users,  value: 3500,  suffix: '+', label: 'Happy Customers',    detail: '98% recommend us',      glow: 'bg-emerald-400/30' },
  { Icon: Star,   value: 4.9,   suffix: '',  label: 'Google Rating',      detail: '200+ verified reviews', glow: 'bg-pink-400/30',   decimals: 1 },
];

function Counter({ target, suffix = '', decimals = 0 }) {
  const [n, setN] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const duration = 1500;
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  const formatted = decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toLocaleString();
  return <span ref={ref}>{formatted}{suffix}</span>;
}

export default function Stats() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">Our track record</h2>

      {/* Subtle background blobs (smaller, less intrusive) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Compact stat row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((s, i) => {
            const { Icon } = s;
            return (
              <div
                key={s.label}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className={`absolute -inset-1 ${s.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-xl`} />

                <div className="relative flex items-center gap-3 sm:gap-4">
                  <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-2xl sm:text-3xl font-extrabold text-white leading-none tracking-tight">
                      <Counter target={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 truncate">{s.label}</p>
                    <p className="text-[10px] sm:text-xs text-white/70 mt-0.5 truncate hidden sm:block">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact trust badges inline */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-white/85 text-xs">
          <span className="inline-flex items-center gap-1"><CheckCircle2 size={12} className="text-green-300" /> Authorized dealer</span>
          <span className="text-white/30">·</span>
          <span className="inline-flex items-center gap-1"><CheckCircle2 size={12} className="text-green-300" /> Free installation</span>
          <span className="text-white/30">·</span>
          <span className="inline-flex items-center gap-1"><CheckCircle2 size={12} className="text-green-300" /> Up to 24-month warranty</span>
          <span className="text-white/30">·</span>
          <span className="inline-flex items-center gap-1"><CheckCircle2 size={12} className="text-green-300" /> Trade-in welcome</span>
        </div>
      </div>
    </section>
  );
}