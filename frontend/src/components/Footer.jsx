import { Link } from 'react-router-dom';
import { Battery, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-white mb-2">
            <Battery className="text-brand-500" size={22} />
            <span>Habtamu Batteries</span>
          </div>
          <p className="text-sm">
            Premium car batteries, trade-ins, accessories and expert maintenance services.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/batteries" className="hover:text-brand-400">New Batteries</Link></li>
            <li><Link to="/accessories" className="hover:text-brand-400">Accessories</Link></li>
            <li><Link to="/services" className="hover:text-brand-400">Services</Link></li>
          </ul>
        </nav>
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-brand-400">Staff Login</Link></li>
            <li><a href="#" className="hover:text-brand-400">About</a></li>
            <li><a href="#" className="hover:text-brand-400">Contact</a></li>
          </ul>
        </div>
        <address className="not-italic">
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin size={14}/> Germen squre, Addis Ababa</li>
            <li className="flex items-center gap-2"><Phone size={14}/> +251 911134195</li>
            <li className="flex items-center gap-2"><Mail size={14}/> info@habtamubatteries.com</li>
          </ul>
        </address>
      </div>
      <div className="border-t border-stone-800 text-center text-xs py-4">
        {new Date().getFullYear()} Habtamu Batteries. All rights reserved.
      </div>
    </footer>
  );
}
