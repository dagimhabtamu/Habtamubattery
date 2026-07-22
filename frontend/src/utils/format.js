export const formatCurrency = (n) =>
  new Intl.NumberFormat('en-ET', { style: 'currency', currency: 'ETB', maximumFractionDigits: 2 })
    .format(Number(n || 0));

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-ET', { year: 'numeric', month: 'short', day: 'numeric' });

export const formatNumber = (n) => new Intl.NumberFormat('en-ET').format(Number(n || 0));
