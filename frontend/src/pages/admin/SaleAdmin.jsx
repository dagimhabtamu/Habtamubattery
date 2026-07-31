import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import api from '../../utils/api.js';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import Card from '../../components/Card.jsx';
import Invoice from '../../components/Invoice.jsx';
import toast from 'react-hot-toast';
import { Plus, FileText, RefreshCcw, ShoppingCart } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format.js';

export default function SaleAdmin() {
  const [tab, setTab] = useState('sales');
  return (
    <>
      <Helmet><title>Sales & Trade-Ins - Admin</title><meta name="robots" content="noindex" /></Helmet>
      <h1 className="text-2xl font-extrabold text-stone-900 mb-4">Sales & Trade-In</h1>

      <div className="flex gap-2 mb-4 border-b border-stone-200">
        {[
          { id: 'sales', label: 'New Battery Sale', icon: <ShoppingCart size={16}/> },
          { id: 'tradein', label: 'Trade-In', icon: <RefreshCcw size={16}/> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 -mb-px ${
              tab === t.id
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === 'sales' ? <NewBatterySale /> : <TradeInForm />}
    </>
  );
}

function NewBatterySale() {
  const { data, loading, refetch } = useApi('/sales?limit=500');
  const [openSale, setOpenSale] = useState(false);
  const [printSale, setPrintSale] = useState(null);

  const items = data?.items || [];

  const columns = [
    { key: 'saleType', label: 'Type' },
    { key: 'customerName', label: 'Customer' },
    { key: 'items', label: 'Items', render: (r) => r.items?.map((i) => i.name).join(', ') },
    { key: 'totalAmount', label: 'Total', render: (r) => formatCurrency(r.totalAmount) },
    { key: 'paymentMethod', label: 'Payment' },
    { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
    {
      key: 'actions', label: '', render: (r) => (
        <button onClick={() => setPrintSale(r)} className="p-1.5 rounded hover:bg-stone-100" aria-label="Receipt">
          <FileText size={16}/>
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-3">
        <button onClick={() => setOpenSale(true)} className="btn-primary inline-flex items-center gap-2">
          <Plus size={16}/> New sale
        </button>
      </div>
      {loading ? <p>Loading...</p> : <DataTable columns={columns} rows={items} />}

      <SaleModal open={openSale} onClose={() => setOpenSale(false)} refetch={refetch} />
      <Modal open={!!printSale} onClose={() => setPrintSale(null)} title="Receipt" size="lg">
        {printSale && <Invoice sale={printSale} />}
      </Modal>
    </>
  );
}

function SaleModal({ open, onClose, refetch }) {
  const { data: batData } = useApi('/new-batteries?limit=500');
  const { data: accData } = useApi('/accessories?limit=500');
  const [form, setForm] = useState({
    saleType: 'newBattery',
    batteryId: '',
    accessoryId: '',
    quantity: 1,
    customerName: '',
    paymentMethod: 'cash',
  });

  const submit = async () => {
    try {
      if (form.saleType === 'newBattery') {
        const b = batData?.items.find((x) => x._id === form.batteryId);
        if (!b) return toast.error('Pick a battery');
        await api.post('/sales', {
          saleType: 'newBattery',
          items: [{
            refId: b._id, refModel: 'NewBattery',
            name: `${b.brand} ${b.amperage}Ah`,
            quantity: Number(form.quantity), unitPrice: b.price,
            subtotal: b.price * Number(form.quantity),
          }],
          totalAmount: b.price * Number(form.quantity),
          customerName: form.customerName,
          paymentMethod: form.paymentMethod,
        });
      } else if (form.saleType === 'accessory') {
        const a = accData?.items.find((x) => x._id === form.accessoryId);
        if (!a) return toast.error('Pick an accessory');
        await api.post('/sales', {
          saleType: 'accessory',
          items: [{
            refId: a._id, refModel: 'Accessory', name: a.name,
            quantity: Number(form.quantity), unitPrice: a.price,
            subtotal: a.price * Number(form.quantity),
          }],
          totalAmount: a.price * Number(form.quantity),
          customerName: form.customerName,
          paymentMethod: form.paymentMethod,
        });
      }
      toast.success('Sale recorded');
      onClose();
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Sale failed');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Record new sale"
      footer={
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={submit} className="btn-primary">Record sale</button>
        </div>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-stone-700 mb-1">Sale type</span>
          <select className="input" value={form.saleType}
            onChange={(e) => setForm({ ...form, saleType: e.target.value })}>
            <option value="newBattery">New battery</option>
            <option value="accessory">Accessory</option>
          </select>
        </label>

        {form.saleType === 'newBattery' && (
          <label className="block sm:col-span-2">
            <span className="block text-sm font-medium text-stone-700 mb-1">Battery</span>
            <select className="input" value={form.batteryId}
              onChange={(e) => setForm({ ...form, batteryId: e.target.value })}>
              <option value="">Select a battery</option>
              {batData?.items.map((b) => (
                <option key={b._id} value={b._id}>{b.brand} {b.amperage}Ah - {formatCurrency(b.price)}</option>
              ))}
            </select>
          </label>
        )}

        {form.saleType === 'accessory' && (
          <label className="block sm:col-span-2">
            <span className="block text-sm font-medium text-stone-700 mb-1">Accessory</span>
            <select className="input" value={form.accessoryId}
              onChange={(e) => setForm({ ...form, accessoryId: e.target.value })}>
              <option value="">Select accessory</option>
              {accData?.items.map((a) => (
                <option key={a._id} value={a._id}>{a.name} - {formatCurrency(a.price)}</option>
              ))}
            </select>
          </label>
        )}

        <FormInput label="Quantity" type="number" min={1} value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
        <FormInput label="Payment method" value={form.paymentMethod}
          onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} />
        <FormInput label="Customer name" value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
      </div>
    </Modal>
  );
}

function TradeInForm() {
  const { data: batData } = useApi('/new-batteries?limit=500');
  const [form, setForm] = useState({
    newBatteryId: '',
    oldBatteryBrand: '',
    oldBatteryAmp: 60,
    oldBatteryValue: 0,
    customerName: '',
    paymentMethod: 'cash',
  });
  const [result, setResult] = useState(null);

  const submit = async () => {
    try {
      const { data } = await api.post('/sales/trade-in', form);
      setResult(data);
      toast.success('Trade-in recorded');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Trade-in failed');
    }
  };

  const selectedBat = batData?.items.find((b) => b._id === form.newBatteryId);
  const priceDifference = selectedBat ? selectedBat.price - Number(form.oldBatteryValue) : 0;

  return (
    <Card>
      <h2 className="font-bold mb-3">Record trade-in</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-stone-700 mb-1">New battery</span>
          <select className="input" value={form.newBatteryId}
            onChange={(e) => setForm({ ...form, newBatteryId: e.target.value })}>
            <option value="">Select new battery</option>
            {batData?.items.map((b) => (
              <option key={b._id} value={b._id}>{b.brand} {b.amperage}Ah - {formatCurrency(b.price)}</option>
            ))}
          </select>
        </label>
        <FormInput label="Old battery brand" value={form.oldBatteryBrand}
          onChange={(e) => setForm({ ...form, oldBatteryBrand: e.target.value })} />
        <FormInput label="Old battery amp" type="number" value={form.oldBatteryAmp}
          onChange={(e) => setForm({ ...form, oldBatteryAmp: Number(e.target.value) })} />
        <FormInput label="Trade-in value (what we credit)" type="number" value={form.oldBatteryValue}
          onChange={(e) => setForm({ ...form, oldBatteryValue: Number(e.target.value) })} />
        <FormInput label="Customer name" value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
      </div>
      {selectedBat && (
        <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-lg text-sm">
          New battery: {formatCurrency(selectedBat.price)} <br />
          Trade-in credit: -{formatCurrency(form.oldBatteryValue)} <br />
          <strong>Customer pays: {formatCurrency(priceDifference)}</strong>
        </div>
      )}
      <button onClick={submit} className="btn-primary mt-4">Record trade-in</button>

      {result && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Generated record</h3>
          <Invoice sale={result.sale} />
        </div>
      )}
    </Card>
  );
}
