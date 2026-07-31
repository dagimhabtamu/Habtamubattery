import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../utils/api.js';
import { Inbox, Mail, Trash2, Eye, Search, MessageSquare, AlertCircle } from 'lucide-react';
import { formatDate } from '../../utils/format.js';
import toast from 'react-hot-toast';
import Modal from '../../components/Modal.jsx';

const TABS = [
  { key: 'unread',   label: 'Unread' },
  { key: 'all',      label: 'All' },
  { key: 'archived', label: 'Archived' },
];

export default function ContactMessages() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [tab, setTab]           = useState('unread');
  const [q, setQ]               = useState('');
  const [active, setActive]     = useState(null);
  const [unreadCount, setUnread] = useState(0);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/contact-messages?limit=200');
      const data = res.data || {};
      setItems(data.items || []);
      setUnread(data.unread || 0);
    } catch (err) {
      console.error('Failed to load messages:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const open = async (msg) => {
    setActive(msg);
    if (!msg.read) {
      try {
        await api.patch(`/contact-messages/${msg._id}/read`, { read: true });
        await load();
      } catch (e) { /* ignore */ }
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact-messages/${id}`);
      toast.success('Deleted');
      setActive(null);
      await load();
    } catch (e) { toast.error('Delete failed'); }
  };

  const filtered = (() => {
    let list = items;
    if (tab === 'unread')   list = list.filter((m) => !m.read && !m.archived);
    if (tab === 'archived') list = list.filter((m) => m.archived);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter((m) =>
        (m.name + ' ' + m.email + ' ' + m.message).toLowerCase().includes(needle)
      );
    }
    return list;
  })();

  const counts = {
    unread:   items.filter((m) => !m.read && !m.archived).length,
    all:      items.filter((m) => !m.archived).length,
    archived: items.filter((m) => m.archived).length,
  };

  return (
    <>
      <Helmet><title>Messages - Admin</title><meta name="robots" content="noindex" /></Helmet>

      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2">
          <MessageSquare className="text-brand-600" size={26} />
          Contact Messages
          {unreadCount > 0 && (
            <span className="bg-brand-600 text-white text-sm font-bold rounded-full px-2.5 py-0.5 ml-1">{unreadCount}</span>
          )}
        </h1>
      </div>
      <p className="text-stone-500 mb-6">Messages submitted through the public contact form.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-red-900">Failed to load messages</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button onClick={load} className="mt-2 text-sm text-red-700 underline font-semibold">Try again</button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="inline-flex bg-stone-100 rounded-lg p-1 self-start">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-md transition ${tab === t.key ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'}`}>
              {t.label} <span className="text-xs text-stone-500">({counts[t.key]})</span>
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute top-3 left-3 text-stone-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} className="input pl-9" placeholder="Search messages..." />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-stone-500">Loading messages...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-stone-200 rounded-xl">
          <Inbox className="mx-auto text-stone-300 mb-3" size={48} />
          <p className="text-stone-500">
            {error ? 'Could not load messages.' : 'No messages in this view.'}
          </p>
          {!error && <p className="text-xs text-stone-400 mt-2">Submit a test message from the /contact page to see it here.</p>}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700 w-10"></th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">From</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700 hidden md:table-cell">Message</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700">Received</th>
                  <th className="text-left px-4 py-3 font-semibold text-stone-700 w-20"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m._id} className="border-t border-stone-100 hover:bg-stone-50 cursor-pointer" onClick={() => open(m)}>
                    <td className="px-4 py-3">
                      {m.read ? <Mail className="text-stone-300" size={16} /> : <span className="inline-block w-2 h-2 rounded-full bg-brand-600" />}
                    </td>
                    <td className="px-4 py-3">
                      <p className={'font-semibold ' + (!m.read ? 'text-stone-900' : 'text-stone-600')}>{m.name}</p>
                      <p className="text-xs text-stone-500">{m.email}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="line-clamp-1 text-stone-600">{m.message}</span>
                    </td>
                    <td className="px-4 py-3 text-stone-600 text-xs whitespace-nowrap">{formatDate(m.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => open(m)} className="p-1.5 rounded hover:bg-stone-100" title="View">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => remove(m._id)} className="p-1.5 rounded hover:bg-red-50 text-red-600" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {active && (
        <Modal
          open={!!active}
          onClose={() => setActive(null)}
          title={'Message from ' + active.name}
          footer={
            <div className="flex justify-between items-center w-full gap-2 flex-wrap">
              <button onClick={() => remove(active._id)} className="text-red-600 hover:text-red-700 text-sm font-semibold inline-flex items-center gap-1">
                <Trash2 size={14} /> Delete
              </button>
              <div className="flex gap-2">
                <button onClick={() => setActive(null)} className="btn-secondary text-sm">Close</button>
                <a href={`mailto:${active.email}?subject=Re: Your message to Habtamu Batteries`} className="btn-primary text-sm">Reply via email</a>
              </div>
            </div>
          }
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-200">
              <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold flex-shrink-0">
                {active.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-stone-900 truncate">{active.name}</p>
                <a href={`mailto:${active.email}`} className="text-sm text-brand-700 hover:underline truncate block">{active.email}</a>
              </div>
              <span className="text-xs text-stone-500 whitespace-nowrap">{formatDate(active.createdAt)}</span>
            </div>
            <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
              <p className="text-stone-700 leading-relaxed whitespace-pre-wrap text-sm">{active.message}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}