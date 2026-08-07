import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section
      className="bg-white border-t border-stone-200"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-extrabold leading-tight text-stone-900">
              Battery trouble? <br />
              <span className="text-orange-600">We are here to help.</span>
            </h2>
            <p className="text-stone-600 mt-3 max-w-lg">
              Call us now for a free diagnostic, walk in for a trade-in quote, or
              browse our full range of new batteries online.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a
              href="tel:+251911134195"
              className="inline-flex items-center justify-center gap-2 bg-stone-100 text-stone-900 hover:bg-stone-200 font-semibold py-3 px-6 rounded-lg transition"
            >
              <Phone size={18} /> Call +251 91 113 4195
            </a>
            <Link
              to="/batteries"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Shop Batteries <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}