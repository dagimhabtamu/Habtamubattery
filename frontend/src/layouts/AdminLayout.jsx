import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Boxes, Package, Plug, Beaker, Wrench,
  ShoppingCart, Receipt, BarChart3, LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-stone-700 hover:bg-stone-100'
  }`;

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-stone-50">
      <aside className="w-64 bg-white border-r border-stone-200 p-4 hidden md:block" aria-label="Admin sidebar">
        <div className="mb-6">
          <p className="text-xs uppercase text-stone-500">Signed in as</p>
          <p className="font-semibold text-stone-900">{user?.name}</p>
          <p className="text-xs text-stone-500">{user?.role}</p>
        </div>
        <nav className="flex flex-col gap-1">
          <NavLink to="/admin" end className={linkClass}><LayoutDashboard size={16}/> Dashboard</NavLink>
          <NavLink to="/admin/new-batteries" className={linkClass}><Boxes size={16}/> New Batteries</NavLink>
          <NavLink to="/admin/old-batteries" className={linkClass}><Package size={16}/> Old Batteries</NavLink>
          <NavLink to="/admin/accessories" className={linkClass}><Plug size={16}/> Accessories</NavLink>
          <NavLink to="/admin/acid" className={linkClass}><Beaker size={16}/> Acid Stock</NavLink>
          <NavLink to="/admin/services" className={linkClass}><Wrench size={16}/> Services</NavLink>
          <NavLink to="/admin/sales" className={linkClass}><ShoppingCart size={16}/> Sales & Trade-In</NavLink>
          <NavLink to="/admin/costs" className={linkClass}><Receipt size={16}/> Expenses</NavLink>
          <NavLink to="/admin/reports" className={linkClass}><BarChart3 size={16}/> Reports</NavLink>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 mt-4"
          >
            <LogOut size={16}/> Logout
          </button>
        </nav>
      </aside>

      <section className="flex-1 p-6">
        <Outlet />
      </section>
    </div>
  );
}
