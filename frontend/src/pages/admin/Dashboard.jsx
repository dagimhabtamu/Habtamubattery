import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import { formatCurrency, formatNumber } from '../../utils/format.js';
import {
  DollarSign, TrendingUp, Boxes, AlertTriangle, Wrench, ArrowUpRight, Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TILE_DEFS = [
  { key: 'todayRevenue',          label: "Today's Revenue",  icon: DollarSign, color: 'bg-emerald-50 text-emerald-700 border-emerald-200', iconBg: 'bg-emerald-100' },
  { key: 'monthlyRevenue',        label: 'Monthly Revenue',  icon: TrendingUp, color: 'bg-orange-50 text-orange-700 border-orange-200',   iconBg: 'bg-orange-100' },
  { key: 'totalNewBatteryUnits',  label: 'Total Battery Units', icon: Boxes,  color: 'bg-blue-50 text-blue-700 border-blue-200',         iconBg: 'bg-blue-100' },
  { key: 'totalAccessoryUnits',   label: 'Total Accessories',   icon: Boxes,  color: 'bg-indigo-50 text-indigo-700 border-indigo-200',   iconBg: 'bg-indigo-100' },
  { key: 'pendingServices',       label: 'Pending Services',  icon: Wrench,    color: 'bg-amber-50 text-amber-700 border-amber-200',       iconBg: 'bg-amber-100' },
];

export default function Dashboard() {
  const { data, loading } = useApi('/reports/summary');

  const getValue = (key) => {
    if (!data) return 0;
    if (key === 'todayRevenue' || key === 'monthlyRevenue') return formatCurrency(data[key]);
    return formatNumber(data[key]);
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Habtamu Batteries</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 mt-1">Overview of revenue, stock and operations.</p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-500">
          <div className="inline-block w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="mt-3 text-sm">Loading dashboard...</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
            {TILE_DEFS.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.key} className={`rounded-xl p-5 border ${t.color} hover:shadow-md transition-shadow`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${t.iconBg} flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider opacity-80">{t.label}</p>
                  <p className="text-2xl font-extrabold mt-1">{getValue(t.key)}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <section className="lg:col-span-2 bg-white border border-stone-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <AlertTriangle className="text-amber-600" size={20} />
                  Low stock alerts
                </h2>
                <Link to="/admin/new-batteries" className="text-sm font-semibold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1">
                  Manage stock <ArrowUpRight size={14} />
                </Link>
              </div>

              {!data?.lowStock || data.lowStock.length === 0 ? (
                <div className="text-center py-10 bg-stone-50 rounded-lg">
                  <Boxes className="mx-auto text-stone-300 mb-2" size={32} />
                  <p className="text-stone-500 text-sm">All stock levels are healthy.</p>
                </div>
              ) : (
                <ul className="divide-y divide-stone-100">
                  {data.lowStock.slice(0, 6).map((it) => (
                    <li key={it._id} className="py-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 truncate">{it.brand || it.name}</p>
                          <p className="text-xs text-stone-500 capitalize">{it.kind}</p>
                        </div>
                      </div>
                      <span className="text-amber-700 font-semibold whitespace-nowrap ml-2">
                        {it.stockQuantity} left
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="bg-white border border-stone-200 rounded-xl p-6">
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2 mb-4">
                <Activity className="text-orange-600" size={20} />
                Quick actions
              </h2>
              <div className="space-y-2">
                <Link to="/admin/new-batteries" className="block px-4 py-3 rounded-lg bg-stone-50 hover:bg-orange-50 hover:text-orange-700 text-stone-700 text-sm font-semibold transition">
                  + Add new battery
                </Link>
                <Link to="/admin/sales" className="block px-4 py-3 rounded-lg bg-stone-50 hover:bg-orange-50 hover:text-orange-700 text-stone-700 text-sm font-semibold transition">
                  + Record a sale
                </Link>
                <Link to="/admin/services" className="block px-4 py-3 rounded-lg bg-stone-50 hover:bg-orange-50 hover:text-orange-700 text-stone-700 text-sm font-semibold transition">
                  + Add service
                </Link>
                <Link to="/admin/costs" className="block px-4 py-3 rounded-lg bg-stone-50 hover:bg-orange-50 hover:text-orange-700 text-stone-700 text-sm font-semibold transition">
                  + Log expense
                </Link>
                <Link to="/admin/messages" className="block px-4 py-3 rounded-lg bg-stone-50 hover:bg-orange-50 hover:text-orange-700 text-stone-700 text-sm font-semibold transition">
                  + View messages
                </Link>
              </div>

              <div className="mt-6 pt-5 border-t border-stone-100">
                <p className="text-xs text-stone-500 font-semibold uppercase tracking-wider mb-2">Tip</p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Check the Reports page weekly to track sales trends and identify your best-selling batteries.
                </p>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}