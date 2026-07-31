import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const LANGS = [
  { code: 'en', label: 'English',  short: 'EN' },
  { code: 'am', label: 'Amharic',   short: 'AM' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGS.find((l) => l.code === (i18n.language || 'en')) || LANGS[0];

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const change = (code) => {
    i18n.changeLanguage(code);
    try { localStorage.setItem('hb_lang', code); } catch (e) { /* ignore */ }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold transition-colors text-stone-700 hover:text-brand-700 hover:bg-stone-100"
        aria-label="Change language"
        type="button"
      >
        <Globe size={16} />
        <span>{current.short}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-stone-200 rounded-lg shadow-lg z-50 min-w-[140px] py-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => change(l.code)}
              type="button"
              className={"w-full text-left px-3 py-2 text-sm flex items-center justify-between transition-colors text-stone-700 hover:bg-stone-50 " + (current.code === l.code ? 'font-semibold' : '')}
            >
              <span>{l.label}</span>
              {current.code === l.code && <Check size={14} className="text-brand-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}