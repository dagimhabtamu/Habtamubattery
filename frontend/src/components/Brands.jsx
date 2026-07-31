import { Award, Battery, ShieldCheck } from 'lucide-react';

const BRANDS = [
  { name: 'Bosch',    tagline: 'Premium German engineering' },
  { name: 'Varta',    tagline: 'Power you can trust' },
  { name: 'Yuasa',    tagline: 'Japanese reliability' },
  { name: 'Optima',   tagline: 'Spiral-cell performance' },
  { name: 'AC Delco', tagline: 'GM original spec' },
  { name: 'Atlas',    tagline: 'Built for Africa' },
  { name: 'Luminous', tagline: 'Inverter and auto' },
  { name: 'Rocket',   tagline: 'Korean power' },
  { name: 'Clarios',  tagline: 'Advanced battery tech' },
  { name: 'EnerSys',  tagline: 'Industrial power' },
];

function BrandCard({ brand }) {
  return (
    <div className="flex-shrink-0 group bg-white border border-stone-200 rounded-xl px-5 py-4 hover:border-brand-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 min-w-[210px] cursor-default">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        <Battery className="text-brand-600" size={20} />
      </div>
      <div className="min-w-0">
        <p className="font-extrabold text-stone-900 text-base tracking-tight truncate">{brand.name}</p>
        <p className="text-[11px] text-stone-500 leading-tight truncate">{brand.tagline}</p>
      </div>
      <ShieldCheck className="text-green-500 ml-auto flex-shrink-0" size={16} />
    </div>
  );
}

export default function Brands() {
  // Triple the list so the loop is seamless and the scroll is long
  const looped = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section
      className="bg-stone-50 dark:bg-[#1a2332] border-y border-stone-200 dark:border-stone-700 py-10 overflow-hidden"
      aria-labelledby="brands-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="text-center">
          <p className="inline-flex items-center gap-1.5 bg-white border border-stone-200 text-brand-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Award size={12} /> Trusted Partners
          </p>
          <h2 id="brands-heading" className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            Brands We Carry
          </h2>
          <p className="text-stone-600 mt-1 text-sm sm:text-base">
            Authorized dealer of world-leading battery manufacturers
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex gap-4 marquee-track"
            style={{ width: 'max-content' }}
          >
            {looped.map((b, i) => (
              <BrandCard key={i} brand={b} />
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-stone-50 dark:from-[#1a2332] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-stone-50 dark:from-[#1a2332] to-transparent pointer-events-none z-10" />
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .marquee-track {
          animation: marquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}