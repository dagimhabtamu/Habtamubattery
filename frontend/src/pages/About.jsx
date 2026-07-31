import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Award, Users, Heart, Target, Eye, Sparkles, CheckCircle2, Phone } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';

const VALUES = [
  { Icon: Award,  title: 'Quality',  text: 'Only original products from world-leading brands.' },
  { Icon: Heart,  title: 'Care',     text: 'We treat every customer and every battery with the same attention.' },
  { Icon: Users,  title: 'Community',text: 'Proudly serving Addis Ababa drivers since 2017.' },
];

const TIMELINE = [
  { year: '2017', text: 'Habtamu Batteries opens its doors in Germen Square.' },
  { year: '2019', text: 'Becomes authorized dealer for Bosch, Varta and Yuasa.' },
  { year: '2021', text: 'Launches the trade-in and old battery buyback program.' },
  { year: '2024', text: 'Opens a full maintenance workshop with diagnostic tools.' },
  { year: '2025', text: 'Goes digital with online catalog and same-day service.' },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Habtamu Batteries</title>
        <meta name="description" content="Learn about Habtamu Batteries, your trusted battery shop in Addis Ababa since 2017." />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <Reveal>
            <p className="inline-block bg-brand-600/90 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">Our Story</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">About Habtamu Batteries</h1>
            <p className="text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto">
              Powering Addis Ababa drivers with honest advice, top brands, and friendly service since 2017.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 h-full hover:shadow-xl transition-shadow">
              <div className="inline-flex p-3 bg-brand-100 rounded-xl mb-4">
                <Target className="text-brand-700" size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-stone-900 mb-2">Our Mission</h2>
              <p className="text-stone-600 leading-relaxed">
                To keep every vehicle in Addis Ababa reliably powered — with the right battery, the right advice, and the right price. No upselling, no surprises.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 h-full hover:shadow-xl transition-shadow">
              <div className="inline-flex p-3 bg-brand-100 rounded-xl mb-4">
                <Eye className="text-brand-700" size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-stone-900 mb-2">Our Vision</h2>
              <p className="text-stone-600 leading-relaxed">
                To be Ethiopia's most trusted battery partner — where customers come first, batteries last longer, and every driver drives away confident.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-brand-700 font-semibold uppercase tracking-wider text-xs mb-2 flex items-center justify-center gap-1"><Sparkles size={14} /> What We Stand For</p>
              <h2 className="text-3xl font-extrabold text-stone-900">Our Values</h2>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="bg-white border border-stone-200 rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="inline-flex p-3 bg-brand-100 rounded-xl mb-3"><v.Icon className="text-brand-700" size={26} /></div>
                  <h3 className="font-bold text-stone-900 text-lg">{v.title}</h3>
                  <p className="text-sm text-stone-600 mt-2">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal>
          <h2 className="text-3xl font-extrabold text-stone-900 text-center mb-10">Our Journey</h2>
        </Reveal>
        <div className="space-y-4">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 80}>
              <div className="flex gap-4 items-start bg-white border border-stone-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-brand-600 text-white flex items-center justify-center font-extrabold text-sm">{t.year}</div>
                <div className="flex-1 pt-2">
                  <p className="text-stone-700 leading-relaxed">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-stone-900">Ready to power your drive?</h2>
            <p className="text-stone-600 mt-2">Browse our catalog or give us a call — we are happy to help.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
              <Link to="/batteries" className="btn-primary inline-flex items-center justify-center hover:scale-105 transition-transform">Shop Batteries</Link>
              <a href="tel:+251911134195" className="btn-secondary inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform"><Phone size={16} /> Call Us</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}