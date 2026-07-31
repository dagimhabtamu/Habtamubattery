import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ columns, rows, pageSize = 10, searchable = true }) {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const filtered = q
    ? rows.filter((r) =>
        Object.values(r).some(
          (v) => String(v ?? '').toLowerCase().includes(q.toLowerCase())
        )
      )
    : rows;

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-stone-200">
          <div className="relative">
            <Search size={16} className="absolute top-3 left-3 text-stone-400" />
            <input
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search..."
              className="input pl-9"
              aria-label="Search table"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-stone-50">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 font-semibold text-stone-700">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-8 text-stone-500">
                  No records found
                </td>
              </tr>
            )}
            {pageRows.map((r, i) => (
              <tr key={i} className="border-t border-stone-100 hover:bg-stone-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-stone-700">
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-stone-200 text-sm">
        <span className="text-stone-600">
          Page {page} of {totalPages} ({filtered.length} items)
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded border border-stone-300 disabled:opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 rounded border border-stone-300 disabled:opacity-50"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
