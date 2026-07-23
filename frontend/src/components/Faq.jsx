import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
const FAQS = [
  { q: 'How long does a car battery typically last?', a: 'Most car batteries last 3-5 years in normal conditions. Hot climates, frequent short trips, and leaving electronics on can shorten lifespan. We recommend a free health check every 12 months.' },
  { q: 'Do you install the battery I buy?', a: 'Yes - installation is free with every new battery purchase. The whole process takes 10-20 minutes and we make sure your terminals are clean and the new battery is properly secured.' },
  { q: 'How does the trade-in / buyback program work?', a: 'Bring in your old battery, we weigh it, evaluate its condition (working, repairable, or scrap), and quote a per-kg price. The trade-in value is deducted from your new battery purchase. You can also sell the old battery outright for cash.' },
  { q: 'What warranty do you offer?', a: 'All new batteries come with the manufacturer warranty, typically 12 to 24 months depending on brand and model. We handle all warranty claims in-house - no need to ship anything back.' },
  { q: 'Do you buy old batteries even if I am not buying a new one?', a: 'Absolutely. We buy old batteries by weight regardless of whether you purchase from us. Walk in with your old battery and walk out with cash.' },
  { q: 'Can you repair my old battery instead of replacing it?', a: 'Often yes. We offer acid change, terminal repair, oxygen refill, and general diagnostics. If the battery is repairable, we can usually bring it back to full performance for a fraction of the cost of a new one.' },
  { q: 'Do you deliver or install on-site?', a: 'For fleet customers and large orders we offer on-site delivery and installation within Addis Ababa. Contact us by phone to arrange.' },
];
export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="faq-heading">
      <div className="text-center mb-10">
        <p className="text-brand-700 font-semibold uppercase tracking-wider text-xs mb-2">Got Questions?</p>
        <h2 id="faq-heading" className="text-3xl font-extrabold text-stone-900">Frequently Asked Questions</h2>
        <p className="text-stone-600 mt-2">Everything you need to know before you visit.</p>
      </div>
      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-stone-50 transition" aria-expanded={isOpen}>
                <span className="font-semibold text-stone-900">{f.q}</span>
                <span className="text-brand-600 flex-shrink-0">{isOpen ? <Minus size={20} /> : <Plus size={20} />}</span>
              </button>
              {isOpen && (<div className="px-5 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">{f.a}</div>)}
            </div>
          );
        })}
      </div>
    </section>
  );
}