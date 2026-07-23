import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import api from '../../utils/api.js';
import DataTable from '../../components/DataTable.jsx';
import Modal from '../../components/Modal.jsx';
import FormInput from '../../components/FormInput.jsx';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Globe } from 'lucide-react';
import { formatCurrency } from '../../utils/format.js';

const empty = {
  brand: '', amperage: 60, model: '', price: 0, stockQuantity: 0,
  warrantyMonths: 12, description: '', imageUrl: '', published: false,
};

const TABS = [
  { key: 'all',       label: 'All' },
  { key: 'published', label: 'Live on website' },
  { key: 'draft',     label: 'Draft' },
];

export default function NewBatteryAdmin() {
  // ?all=1 so admin sees drafts too
  const { data, loading, refetch } = useApi('/new-batteries?limit=500&all=1');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState('all');

  const items = data?.items || [];
  const filtered = useMemo(() => {
    if (tab === 'published') return items.filter((b) => b.published);
    if (tab === 'draft')     return items.filter((b) => !b.published);
    return items;
  }, [items, tab]);

  const counts = {
    all:       items.length,
    published: items.filter((b) => b.published).length,
    draft:     items.filter((b) => !b.published).length,
  };

  const openCreate = () => { setForm(empty); setEditing(null); setOpen(true); };
  const openEdit = (row) => { setForm({ ...row }); setEditing(row._id); setOpen(true); };

  const save = async () => {
    try {
      if (editing) await api.put(`/new-batteries/${editing}`, form);
      else await api.post('/new-batteries', form);
      toast.success(editing ? 'Battery updated' : (form.published ? 'Created and published' : 'Saved as draft'));
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
    } catch (e) { toast.error('Delete failed'); }
  };

  const togglePublish = async (row) => {
    try {
      await api.patch(`/new-batteries/${row._id}/publish`);
      toast.success(row.published ? 'Unpublished from website' : 'Published to website');
      refetch();
    } catch (e) { toast.error('Toggle failed'); }
  };

  const columns = [
    {
      key: 'status', label: 'Status',
      render: (r) => r.published
        ? <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded"><Globe size={12}/> Live</span>
        : <span className="inline-flex items-center gap-1 bg-stone-100 text-stone-600 text-xs font-semibold px-2 py-1 rounded">Draft</span>,
    },
    { key: 'brand', label: 'Brand' },
    { key: 'amperage', label: 'Amps' },
    { key: 'model', label: 'Model' },
    { key: 'price', label: 'Price', render: (r) => formatCurrency(r.price) },
    { key: 'stockQuantity', label: 'Stock' },
    { key: 'warrantyMonths', label: 'Warranty (mo)' },
    {
      key: 'actions', label: '', render: (r) => (
        <div className="flex gap-1">
          <button onClick={() => togglePublish(r)}
            className={`p-1.5 rounded transition ${r.published ? 'hover:bg-amber-50 text-amber-700' : 'hover:bg-green-50 text-green-700'}`}
            aria-label={r.published ? 'Unpublish' : 'Publish'}
            title={r.published ? 'Unpublish from website' : 'Publish to website'}>
            {r.published ? <EyeOff size={16}/> : <Eye size={16}/>}
          </button>
          <button onClick={() => openEdit(r)} className="p-1.5 rounded hover:bg-stone-100" aria-label="Edit" title="Edit">
            <Edit size={16} />
          </button>
          <button onClick={() => remove(r._id)} className="p-1.5 rounded hover:bg-red-50 text-red-600" aria-label="Delete" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet><title>New Batteries - Admin</title><meta name="robots" content="noindex" /></Helmet>

      <h1 className="text-2xl font-extrabold text-stone-900 mb-1">New Batteries</h1>
      <p className="text-stone-500 mb-6">Manage your catalog. Only published items appear on the website.</p>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="inline-flex bg-stone-100 rounded-lg p-1">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-md transition ${tab === t.key ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}>
              {t.label} <span className="text-xs text-stone-500">({counts[t.key]})</span>
            </button>
          ))}
        </div>
        <button onClick={openCreate} className="btn-primary inline-flex items-center gap-2">
          <Plus size={16}/> Add battery
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-500">Loading batteries...</div>
      ) : (
        <DataTable columns={columns} rows={filtered} />
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? 'Edit battery' : 'Add new battery'}
        footer={
          <div className="flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="btn-secondary">Cancel</button>
            <button onClick={save} className="btn-primary">
              {editing ? 'Update' : (form.published ? 'Create and publish' : 'Save as draft')}
            </button>
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
              <textarea className="input min-h-[80px]" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </label>
          </div>
          <div className="sm:col-span-2 border-t border-stone-200 pt-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" checked={!!form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-stone-300 text-brand-600 focus:ring-brand-500" />
              <div>
                <span className="block text-sm font-semibold text-stone-900 flex items-center gap-1">
                  <Globe size={14} className="text-brand-600"/> Publish to website
                </span>
                <span className="block text-xs text-stone-500 mt-0.5">
                  {form.published
                    ? 'This battery will be visible on the public site immediately.'
                    : 'Save as draft. You can publish it later from the table.'}
                </span>
              </div>
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
}