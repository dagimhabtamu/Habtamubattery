import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero.jsx';
import { Link } from 'react-router-dom';
import { Battery, Wrench, Plug, Beaker } from 'lucide-react';
import { defaultSeo, localBusinessJsonLd } from '../seo/seo.js';

export default function Home() {
  return (
    <>
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="services-heading">
        <h2 id="services-heading" className="text-3xl font-extrabold text-stone-900 mb-2">
          Everything Under One Roof
        </h2>
        <p className="text-stone-600 mb-8 max-w-2xl">
          From the first battery purchase to long-term maintenance, we support every stage of your vehicle's power needs.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Tile icon={<Battery size={28}/>} title="New Batteries" text="35Ah-200Ah shop originals from top brands." to="/batteries" />
          <Tile icon={<Plug size={28}/>} title="Accessories" text="Connectors, terminals, wires and more." to="/accessories" />
          <Tile icon={<Wrench size={28}/>} title="Services" text="Acid change, terminal fix, repairs." to="/services" />
          <Tile icon={<Beaker size={28}/>} title="Acid by the Liter" text="Top-ups and refills, stock always fresh." to="/services" />
        </div>
      </section>
    </>
  );
}

function Tile({ icon, title, text, to }) {
  return (
    <Link
      to={to}
      className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition group"
    >
      <div className="text-brand-600 mb-3">{icon}</div>
      <h3 className="font-bold text-lg text-stone-900 group-hover:text-brand-700">{title}</h3>
      <p className="text-sm text-stone-600 mt-1">{text}</p>
    </Link>
  );
}
