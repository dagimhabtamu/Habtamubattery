import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import api from '../../utils/api.js';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format.js';

const empty = {
  type: 'acidChange', description: '', price: 0, cost: 0, customerName: '',
};

export default function ServiceAdmin() {
  const { data, loading, refetch } = useApi('/services?limit=500');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);

  const items = data?.items || [];

  const openCreate = () => { setForm(empty); setOpen(true); };

  const save = async () => {
    try {
      await api.post('/services', form);
      toast.success('Service recorded');
      setOpen(false);
      refetch();
    } catch (e) { toast.error('Save failed'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/services/${id}`); toast.success('Removed'); refetch(); }
    catch (e) { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'type', label: 'Type' },
    { key: 'description', label: 'Description' },
    { key: 'customerName', label: 'Customer' },
    { key: 'price', label: 'Price', render: (r) => formatCurrency(r.price) },
    { key: 'cost', label: 'Cost', render: (r) => formatCurrency(r.cost) },
    { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
    {
      key: 'actions', label: '', render: (r) => (
        <button onClick={() => remove(r._id)} className="p-1.5 rounded hover:bg-red-50 text-red-600" aria-label="Delete">
          <Trash2 size={16}/>
        </button>
      ),
    },
  ];

  return (
    <>
      <Helmet><title>Services - Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-stone-900">Services</h1>
        <button onClick={openCreate} className="btn-primary inline-flex items-center gap-2"><Plus size={16}/> Record service</button>
      </div>
      {loading ? <p>Loading...</p> : <DataTable columns={columns} rows={items} />}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Record service job"
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={save} className="btn-primary">Save</button>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="block text-sm font-medium text-stone-700 mb-1">Service type</span>
            <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="acidChange">Acid change</option>
              <option value="terminalFix">Terminal fix</option>
              <option value="repair">General repair</option>
              <option value="oxygenRefill">Oxygen refill</option>
              <option value="other">Other</option>
            </select>
          </label>
          <FormInput label="Customer name" value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
          <FormInput label="Price charged" type="number" value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <FormInput label="Our cost" type="number" value={form.cost}
            onChange={(e) => setForm({ ...form, cost: Number(e.target.value) })} />
          <div className="sm:col-span-2">
            <label className="block">
              <span className="block text-sm font-medium text-stone-700 mb-1">Notes</span>
              <textarea className="input min-h-[80px]" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
}
