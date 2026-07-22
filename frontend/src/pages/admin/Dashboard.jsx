import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import { formatCurrency, formatNumber } from '../../utils/format.js';
import {
  DollarSign, TrendingUp, Boxes, AlertTriangle, Wrench,
} from 'lucide-react';

export default function Dashboard() {
  const { data, loading } = useApi('/reports/summary');
  const tiles = [
    {
      label: "Today's Revenue", value: formatCurrency(data?.todayRevenue), icon: <DollarSign />,
      color: 'bg-green-50 text-green-700',
    },
    {
      label: 'Monthly Revenue', value: formatCurrency(data?.monthlyRevenue), icon: <TrendingUp />,
      color: 'bg-brand-50 text-brand-700',
    },
    {
      label: 'Total Battery Units', value: formatNumber(data?.totalNewBatteryUnits), icon: <Boxes />,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      label: 'Total Accessories', value: formatNumber(data?.totalAccessoryUnits), icon: <Boxes />,
      color: 'bg-indigo-50 text-indigo-700',
    },
    {
      label: 'Pending Services', value: formatNumber(data?.pendingServices), icon: <Wrench />,
      color: 'bg-amber-50 text-amber-700',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Habtamu Batteries</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <h1 className="text-2xl font-extrabold text-stone-900 mb-1">Dashboard</h1>
      <p className="text-stone-500 mb-6">Overview of revenue, stock and operations.</p>

      {loading ? (
        <div className="text-center py-16 text-stone-500">Loading...</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {tiles.map((t) => (
              <div key={t.label} className={`rounded-xl p-5 ${t.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{t.label}</span>
                  <span>{t.icon}</span>
                </div>
                <p className="text-2xl font-extrabold">{t.value}</p>
              </div>
            ))}
          </div>

          <section className="mt-8 bg-white border border-stone-200 rounded-xl p-5">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
              <AlertTriangle className="text-amber-600" size={20}/> Low stock alerts
            </h2>
            {data?.lowStock?.length === 0 ? (
              <p className="text-stone-500 text-sm">All stock levels are healthy.</p>
            ) : (
              <ul className="divide-y divide-stone-100">
                {data?.lowStock?.map((it) => (
                  <li key={it._id} className="py-3 flex items-center justify-between text-sm">
                    <span>
                      <strong className="text-stone-900">{it.brand || it.name}</strong>
                      <span className="text-stone-500 ml-2">{it.kind}</span>
                    </span>
                    <span className="text-amber-700 font-semibold">{it.stockQuantity} left</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </>
  );
}
