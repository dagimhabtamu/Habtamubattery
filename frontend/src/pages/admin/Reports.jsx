import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import Card from '../../components/Card.jsx';
import { formatCurrency } from '../../utils/format.js';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts';
import { TrendingUp, DollarSign, BarChart3, Wallet } from 'lucide-react';

const COLORS = ['#ea580c', '#0284c7', '#16a34a', '#9333ea', '#eab308', '#dc2626'];

export default function Reports() {
  const [period, setPeriod] = useState('all');
  const { data, loading } = useApi(`/reports/income?period=${period}`);

  const breakdown = data ? Object.entries(data.breakdown).map(([name, value]) => ({ name, value })) : [];
  const costBreakdown = data
    ? Object.entries(data.costsByCategory || {}).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <>
      <Helmet><title>Income & Reports - Admin</title><meta name="robots" content="noindex" /></Helmet>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h1 className="text-2xl font-extrabold text-stone-900">Income & Profit</h1>
        <label className="text-sm">
          <span className="mr-2 text-stone-600">Period:</span>
          <select className="input inline-block py-1.5" value={period}
            onChange={(e) => setPeriod(e.target.value)}>
            <option value="all">All time</option>
            <option value="daily">Today</option>
            <option value="weekly">Last 7 days</option>
            <option value="monthly">This month</option>
          </select>
        </label>
      </div>

      {loading || !data ? (
        <p>Loading report...</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              label="Total revenue"
              value={formatCurrency(data.totals.totalRevenue)}
              icon={<DollarSign/>}
              color="bg-green-50 text-green-700"
            />
            <StatTile
              label="Total costs"
              value={formatCurrency(data.totals.totalCosts)}
              icon={<Wallet/>}
              color="bg-red-50 text-red-700"
            />
            <StatTile
              label="Net profit"
              value={formatCurrency(data.totals.netProfit)}
              icon={<TrendingUp/>}
              color="bg-brand-50 text-brand-700"
            />
            <StatTile
              label="Old battery resale value"
              value={formatCurrency(data.totals.oldBatteryResaleValue)}
              icon={<BarChart3/>}
              color="bg-blue-50 text-blue-700"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2 mt-6">
            <Card>
              <h3 className="font-bold mb-3">Revenue by category</h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={breakdown.filter((b) => b.value !== 0)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="value" fill="#ea580c" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold mb-3">Revenue distribution</h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={breakdown.filter((b) => b.value !== 0)} dataKey="value" nameKey="name"
                      outerRadius={90} label>
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
              <h3 className="font-bold mb-3">Costs by category</h3>
              <div style={{ width: '100%', height: 280 }}>
                <ResponsiveContainer>
                  <BarChart data={costBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="value" fill="#16a34a" radius={[6,6,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card className="mt-4">
            <h3 className="font-bold mb-3">Inventory valuation</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <KV label="New batteries in stock" value={formatCurrency(data.totals.newBatteryInventoryValue)} />
              <KV label="Old batteries (by kg)" value={formatCurrency(data.totals.oldBatteryResaleValue)} />
              <KV label="Accessories in stock" value={formatCurrency(data.totals.accessoryInventoryValue)} />
            </div>
          </Card>
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

function KV({ label, value }) {
  return (
    <div className="rounded-lg bg-stone-50 border border-stone-200 p-4">
      <p className="text-xs text-stone-500 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-bold text-stone-900">{value}</p>
    </div>
  );
}
 
