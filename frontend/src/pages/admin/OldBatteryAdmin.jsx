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
  brand: '', amperage: 60, weightKg: 0, purchasePrice: 0, pricePerKg: 0,
  condition: 'working', status: 'in-stock', acquiredFrom: '',
};

export default function OldBatteryAdmin() {
  const { data, loading, refetch } = useApi('/old-batteries?limit=500');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const items = data?.items || [];

  const openCreate = () => { setForm(empty); setEditing(null); setOpen(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditing(row._id); setOpen(true); };

  const save = async () => {
    try {
      if (editing) await api.put(`/old-batteries/${editing}`, form);
      else await api.post('/old-batteries', form);
      toast.success('Saved');
      setOpen(false);
      refetch();
    } catch (e) { toast.error('Save failed'); }
  };

  const remove = async (id) => {
    if (!confirm('Delete?')) return;
    try { await api.delete(`/old-batteries/${id}`); toast.success('Removed'); refetch(); }
    catch (e) { toast.error('Delete failed'); }
  };

  const columns = [
    { key: 'brand', label: 'Brand' },
    { key: 'amperage', label: 'Amps' },
    { key: 'weightKg', label: 'Weight (kg)' },
    { key: 'purchasePrice', label: 'Paid', render: (r) => formatCurrency(r.purchasePrice) },
    { key: 'pricePerKg', label: 'Per kg', render: (r) => formatCurrency(r.pricePerKg) },
    { key: 'condition', label: 'Condition' },
    { key: 'status', label: 'Status' },
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
      <Helmet><title>Old Batteries - Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold text-stone-900">Old Batteries</h1>
        <button onClick={openCreate} className="btn-primary inline-flex items-center gap-2"><Plus size={16}/> Record old battery</button>
      </div>
      {loading ? <p>Loading...</p> : <DataTable columns={columns} rows={items} />}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? 'Edit old battery' : 'Receive old battery from customer'}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={save} className="btn-primary">Save</button>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <FormInput label="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <FormInput label="Amperage" type="number" value={form.amperage}
            onChange={(e) => setForm({ ...form, amperage: Number(e.target.value) })} />
          <FormInput label="Weight (kg)" type="number" value={form.weightKg}
            onChange={(e) => setForm({ ...form, weightKg: Number(e.target.value) })} />
          <FormInput label="We paid customer" type="number" value={form.purchasePrice}
            onChange={(e) => setForm({ ...form, purchasePrice: Number(e.target.value) })} />
          <FormInput label="Resale price / kg" type="number" value={form.pricePerKg}
            onChange={(e) => setForm({ ...form, pricePerKg: Number(e.target.value) })} />
          <label className="block">
            <span className="block text-sm font-medium text-stone-700 mb-1">Condition</span>
            <select className="input" value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}>
              <option value="working">Working</option>
              <option value="repairable">Repairable</option>
              <option value="scrap">Scrap</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-stone-700 mb-1">Status</span>
            <select className="input" value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="in-stock">In stock</option>
              <option value="maintained">Maintained</option>
              <option value="sold">Sold</option>
            </select>
          </label>
          <FormInput label="Customer / Source" value={form.acquiredFrom}
            onChange={(e) => setForm({ ...form, acquiredFrom: e.target.value })} />
        </div>
      </Modal>
    </>
  );
}
