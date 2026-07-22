import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Wrench, Recycle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative">
      <div
        className="relative h-[78vh] min-h-[560px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,25,23,0.78), rgba(28,25,23,0.78)), url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1920&q=80')",
        }}
        aria-label="Habtamu Batteries showroom"
        role="img"
      >
        <div className="max-w-4xl mx-auto text-center px-6 text-white">
          <p className="inline-block bg-brand-600/90 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
            Trusted Since Day One
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Power Your Drive. <span className="text-brand-400">Every Time.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-8">
            Premium new car batteries from 35Ah to 200Ah, expert trade-ins,
            accessories, repairs, and battery acid by the liter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/batteries" className="btn-primary inline-flex items-center justify-center gap-2">
              Shop Batteries <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-semibold py-2.5 px-5 rounded-lg border border-white/30"
            >
              Services <Wrench size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<ShieldCheck className="text-brand-600" />}
            title="Warranty on Every Battery"
            text="All new batteries include manufacturer warranty up to 24 months."
          />
          <FeatureCard
            icon={<Recycle className="text-brand-600" />}
            title="Trade-In Program"
            text="Swap your old battery and pay only the price difference."
          />
          <FeatureCard
            icon={<Wrench className="text-brand-600" />}
            title="Maintenance & Repairs"
            text="Acid change, terminal cleaning, oxygen refill and more."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="bg-white rounded-xl shadow p-6 border border-stone-200">
      <div className="mb-3">{icon}</div>
      <h3 className="font-bold mb-1 text-stone-900">{title}</h3>
      <p className="text-sm text-stone-600">{text}</p>
    </article>
  );
}
