import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Battery, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
    isActive
      ? 'text-orange-700 bg-orange-50'
      : 'text-stone-700 hover:bg-stone-100'
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header
      className="border-b border-stone-200 sticky top-0 z-40"
      style={{ backgroundColor: "var(--navbar-bg, #ffffff)" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-stone-900 shrink-0">
            <div className="bg-orange-600 p-1.5 rounded-lg">
              <Battery className="text-white" size={20} aria-hidden="true" />
            </div>
            <span className="text-base sm:text-lg">Habtamu Batteries</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/"          className={linkClass} end>{t('nav.home')}</NavLink>
            <NavLink to="/batteries" className={linkClass}>{t('nav.batteries')}</NavLink>
            <NavLink to="/accessories" className={linkClass}>{t('nav.accessories')}</NavLink>
            <NavLink to="/services"  className={linkClass}>{t('nav.services')}</NavLink>
            <NavLink to="/about"     className={linkClass}>{t('nav.about')}</NavLink>
            <NavLink to="/contact"   className={linkClass}>{t('nav.contact')}</NavLink>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            {user ? (
              <>
                <Link to="/admin" className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition shadow-sm">
                  Dashboard
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-sm font-semibold py-2 px-4 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/batteries" className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition shadow-sm">
                {t('nav.orderNow')}
              </Link>
            )}
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-stone-200 py-3 space-y-1">
            <NavLink to="/"          className={linkClass} end onClick={() => setMenuOpen(false)}>{t('nav.home')}</NavLink>
            <NavLink to="/batteries" className={linkClass} onClick={() => setMenuOpen(false)}>{t('nav.batteries')}</NavLink>
            <NavLink to="/accessories" className={linkClass} onClick={() => setMenuOpen(false)}>{t('nav.accessories')}</NavLink>
            <NavLink to="/services"  className={linkClass} onClick={() => setMenuOpen(false)}>{t('nav.services')}</NavLink>
            <NavLink to="/about"     className={linkClass} onClick={() => setMenuOpen(false)}>{t('nav.about')}</NavLink>
            <NavLink to="/contact"   className={linkClass} onClick={() => setMenuOpen(false)}>{t('nav.contact')}</NavLink>

            <div className="pt-2 mt-2 border-t border-stone-200 flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {user ? (
              <div className="flex gap-2 pt-2">
                <Link to="/admin" className="flex-1 text-center bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); setMenuOpen(false); }}
                  className="flex-1 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-sm font-semibold py-2 px-4 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/batteries" className="block text-center bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition mt-2" onClick={() => setMenuOpen(false)}>
                {t('nav.orderNow')}
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}