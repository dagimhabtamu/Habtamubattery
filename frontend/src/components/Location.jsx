import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink } from 'lucide-react';
import Reveal from './Reveal.jsx';

const HOURS = [
  { day: 'Monday - Saturday', time: '7:00 AM - 7:00 PM' },
  { day: 'Sunday',            time: 'Closed' },
];

const SHOP_QUERY = 'Habtamu+Battery+XP8P+C56+Addis+Ababa';
const GMAP_EMBED = 'https://maps.google.com/maps?q=' + SHOP_QUERY + '&hl=en&z=17&output=embed';
const GMAP_DIR   = 'https://www.google.com/maps/dir/?api=1&destination=' + SHOP_QUERY;
const GMAP_VIEW  = 'https://www.google.com/maps/search/?api=1&query=' + SHOP_QUERY;

export default function Location() {
  return (
    <section className='bg-white' aria-labelledby='visit-heading'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <Reveal>
          <div className='text-center mb-10'>
            <p className='text-brand-700 font-semibold uppercase tracking-wider text-xs mb-2'>Come See Us</p>
            <h2 id='visit-heading' className='text-3xl font-extrabold text-stone-900'>Visit Our Shop</h2>
            <p className='text-stone-600 mt-2'>Walk-ins welcome. Easy to find in the heart of Addis Ababa.</p>
          </div>
        </Reveal>

        <div className='grid gap-6 lg:grid-cols-5'>
          <Reveal className='lg:col-span-3'>
            <div className='rounded-xl overflow-hidden border border-stone-200 shadow-md hover:shadow-xl transition-shadow duration-300 h-full relative'>
              <iframe
                title='Habtamu Battery location on Google Maps'
                src={GMAP_EMBED}
                className='w-full h-[420px] block'
                loading='lazy'
                allowFullScreen
                referrerPolicy='no-referrer-when-downgrade'
              />
              <a
                href={GMAP_VIEW}
                target='_blank'
                rel='noreferrer'
                className='absolute top-3 right-3 bg-white/95 backdrop-blur text-stone-700 hover:text-brand-700 text-xs font-semibold px-3 py-1.5 rounded-lg shadow flex items-center gap-1 transition-colors'
              >
                <ExternalLink size={12} /> View larger map
              </a>
            </div>
            <p className='text-xs text-stone-500 mt-2 text-center'>
              Plus code: <span className='font-mono'>XP8P+C56 Addis Ababa</span>
            </p>
          </Reveal>

          <Reveal delay={150} className='lg:col-span-2'>
            <div className='space-y-4 h-full flex flex-col'>
              <div className='bg-stone-50 border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300'>
                <h3 className='font-bold text-stone-900 text-lg mb-4 flex items-center gap-2'>
                  <MapPin className='text-brand-600' size={20} /> Habtamu Battery
                </h3>
                <ul className='space-y-3 text-sm'>
                  <li className='flex items-start gap-3'>
                    <MapPin className='text-stone-400 flex-shrink-0 mt-0.5' size={16} />
                    <span className='text-stone-700'>XP8P+C56, Addis Ababa, Ethiopia</span>
                  </li>
                  <li className='flex items-start gap-3'>
                    <Phone className='text-stone-400 flex-shrink-0 mt-0.5' size={16} />
                    <a href='tel:+251911134195' className='text-stone-700 hover:text-brand-700 transition-colors'>+251 91 113 4195</a>
                  </li>
                  <li className='flex items-start gap-3'>
                    <Mail className='text-stone-400 flex-shrink-0 mt-0.5' size={16} />
                    <a href='mailto:info@habtamubatteries.com' className='text-stone-700 hover:text-brand-700 transition-colors'>info@habtamubatteries.com</a>
                  </li>
                </ul>
              </div>
              <div className='bg-stone-50 border border-stone-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300 flex-1'>
                <h3 className='font-bold text-stone-900 text-lg mb-4 flex items-center gap-2'>
                  <Clock className='text-brand-600' size={20} /> Opening Hours
                </h3>
                <ul className='space-y-2 text-sm'>
                  {HOURS.map((h) => (
                    <li key={h.day} className='flex items-center justify-between border-b border-stone-200 last:border-0 pb-2 last:pb-0'>
                      <span className='text-stone-700'>{h.day}</span>
                      <span className={'font-semibold ' + (h.time === 'Closed' ? 'text-red-600' : 'text-stone-900')}>
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <a href={GMAP_DIR} target='_blank' rel='noreferrer' className='btn-primary inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform'>
                  <Navigation size={16} /> Directions
                </a>
                <a href={GMAP_VIEW} target='_blank' rel='noreferrer' className='btn-secondary inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform'>
                  <MapPin size={16} /> Open in Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}