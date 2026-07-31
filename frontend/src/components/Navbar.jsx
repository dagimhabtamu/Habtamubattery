import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Battery, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
      isActive
        ? 'text-brand-700 bg-brand-50 dark:text-brand-300 dark:bg-stone-800'
        : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
    }`;

  return (
    <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex items-center justify-between h-16 gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-stone-900 dark:text-white flex-shrink-0">
            <Battery className="text-brand-600" size={24} aria-hidden="true" />
            <span className="hidden sm:inline">Habtamu Batteries</span>
            <span className="sm:hidden">HB</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 flex-1 justify-center min-w-0 overflow-x-auto">
            <NavLink to="/"         className={linkClass} end>{t('nav.home')}</NavLink>
            <NavLink to="/batteries" className={linkClass}>{t('nav.batteries')}</NavLink>
            <NavLink to="/accessories" className={linkClass}>{t('nav.accessories')}</NavLink>
            <NavLink to="/services" className={linkClass}>{t('nav.services')}</NavLink>
            <NavLink to="/about"    className={linkClass}>{t('nav.about')}</NavLink>
            <NavLink to="/contact"  className={linkClass}>{t('nav.contact')}</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            <LanguageSwitcher />
            <ThemeToggle />
            {user ? (
              <>
                <Link to="/admin" className="btn-primary text-sm whitespace-nowrap">{t('nav.dashboard')}</Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="btn-secondary text-sm whitespace-nowrap"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : null}
          </div>

          <div className="md:hidden flex items-center gap-1 flex-shrink-0">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              className="p-2 text-stone-700"
              aria-label="Open menu"
              onClick={() => setMenuOpen((s) => !s)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t border-stone-200 dark:border-stone-800 pt-3">
            <NavLink to="/"         onClick={() => setMenuOpen(false)} className={linkClass} end>{t('nav.home')}</NavLink>
            <NavLink to="/batteries" onClick={() => setMenuOpen(false)} className={linkClass}>{t('nav.batteries')}</NavLink>
            <NavLink to="/accessories" onClick={() => setMenuOpen(false)} className={linkClass}>{t('nav.accessories')}</NavLink>
            <NavLink to="/services" onClick={() => setMenuOpen(false)} className={linkClass}>{t('nav.services')}</NavLink>
            <NavLink to="/about"    onClick={() => setMenuOpen(false)} className={linkClass}>{t('nav.about')}</NavLink>
            <NavLink to="/contact"  onClick={() => setMenuOpen(false)} className={linkClass}>{t('nav.contact')}</NavLink>
            {user ? (
              <>
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="btn-primary text-sm mt-2 text-center">{t('nav.dashboard')}</Link>
                <button onClick={() => { logout(); navigate('/'); setMenuOpen(false); }} className="btn-secondary text-sm">
                  {t('nav.logout')}
                </button>
              </>
            ) : null}
          </div>
        )}
      </nav>
    </header>
  );
}