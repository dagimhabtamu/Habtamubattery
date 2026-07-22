import { Helmet } from 'react-helmet-async';
import { Droplets, Wrench, Sparkles, RefreshCcw, Phone } from 'lucide-react';

const services = [
  {
    icon: <Droplets size={28} />,
    title: 'Acid Change',
    text: 'Replace diluted or contaminated battery acid to restore performance.',
  },
  {
    icon: <Wrench size={28} />,
    title: 'Terminal Repair',
    text: 'Clean, tighten or replace corroded positive and negative terminals.',
  },
  {
    icon: <Sparkles size={28} />,
    title: 'General Repairs',
    text: 'Diagnostic and full repair of old batteries, brought back to life.',
  },
  {
    icon: <RefreshCcw size={28} />,
    title: 'Oxygen Refill',
    text: 'Top-up distilled water and restore electrolyte balance.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Battery Services - Habtamu Batteries</title>
        <meta
          name="description"
          content="Acid change, terminal fix, battery repairs and oxygen refill services by Habtamu Batteries."
        />
      </Helmet>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-stone-900">Maintenance Services</h1>
          <p className="text-stone-600 max-w-2xl">
            We keep your batteries healthy so they last longer. Walk in or call ahead.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article key={s.title} className="bg-white border border-stone-200 rounded-xl p-6">
              <div className="text-brand-600 mb-3">{s.icon}</div>
              <h2 className="font-bold text-stone-900 text-lg">{s.title}</h2>
              <p className="text-sm text-stone-600 mt-1">{s.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 bg-brand-50 border border-brand-200 rounded-xl p-6 text-center">
          <h2 className="font-bold text-stone-900 text-xl mb-2">Need a service?</h2>
          <p className="text-stone-700 mb-4">
            Walk in to our shop or give us a call to book your battery service today.
          </p>
          <a href="tel:+251911134195" className="btn-primary inline-flex items-center gap-2">
            <Phone size={16} /> Call +251 91 113 4195
          </a>
        </div>
      </section>
    </>
  );
}