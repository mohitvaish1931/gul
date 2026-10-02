import { useEffect, useState } from 'react';
import { Mail, Phone, Trash2, CheckCheck } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read';
  createdAt: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE_URL}/api/contact`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load messages');
        if (active) setMessages(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load messages');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const markRead = async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/api/contact/${id}/read`, { method: 'PUT' });
    if (res.ok) setMessages((list) => list.map((m) => (m._id === id ? { ...m, status: 'read' } : m)));
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this message?')) return;
    const res = await fetch(`${API_BASE_URL}/api/contact/${id}`, { method: 'DELETE' });
    if (res.ok) setMessages((list) => list.filter((m) => m._id !== id));
  };

  const unread = messages.filter((m) => m.status === 'new').length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Customer Messages</h1>
        <span className="text-sm text-gray-500">{unread} unread</span>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading messages...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : messages.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-500">No messages yet. Contact form submissions will appear here.</div>
      ) : (
        <ul className="divide-y divide-gray-50">
          {messages.map((m) => (
            <li key={m._id} className={`px-6 py-5 ${m.status === 'new' ? 'bg-purple-50/40' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-start gap-3 justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {m.status === 'new' && <span className="w-2 h-2 rounded-full bg-purple-600" aria-label="Unread" />}
                    <span className="text-sm font-semibold text-gray-900">{m.name}</span>
                    <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                  </div>
                  {m.subject && <p className="text-sm font-medium text-gray-700 mt-1">{m.subject}</p>}
                  <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{m.message}</p>
                  <div className="flex gap-4 mt-3 text-xs flex-wrap">
                    <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-purple-700 hover:underline"><Mail className="w-3.5 h-3.5" /> {m.email}</a>
                    {m.phone && (
                      <a href={`https://wa.me/${m.phone.replace(/\D/g, '').replace(/^(\d{10})$/, '91$1')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-green-700 hover:underline">
                        <Phone className="w-3.5 h-3.5" /> {m.phone}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {m.status === 'new' && (
                    <button onClick={() => markRead(m._id)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm font-semibold hover:bg-gray-100">
                      <CheckCheck className="w-4 h-4" /> Mark read
                    </button>
                  )}
                  <button onClick={() => remove(m._id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50" aria-label="Delete message">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMessages;
