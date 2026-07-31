import { formatCurrency, formatDate } from '../utils/format.js';
import { Printer } from 'lucide-react';

export default function Invoice({ sale, business = 'Habtamu Batteries' }) {
  if (!sale) return null;

  const printIt = () => window.print();

  return (
    <div className="bg-white">
      <div className="flex justify-end mb-2 print:hidden">
        <button onClick={printIt} className="btn-secondary text-sm inline-flex items-center gap-2">
          <Printer size={16} /> Print receipt
        </button>
      </div>
      <div className="invoice-print p-6 border border-stone-200 rounded-xl">
        <header className="flex justify-between items-start border-b border-stone-200 pb-4 mb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900">{business}</h1>
            <p className="text-sm text-stone-500">Bole Road, Addis Ababa &middot; +251 911 000 000</p>
          </div>
          <div className="text-right text-sm">
            <p><strong>Receipt #</strong> {sale._id?.slice(-8).toUpperCase()}</p>
            <p><strong>Date:</strong> {formatDate(sale.createdAt)}</p>
            <p><strong>Type:</strong> {sale.saleType}</p>
          </div>
        </header>

        <p className="mb-3 text-sm">
          <strong>Customer:</strong> {sale.customerName || 'Walk-in'}
        </p>

        <table className="w-full text-sm mb-4">
          <thead className="bg-stone-100">
            <tr>
              <th className="text-left px-3 py-2">Item</th>
              <th className="text-right px-3 py-2">Qty</th>
              <th className="text-right px-3 py-2">Unit</th>
              <th className="text-right px-3 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {sale.items.map((it, i) => (
              <tr key={i} className="border-t border-stone-200">
                <td className="px-3 py-2">{it.name}</td>
                <td className="px-3 py-2 text-right">{it.quantity}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(it.unitPrice)}</td>
                <td className="px-3 py-2 text-right">{formatCurrency(it.subtotal)}</td>
              </tr>
            ))}
            {sale.tradeIn && (
              <tr className="border-t border-stone-200 bg-amber-50">
                <td className="px-3 py-2" colSpan={3}>
                  Trade-in credit ({sale.tradeIn.oldBatteryBrand} {sale.tradeIn.oldBatteryAmp}Ah)
                </td>
                <td className="px-3 py-2 text-right">
                  -{formatCurrency(sale.tradeIn.oldBatteryValue)}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-2xl font-extrabold text-brand-700">
              Total: {formatCurrency(sale.totalAmount)}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Payment: {sale.paymentMethod || 'cash'}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-stone-500 mt-6">
          Thank you for your business. Warranties honored with this receipt.
        </p>
      </div>
    </div>
  );
}
