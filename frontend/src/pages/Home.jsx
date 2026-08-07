import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Battery, Wrench, Plug, Beaker, ArrowRight, Phone } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import Brands from '../components/Brands.jsx';
import TopBatteries from '../components/TopBatteries.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Stats from '../components/Stats.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Faq from '../components/Faq.jsx';
import Location from '../components/Location.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { defaultSeo, localBusinessJsonLd } from '../seo/seo.js';

function Tile({ icon, title, text, to }) {
  return (
    <Link
      to={to}
      className="block bg-white border border-stone-200 rounded-xl p-5 sm:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group min-w-0"
    >
      <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-bold text-base sm:text-lg text-stone-900 group-hover:text-orange-700 transition-colors">{title}</h3>
      <p className="text-sm text-stone-600 mt-1">{text}</p>
    </Link>
  );
}

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--page-bg, #ffffff)" }}>
      <Helmet>
        <title>{defaultSeo.title}</title>
        <meta name="description" content={defaultSeo.description} />
        <meta name="keywords" content={defaultSeo.keywords} />
        <meta property="og:title" content={defaultSeo.title} />
        <meta property="og:description" content={defaultSeo.description} />
        <meta property="og:image" content={defaultSeo.image} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={defaultSeo.title} />
        <meta name="twitter:description" content={defaultSeo.description} />
        <meta name="twitter:image" content={defaultSeo.image} />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      </Helmet>

      <Hero />
      <Brands />
      <TopBatteries />

      <section className="bg-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              What we offer
            </p>
            <h2 id="services-heading" className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-2">
              Everything Under One Roof
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              From the first battery purchase to long-term maintenance, we support every
              stage of your vehicle power needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Tile icon={<Battery size={28} />} title="New Batteries"      text="35Ah-200Ah shop originals from top brands." to="/batteries" />
            <Tile icon={<Plug size={28} />}     title="Accessories"        text="Connectors, terminals, wires and more."    to="/accessories" />
            <Tile icon={<Wrench size={28} />}   title="Services"           text="Acid change, terminal fix, repairs."       to="/services" />
            <Tile icon={<Beaker size={28} />}   title="Acid by the Liter"  text="Top-ups and refills, stock always fresh."  to="/services" />
          </div>
        </div>
      </section>

      <HowItWorks />
      <Stats />
      <Testimonials />
      <Faq />
      <Location />
      <CtaBanner />
    </div>
  );
}