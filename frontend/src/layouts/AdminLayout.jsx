import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Boxes, Package, Plug, Beaker, Wrench,
  ShoppingCart, Receipt, BarChart3, LogOut, Menu, X, ShieldCheck, MessageSquare,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { useTranslation } from 'react-i18next';

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
  }`;

const NAV = [
  { to: '/admin',                end: true, key: 'dashboard',   Icon: LayoutDashboard },
  { to: '/admin/new-batteries',        key: 'newBatteries', Icon: Boxes },
  { to: '/admin/old-batteries',        key: 'oldBatteries', Icon: Package },
  { to: '/admin/accessories',          key: 'accessories',  Icon: Plug },
  { to: '/admin/acid',                 key: 'acidStock',    Icon: Beaker },
  { to: '/admin/services',             key: 'services',     Icon: Wrench },
  { to: '/admin/sales',                key: 'sales',        Icon: ShoppingCart },
  { to: '/admin/costs',                key: 'expenses',     Icon: Receipt },
  { to: '/admin/reports',              key: 'reports',      Icon: BarChart3 },
  { to: '/admin/messages',             key: 'messages',     Icon: MessageSquare },
];

function SidebarContent({ onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
    onNavigate && onNavigate();
  };
  const handleNav = () => onNavigate && onNavigate();

  return (
    <>
      <div className="p-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-brand-600 p-1.5 rounded-lg">
              <ShieldCheck className="text-white" size={18} />
            </div>
            <span className="font-extrabold text-stone-900 dark:text-white">Admin Panel</span>
          </div>
          <div className="flex items-center gap-0.5">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <p className="text-xs uppercase text-stone-500 dark:text-stone-400">Signed in as</p>
        <p className="font-semibold text-stone-900 dark:text-white truncate">{user?.name}</p>
        <p className="text-xs text-stone-500 dark:text-stone-400 capitalize">{user?.role}</p>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {NAV.map(({ to, end, key, Icon }) => (
            <NavLink key={to} to={to} end={end} className={linkClass} onClick={handleNav}>
              <Icon size={16} /> {t('admin.' + key)}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-3 border-t border-stone-200 dark:border-stone-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={16} /> {t('nav.logout')}
        </button>
      </div>
    </>
  );
}

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen md:flex md:min-h-[calc(100vh-4rem)] bg-stone-50 dark:bg-stone-950">
      <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex-shrink-0">
        <SidebarContent />
      </aside>

      <div className="md:hidden sticky top-0 z-30 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => setOpen(true)}
            className="p-2 -ml-2 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="bg-brand-600 p-1 rounded">
              <ShieldCheck className="text-white" size={14} />
            </div>
            <span className="font-bold text-stone-900 dark:text-white text-sm">Admin</span>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 truncate ml-1 max-w-[80px]">{user?.name}</span>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-white dark:bg-stone-900 shadow-xl flex flex-col">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 p-2 rounded hover:bg-stone-100 dark:hover:bg-stone-800 z-10 text-stone-700 dark:text-stone-300"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <section className="flex-1 p-4 sm:p-6 min-w-0">
        <Outlet />
      </section>
    </div>
  );
}