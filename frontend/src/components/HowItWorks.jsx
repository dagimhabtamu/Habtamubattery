import { Truck, Recycle, Wrench } from 'lucide-react';
const STEPS = [
  { n: 1, icon: <Truck size={28} />, title: 'Bring your old battery', text: 'Drive in with your used battery. No appointment needed - we accept walk-ins all day.' },
  { n: 2, icon: <Recycle size={28} />, title: 'Weigh and evaluate', text: 'Our team weighs the battery, checks its condition, and gives you a fair per-kg resale price.' },
  { n: 3, icon: <Wrench size={28} />, title: 'Drive away with new one', text: 'Pick a new battery, pay the difference, and we install it on the spot - usually under 20 minutes.' },
];
export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-b from-stone-50 to-white" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-brand-700 font-semibold uppercase tracking-wider text-xs mb-2">Trade-In Program</p>
          <h2 id="how-heading" className="text-3xl font-extrabold text-stone-900">How It Works</h2>
          <p className="text-stone-600 mt-2 max-w-xl mx-auto">Three simple steps. Walk in, swap your old battery, drive out with a new one.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-stone-200" aria-hidden="true" />
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white border border-stone-200 rounded-xl p-6 text-center relative">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-brand-600 text-white flex items-center justify-center text-2xl font-extrabold shadow-md relative z-10">{s.n}</div>
              <div className="text-brand-600 flex justify-center mb-2">{s.icon}</div>
              <h3 className="font-bold text-stone-900 text-lg">{s.title}</h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}