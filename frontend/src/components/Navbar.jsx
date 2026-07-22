import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Battery, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-md ${
      isActive ? 'text-brand-700 bg-brand-50' : 'text-stone-700 hover:bg-stone-100'
    }`;

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-stone-900">
            <Battery className="text-brand-600" size={24} aria-hidden="true" />
            <span>Habtamu Batteries</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={linkClass} end>Home</NavLink>
            <NavLink to="/batteries" className={linkClass}>Batteries</NavLink>
            <NavLink to="/accessories" className={linkClass}>Accessories</NavLink>
            <NavLink to="/services" className={linkClass}>Services</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/admin" className="btn-primary text-sm">Dashboard</Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>

          <button
            className="md:hidden p-2"
            aria-label="Open menu"
            onClick={() => setMenuOpen((s) => !s)}
          >
            <Menu size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass} end>Home</NavLink>
            <NavLink to="/batteries" onClick={() => setMenuOpen(false)} className={linkClass}>Batteries</NavLink>
            <NavLink to="/accessories" onClick={() => setMenuOpen(false)} className={linkClass}>Accessories</NavLink>
            <NavLink to="/services" onClick={() => setMenuOpen(false)} className={linkClass}>Services</NavLink>
            {user ? (
              <>
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="btn-primary text-sm mt-2">Dashboard</Link>
                <button
                  onClick={() => { logout(); navigate('/'); setMenuOpen(false); }}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>
        )}
      </nav>
    </header>
  );
}