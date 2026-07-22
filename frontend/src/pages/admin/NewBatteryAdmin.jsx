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
  brand: '', amperage: 60, model: '', price: 0, stockQuantity: 0,
  warrantyMonths: 12, description: '', imageUrl: '',
};

export default function NewBatteryAdmin() {
  const { data, loading, refetch } = useApi('/new-batteries?limit=500');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const items = data?.items || [];

  const openCreate = () => { setForm(empty); setEditing(null); setOpen(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditing(row._id); setOpen(true); };

  const save = async () => {
    try {
      if (editing) await api.put(`/new-batteries/${editing}`, form);
      else await api.post('/new-batteries', form);
      toast.success(editing ? 'Battery updated' : 'Battery created');
      setOpen(false);
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Save failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this battery?')) return;
    try {
      await api.delete(`/new-batteries/${id}`);
      toast.success('Removed');
      refetch();
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  const columns = [
    { key: 'brand', label: 'Brand' },
    { key: 'amperage', label: 'Amps' },
    { key: 'model', label: 'Model' },
    { key: 'price', label: 'Price', render: (r) => formatCurrency(r.price) },
    { key: 'stockQuantity', label: 'Stock' },
    { key: 'warrantyMonths', label: 'Warranty (mo)' },
    {
      key: 'actions', label: '', render: (r) => (
        <div className="flex gap-2">
          <button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-stone-100" aria-label="Edit">
            <Edit size={16} />
          </button>
          <button onClick={() => remove(r._id)} className="p-1.5 rounded hover:bg-red-50 text-red-600" aria-label="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet><title>New Batteries - Admin</title><meta name="robots" content="noindex" /></Helmet>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-stone-900">New Batteries</h1>
        <button onClick={openCreate} className="btn-primary inline-flex items-center gap-2">
          <Plus size={16}/> Add battery
        </button>
      </div>

      {loading ? <p>Loading...</p> : <DataTable columns={columns} rows={items} />}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? 'Edit battery' : 'Add new battery'}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={save} className="btn-primary">{editing ? 'Update' : 'Create'}</button>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput label="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <FormInput label="Amperage (35-200)" type="number" min={35} max={200}
            value={form.amperage} onChange={(e) => setForm({ ...form, amperage: Number(e.target.value) })} />
          <FormInput label="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} />
          <FormInput label="Price" type="number" value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <FormInput label="Stock quantity" type="number" value={form.stockQuantity}
            onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })} />
          <FormInput label="Warranty (months)" type="number" value={form.warrantyMonths}
            onChange={(e) => setForm({ ...form, warrantyMonths: Number(e.target.value) })} />
          <div className="sm:col-span-2">
            <FormInput label="Image URL (optional)" value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className="block">
              <span className="block text-sm font-medium text-stone-700 mb-1">Description</span>
              <textarea
                className="input min-h-[80px]"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
}
