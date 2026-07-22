import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import api from '../../utils/api.js';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/format.js';

const empty = {
  name: '', type: 'connector', polarity: 'both', price: 0, stockQuantity: 0,
  unit: 'piece', imageUrl: '',
};

export default function AccessoryAdmin() {
  const { data, loading, refetch } = useApi('/accessories?limit=500');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const items = data?.items || [];

  const openCreate = () => { setForm(empty); setEditing(null); setOpen(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditing(row._id); setOpen(true); };

  const save = async () => {
    try {
      if (editing) await api.put(`/accessories/${editing}`, form);
      else await api.post('/accessories', form);
      toast.success('Saved');
      setOpen(false);
      refetch();
    } catch (e) { toast.error('Save failed'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/accessories/${id}`); toast.success('Removed'); refetch(); }
    catch (e) { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'polarity', label: 'Polarity' },
    { key: 'price', label: 'Price', render: (r) => formatCurrency(r.price) },
    { key: 'stockQuantity', label: 'Stock' },
    { key: 'unit', label: 'Unit' },
    {
      key: 'actions', label: '', render: (r) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-stone-100"><Edit size={16}/></button>
          <button onClick={() => remove(r._id)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 size={16}/></button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet><title>Accessories - Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-stone-900">Accessories</h1>
        <button onClick={openCreate} className="btn-primary inline-flex items-center gap-2"><Plus size={16}/> Add accessory</button>
      </div>
      {loading ? <p>Loading...</p> : <DataTable columns={columns} rows={items} />}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? 'Edit accessory' : 'Add accessory'}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={save} className="btn-primary">Save</button>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <label className="block">
            <span className="block text-sm font-medium text-stone-700 mb-1">Type</span>
            <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="connector">Connector</option>
              <option value="wire">Wire</option>
              <option value="terminal">Terminal</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-stone-700 mb-1">Polarity</span>
            <select className="input" value={form.polarity} onChange={(e) => setForm({ ...form, polarity: e.target.value })}>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="both">Both</option>
              <option value="n/a">N/A</option>
            </select>
          </label>
          <FormInput label="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          <FormInput label="Price" type="number" value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <FormInput label="Stock" type="number" value={form.stockQuantity}
            onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })} />
          <div className="sm:col-span-2">
            <FormInput label="Image URL" value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          </div>
        </div>
      </Modal>
    </>
  );
}
