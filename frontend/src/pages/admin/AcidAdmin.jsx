import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useApi } from '../../hooks/useApi.js';
import api from '../../utils/api.js';
import FormInput from '../../components/FormInput.jsx';
import Card from '../../components/Card.jsx';
import toast from 'react-hot-toast';
import { Beaker } from 'lucide-react';
import { formatCurrency } from '../../utils/format.js';

export default function AcidAdmin() {
  const { data, loading, refetch } = useApi('/acid');
  const [form, setForm] = useState({ quantityLiters: 0, pricePerLiter: 0, costPerLiter: 0 });

  useEffect(() => {
    if (data) setForm({
      quantityLiters: data.quantityLiters || 0,
      pricePerLiter: data.pricePerLiter || 0,
      costPerLiter: data.costPerLiter || 0,
    });
  }, [data]);

  const save = async () => {
    try { await api.put('/acid', form); toast.success('Acid stock updated'); refetch(); }
    catch (e) { toast.error('Save failed'); }
  };

  const profit = (Number(form.pricePerLiter) - Number(form.costPerLiter)) * Number(form.quantityLiters);

  return (
    <>
      <Helmet><title>Acid Stock - Admin</title><meta name="robots" content="noindex" /></Helmet>
      <h1 className="text-2xl font-extrabold text-stone-900 mb-4 flex items-center gap-2">
        <Beaker className="text-brand-600" size={26}/> Acid Stock
      </h1>

      {loading ? <p>Loading...</p> : (
        <Card className="max-w-xl">
          <div className="grid gap-3 sm:grid-cols-2">
            <FormInput
              label="Quantity (liters)" type="number" value={form.quantityLiters}
              onChange={(e) => setForm({ ...form, quantityLiters: Number(e.target.value) })}
            />
            <FormInput
              label="Selling price / liter" type="number" value={form.pricePerLiter}
              onChange={(e) => setForm({ ...form, pricePerLiter: Number(e.target.value) })}
            />
            <FormInput
              label="Cost / liter" type="number" value={form.costPerLiter}
              onChange={(e) => setForm({ ...form, costPerLiter: Number(e.target.value) })}
            />
          </div>
          <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-lg text-sm">
            Potential profit at current stock: <strong>{formatCurrency(profit)}</strong>
          </div>
          <button onClick={save} className="btn-primary mt-4">Save changes</button>
        </Card>
      )}
    </>
  );
}
