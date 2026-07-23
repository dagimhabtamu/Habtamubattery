const BRANDS = [
  { name: 'Bosch', tagline: 'Premium German engineering' },
  { name: 'Varta', tagline: 'Power you can trust' },
  { name: 'Yuasa', tagline: 'Japanese reliability' },
  { name: 'Optima', tagline: 'Spiral-cell performance' },
  { name: 'AC Delco', tagline: 'GM original spec' },
  { name: 'Atlas', tagline: 'Built for Africa' },
  { name: 'Luminous', tagline: 'Inverter and auto' },
  { name: 'Rocket', tagline: 'Korean power' },
];

export default function Brands() {
  return (
    <section className="bg-stone-50 border-y border-stone-200" aria-labelledby="brands-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 id="brands-heading" className="text-2xl font-extrabold text-stone-900">Brands We Carry</h2>
          <p className="text-stone-600 mt-1">Authorized dealer of world-leading battery manufacturers</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {BRANDS.map((b) => (
            <div key={b.name} className="bg-white border border-stone-200 rounded-lg p-4 text-center hover:border-brand-400 hover:shadow-sm transition" title={b.tagline}>
              <p className="font-extrabold text-stone-900 text-lg tracking-tight">{b.name}</p>
              <p className="text-[11px] text-stone-500 mt-1 leading-tight">{b.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}