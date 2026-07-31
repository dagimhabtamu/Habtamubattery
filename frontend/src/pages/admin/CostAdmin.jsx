import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import api from '../../utils/api.js';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/format.js';

const empty = { category: 'oxygenRefill', description: '', amount: 0 };

export default function CostAdmin() {
  const { data, loading, refetch } = useApi('/costs?limit=500');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const items = data?.items || [];

  const openCreate = () => { setForm(empty); setEditing(null); setOpen(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditing(row._id); setOpen(true); };

  const save = async () => {
    try {
      if (editing) await api.put(`/costs/${editing}`, form);
      else await api.post('/costs', form);
      toast.success(editing ? 'Expense updated' : 'Expense recorded');
      setOpen(false);
      refetch();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Save failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this expense?')) return;
    try {
      await api.delete(`/costs/${id}`);
      toast.success('Removed');
      refetch();
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  const columns = [
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount', render: (r) => formatCurrency(r.amount) },
    { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
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
      <Helmet><title>Expenses - Admin</title><meta name="robots" content="noindex" /></Helmet>

      <h1 className="text-2xl font-extrabold text-stone-900 mb-1">Expenses</h1>
      <p className="text-stone-500 mb-6">Track and manage business expenses by category.</p>

      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-stone-500">{items.length} total expense(s)</span>
        <button onClick={openCreate} className="btn-primary inline-flex items-center gap-2">
          <Plus size={16}/> Add expense
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-500">Loading expenses...</div>
      ) : (
        <DataTable columns={columns} rows={items} />
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? 'Edit expense' : 'New expense'}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={save} className="btn-primary">{editing ? 'Update' : 'Save'}</button>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="block text-sm font-medium text-stone-700 mb-1">Category</span>
            <select className="input" value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="oxygenRefill">Oxygen refill</option>
              <option value="acidPurchase">Acid purchase</option>
              <option value="accessoryRestock">Accessory restock</option>
              <option value="batteryPurchase">Battery purchase</option>
              <option value="other">Other</option>
            </select>
          </label>
          <FormInput label="Amount" type="number" value={form.amount}
            onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
          <div className="sm:col-span-2">
            <label className="block">
              <span className="block text-sm font-medium text-stone-700 mb-1">Description</span>
              <textarea className="input min-h-[80px]" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
}