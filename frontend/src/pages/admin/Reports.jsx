import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import Card from '../../components/Card.jsx';
import DataTable from '../../components/DataTable.jsx';
import { formatCurrency } from '../../utils/format.js';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { DollarSign, TrendingUp, BarChart3, Wallet } from 'lucide-react';

const COLORS = ['#ea580c', '#0284c7', '#16a34a', '#9333ea', '#eab308', '#dc2626'];

export default function Reports() {
  const [period, setPeriod] = useState('all');
  const { data, loading } = useApi(`/reports/income?period=${period}`);

  const breakdown = data ? Object.entries(data.breakdown).map(([name, value]) => ({ name, value })) : [];
  const costBreakdown = data
    ? Object.entries(data.costsByCategory || {}).map(([name, value]) => ({ name, value }))
    : [];

  const inventoryRows = data
    ? [
        { label: 'New batteries in stock', value: formatCurrency(data.totals.newBatteryInventoryValue) },
        { label: 'Old batteries (by kg)', value: formatCurrency(data.totals.oldBatteryResaleValue) },
        { label: 'Accessories in stock', value: formatCurrency(data.totals.accessoryInventoryValue) },
      ]
    : [];

  const inventoryColumns = [
    { key: 'label', label: 'Item' },
    { key: 'value', label: 'Value', render: (r) => <strong>{r.value}</strong> },
  ];

  return (
    <>
      <Helmet>
        <title>Income & Reports - Admin</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
        <h1 className="text-2xl font-extrabold text-stone-900">Income & Profit</h1>
        <label className="text-sm flex items-center gap-2">
          <span className="text-stone-600">Period:</span>
          <select
            className="input inline-block py-1.5"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="all">All time</option>
            <option value="daily">Today</option>
            <option value="weekly">Last 7 days</option>
            <option value="monthly">This month</option>
          </select>
        </label>
      </div>
      <p className="text-stone-500 mb-6">Revenue, costs, and profit insights for the selected period.</p>

      {loading || !data ? (
        <div className="text-center py-16 text-stone-500">Loading report...</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Total revenue"      value={formatCurrency(data.totals.totalRevenue)}          icon={<DollarSign/>}  color="bg-green-50 text-green-700" />
            <StatTile label="Total costs"        value={formatCurrency(data.totals.totalCosts)}            icon={<Wallet/>}      color="bg-red-50 text-red-700" />
            <StatTile label="Net profit"         value={formatCurrency(data.totals.netProfit)}             icon={<TrendingUp/>}   color="bg-brand-50 text-brand-700" />
            <StatTile label="Old battery resale" value={formatCurrency(data.totals.oldBatteryResaleValue)} icon={<BarChart3/>}   color="bg-indigo-50 text-indigo-700" />
          </div>

          <div className="grid gap-4 lg:grid-cols-2 mt-6">
            <Card>
              <h3 className="font-bold mb-3 text-stone-900">Revenue by category</h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={breakdown.filter((b) => b.value !== 0)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="value" fill="#ea580c" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold mb-3 text-stone-900">Revenue distribution</h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={breakdown.filter((b) => b.value !== 0)}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {breakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="lg:col-span-2">
              <h3 className="font-bold mb-3 text-stone-900">Costs by category</h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={costBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold text-stone-900 mb-3">Inventory valuation</h2>
            <DataTable columns={inventoryColumns} rows={inventoryRows} searchable={false} pageSize={10} />
          </div>
        </>
      )}
    </>
  );
}

function StatTile({ label, value, icon, color }) {
  return (
    <div className={`rounded-xl p-5 ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold">{label}</span>
        <span>{icon}</span>
      </div>
      <p className="text-2xl font-extrabold">{value}</p>
    </div>
  );
}