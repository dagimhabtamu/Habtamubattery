import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hb_theme');
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        setDark(true);
      }
    } catch (e) { /* ignore */ }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('hb_theme', next ? 'dark' : 'light'); } catch (e) { /* ignore */ }
  };

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label="Toggle dark mode"
      title={dark ? 'Light mode' : 'Dark mode'}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors text-stone-700 hover:text-brand-700 hover:bg-stone-100"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}