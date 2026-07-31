import { Link } from 'react-router-dom';
import {
  Battery, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, ArrowUp
} from 'lucide-react';

const SHOP_ADDRESS    = 'XP8P+C56, Addis Ababa, Ethiopia';
const SHOP_PHONE_DISP = '+251 91 113 4195';
const SHOP_PHONE_RAW  = '+251911134195';
const SHOP_EMAIL      = 'info@habtamubatteries.com';
const SHOP_QUERY      = 'Habtamu+Battery+XP8P+C56+Addis+Ababa';
const GMAP_DIR        = 'https://www.google.com/maps/dir/?api=1&destination=' + SHOP_QUERY;

const HOURS = [
  { day: 'Monday - Saturday', time: '7:00 AM - 7:00 PM' },
  { day: 'Sunday',            time: 'Closed' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-stone-900 text-stone-300 mt-16">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand column */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-white text-lg">
            <Battery className="text-brand-500" size={24} />
            <span>Habtamu Batteries</span>
          </Link>
          <p className="text-sm mt-3 leading-relaxed text-stone-400">
            Premium car batteries, expert trade-ins, accessories and maintenance services — your one-stop power shop in Addis Ababa.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"  className="w-9 h-9 rounded-full bg-stone-800 hover:bg-brand-600 flex items-center justify-center transition-colors"><Facebook size={16} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-brand-600 flex items-center justify-center transition-colors"><Instagram size={16} /></a>
            <a href="https://twitter.com"  target="_blank" rel="noreferrer" aria-label="Twitter"   className="w-9 h-9 rounded-full bg-stone-800 hover:bg-brand-600 flex items-center justify-center transition-colors"><Twitter size={16} /></a>
            <a href={`tel:${SHOP_PHONE_RAW}`} aria-label="Call us" className="w-9 h-9 rounded-full bg-stone-800 hover:bg-brand-600 flex items-center justify-center transition-colors"><Phone size={16} /></a>
          </div>
        </div>

        {/* Shop links */}
        <div className="lg:col-span-2">
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/batteries"  className="text-stone-400 hover:text-brand-400 transition-colors">New Batteries</Link></li>
            <li><Link to="/accessories" className="text-stone-400 hover:text-brand-400 transition-colors">Accessories</Link></li>
            <li><Link to="/services"   className="text-stone-400 hover:text-brand-400 transition-colors">Services</Link></li>
          </ul>
        </div>

        {/* Company links */}
        <div className="lg:col-span-2">
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about"   className="text-stone-400 hover:text-brand-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="text-stone-400 hover:text-brand-400 transition-colors">Contact</Link></li>
            <li><a href={GMAP_DIR} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-brand-400 transition-colors">Directions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-4">
          <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Get in touch</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2 text-stone-400">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-brand-500" />
              <span>{SHOP_ADDRESS}</span>
            </li>
            <li>
              <a href={`tel:${SHOP_PHONE_RAW}`} className="flex items-center gap-2 text-stone-400 hover:text-brand-400 transition-colors">
                <Phone size={14} className="text-brand-500" /> {SHOP_PHONE_DISP}
              </a>
            </li>
            <li>
              <a href={`mailto:${SHOP_EMAIL}`} className="flex items-center gap-2 text-stone-400 hover:text-brand-400 transition-colors">
                <Mail size={14} className="text-brand-500" /> {SHOP_EMAIL}
              </a>
            </li>
            <li>
              <a href={GMAP_DIR} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-1 text-xs font-semibold text-brand-400 hover:text-brand-300">
                Get directions on Google Maps →
              </a>
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t border-stone-800">
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock size={12} className="text-brand-500" /> Opening Hours
            </h5>
            <ul className="space-y-1 text-xs">
              {HOURS.map((h) => (
                <li key={h.day} className="flex items-center justify-between">
                  <span className="text-stone-400">{h.day}</span>
                  <span className={'font-semibold ' + (h.time === 'Closed' ? 'text-red-400' : 'text-stone-200')}>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <p>&copy; {year} Habtamu Batteries. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about"   className="hover:text-brand-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-brand-400 transition-colors">Contact</Link>
            <button onClick={scrollTop} className="inline-flex items-center gap-1 hover:text-brand-400 transition-colors" aria-label="Back to top">
              <ArrowUp size={12} /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}