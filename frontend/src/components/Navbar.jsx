import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Battery, Menu, X, Home, Package, Plug, Wrench, Info, Phone, ArrowRight, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const linkClass = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
    isActive
      ? 'text-orange-700 bg-orange-50'
      : 'text-stone-700 hover:bg-stone-100'
  }`;

const NAV_ITEMS = [
  { to: '/',            key: 'home',        label: 'Home',        Icon: Home },
  { to: '/batteries',   key: 'batteries',   label: 'Batteries',   Icon: Package },
  { to: '/accessories', key: 'accessories', label: 'Accessories', Icon: Plug },
  { to: '/services',    key: 'services',    label: 'Services',    Icon: Wrench },
  { to: '/about',       key: 'about',       label: 'About',       Icon: Info },
  { to: '/contact',     key: 'contact',     label: 'Contact',     Icon: Phone },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    if (menuOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className="border-b border-stone-200 sticky top-0 z-40"
        style={{ backgroundColor: 'var(--navbar-bg, #ffffff)' }}
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
              {NAV_ITEMS.map(({ to, key, label, end }) => (
                <NavLink key={to} to={to} end={end} className={linkClass}>
                  {t('nav.' + key) || label}
                </NavLink>
              ))}
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
              className="lg:hidden p-2 -mr-2 rounded-lg text-stone-700 hover:bg-stone-100 active:bg-stone-200 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div
            className="absolute inset-x-0 top-0 bg-white shadow-2xl flex flex-col animate-[slideDown_300ms_ease-out]"
            style={{ maxHeight: '100vh' }}
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-stone-200 shrink-0">
              <Link to="/" onClick={closeMenu} className="flex items-center gap-2 font-bold text-stone-900">
                <div className="bg-orange-600 p-1.5 rounded-lg">
                  <Battery className="text-white" size={20} />
                
</div>


                <span className="text-base">Habtamu Batteries</span>
              </Link>
              <button
                onClick={closeMenu}
                className="p-2 -mr-2 rounded-lg text-stone-700 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {NAV_ITEMS.map(({ to, key, label, Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-orange-50 text-orange-700'
                        : 'text-stone-700 hover:bg-stone-50 active:bg-stone-100'
                    }`
                  }
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="flex-1">{t('nav.' + key) || label}</span>
                  <ArrowRight size={16} className="text-stone-400" />
                </NavLink>
              ))}
            </div>

            <div className="border-t border-stone-200 px-4 py-4 space-y-3 bg-stone-50 shrink-0">
              <div className="flex items-center justify-between gap-2 pb-1">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Settings</span>
                <div className="flex items-center gap-1">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>

              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-stone-200">
                    <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                      <User size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900 text-sm truncate">{user.name}</p>
                      <p className="text-xs text-stone-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="text-center bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); navigate('/'); closeMenu(); }}
                      className="bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-sm font-semibold py-2.5 px-4 rounded-xl transition inline-flex items-center justify-center gap-1"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/batteries"
                  onClick={closeMenu}
                  className="block text-center bg-orange-600 hover:bg-orange-700 text-white text-base font-bold py-3 px-4 rounded-xl transition shadow-sm"
                >
                  {t('nav.orderNow')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-12px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}