import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Navigation } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import api from '../utils/api.js';
import toast from 'react-hot-toast';

const SHOP_ADDRESS    = 'XP8P+C56, Addis Ababa, Ethiopia';
const SHOP_PHONE_DISP = '+251 91 113 4195';
const SHOP_PHONE_RAW  = '+251911134195';
const SHOP_EMAIL      = 'info@habtamubatteries.com';
const SHOP_QUERY      = 'Habtamu+Battery+XP8P+C56+Addis+Ababa';
const GMAP_EMBED      = 'https://maps.google.com/maps?q=' + SHOP_QUERY + '&hl=en&z=17&output=embed';
const GMAP_DIR        = 'https://www.google.com/maps/dir/?api=1&destination=' + SHOP_QUERY;
const HOURS = [
  { day: 'Monday - Saturday', time: '7:00 AM - 7:00 PM' },
  { day: 'Sunday',            time: 'Closed' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/contact-messages', form);
      toast.success('Message sent! We will reply within 24 hours.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please call us instead.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Habtamu Batteries</title>
        <meta name="description" content="Get in touch with Habtamu Batteries. Call, email or visit our shop in Addis Ababa." />
      </Helmet>

      <section className="bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <Reveal>
            <p className="inline-block bg-brand-600/90 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">Get in touch</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2">We are here to help</h1>
            <p className="text-stone-300 max-w-2xl mx-auto">Call, message, or visit us — whichever is easier for you.</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <a href={`tel:${SHOP_PHONE_RAW}`} className="block bg-white border border-stone-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
              <Phone className="text-brand-600 mb-2" size={24} />
              <p className="text-xs text-stone-500 uppercase tracking-wider">Call us</p>
              <p className="font-bold text-stone-900 mt-1">{SHOP_PHONE_DISP}</p>
            </a>
          </Reveal>
          <Reveal delay={100}>
            <a href={`mailto:${SHOP_EMAIL}`} className="block bg-white border border-stone-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
              <Mail className="text-brand-600 mb-2" size={24} />
              <p className="text-xs text-stone-500 uppercase tracking-wider">Email</p>
              <p className="font-bold text-stone-900 mt-1 text-sm break-all">{SHOP_EMAIL}</p>
            </a>
          </Reveal>
          <Reveal delay={200}>
            <a href={GMAP_DIR} target="_blank" rel="noreferrer" className="block bg-white border border-stone-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
              <MapPin className="text-brand-600 mb-2" size={24} />
              <p className="text-xs text-stone-500 uppercase tracking-wider">Visit</p>
              <p className="font-bold text-stone-900 mt-1 text-sm">{SHOP_ADDRESS}</p>
            </a>
          </Reveal>
          <Reveal delay={300}>
            <div className="block bg-white border border-stone-200 rounded-xl p-5">
              <Clock className="text-brand-600 mb-2" size={24} />
              <p className="text-xs text-stone-500 uppercase tracking-wider">Hours</p>
              {HOURS.map((h) => (
                <p key={h.day} className="text-xs text-stone-700 mt-1">
                  <span className="font-semibold">{h.day}:</span> <span className={h.time === 'Closed' ? 'text-red-600' : ''}>{h.time}</span>
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 h-full">
              <h2 className="text-2xl font-extrabold text-stone-900 mb-2 flex items-center gap-2"><MessageSquare className="text-brand-600" size={22} /> Send a message</h2>
              <p className="text-sm text-stone-500 mb-4">We typically reply within 24 hours.</p>
              <form onSubmit={submit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Your name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Message</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input" required />
                </div>
                <button type="submit" disabled={sending} className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
                  <Send size={16} /> {sending ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={150}>
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden h-full flex flex-col">
              <iframe title="Habtamu Battery location" src={GMAP_EMBED} className="w-full flex-1 min-h-[400px]" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
              <div className="p-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="text-sm text-stone-600">Plus code: <span className="font-mono font-semibold">XP8P+C56 Addis Ababa</span></p>
                <a href={GMAP_DIR} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 text-sm"><Navigation size={14} /> Get directions</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}