import { Star, Quote } from 'lucide-react';
const REVIEWS = [
  { name: 'Dawit Tesfaye', role: 'Toyota Corolla owner', text: 'Bought a 60Ah Bosch here 2 years ago. Still going strong. The team tested my old one, gave me a fair trade-in price, and installed the new one in 15 minutes. No hassle.', rating: 5 },
  { name: 'Selamawit Alemu', role: 'Suzuki Swift owner', text: 'They explained the difference between the batteries clearly, no pushy sales. I picked the one in my budget and it has been perfect. Will recommend to friends.', rating: 5 },
  { name: 'Mulugeta Worku', role: 'Land Cruiser owner', text: 'Heavy-duty battery for my LC, sourced within a day. Warranty paperwork was already done when I arrived. Professional operation.', rating: 5 },
];
export default function Testimonials() {
  return (
    <section className="bg-stone-50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-brand-700 font-semibold uppercase tracking-wider text-xs mb-2">Real Customers</p>
          <h2 id="reviews-heading" className="text-3xl font-extrabold text-stone-900">What People Are Saying</h2>
          <div className="flex items-center justify-center gap-1 mt-3 text-amber-500">
            <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
            <span className="text-stone-700 ml-2 font-semibold">4.9 / 5 from 200+ reviews</span>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article key={r.name} className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition relative">
              <Quote className="text-brand-200 absolute top-4 right-4" size={32} />
              <div className="flex gap-0.5 text-amber-500 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (<Star key={i} size={14} fill="currentColor" />))}
              </div>
              <p className="text-stone-700 leading-relaxed text-sm">{r.text}</p>
              <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="font-bold text-stone-900">{r.name}</p>
                <p className="text-xs text-stone-500">{r.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}