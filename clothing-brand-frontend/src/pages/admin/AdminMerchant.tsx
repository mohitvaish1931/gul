import { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, Circle, Copy, RefreshCw, UploadCloud, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';
import { useAppContext } from '../../context/AppContext';

interface SyncResult {
  total: number;
  synced: number;
  skipped: { id: string; name: string; reason: string }[];
  failed: { id: string; name: string; error: string }[];
}

interface SyncState {
  running: boolean;
  startedAt: string | null;
  finishedAt: string | null;
  trigger: string | null;
  progress: { done: number; total: number } | null;
  result: SyncResult | null;
  error: string | null;
}

interface MerchantConfig {
  merchantId: string;
  keyConfigured: boolean;
  serviceAccountEmail: string | null;
  projectId: string | null;
  keyError: string | null;
  dataSource: string | null;
  feedLabel: string;
  currency: string;
  siteUrl: string;
  sync: SyncState;
}

interface MerchantStatus {
  summary: { total: number; approved: number; pending: number; disapproved: number };
  issues: { offerId: string; title?: string; severity?: string; attribute?: string; description?: string; detail?: string }[];
}

const api = (path: string, init?: RequestInit) => fetch(`${API_BASE_URL}/api/merchant${path}`, init);

const readJson = async (res: Response) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
};

const Step = ({ done, title, children }: { done: boolean; title: string; children?: React.ReactNode }) => (
  <li className="flex gap-3 py-4 border-b border-gray-50 last:border-0">
    {done ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <Circle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />}
    <div className="min-w-0 flex-1">
      <p className={`text-sm font-semibold ${done ? 'text-gray-900' : 'text-gray-700'}`}>{title}</p>
      {children && <div className="text-sm text-gray-600 mt-1 space-y-2">{children}</div>}
    </div>
  </li>
);

const AdminMerchant = () => {
  const { state } = useAppContext();
  const [config, setConfig] = useState<MerchantConfig | null>(null);
  const [status, setStatus] = useState<MerchantStatus | null>(null);
  const [developerEmail, setDeveloperEmail] = useState(state.user?.email || '');
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const loadConfig = useCallback(async () => {
    try {
      setConfig(await readJson(await api('/config')));
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Could not load settings' });
    }
  }, []);

  useEffect(() => {
    let active = true;
    api('/config')
      .then(readJson)
      .then((data) => { if (active) setConfig(data); })
      .catch((err) => { if (active) setMessage({ type: 'error', text: err.message }); });
    return () => { active = false; };
  }, []);

  // Poll while a full sync is running
  const syncRunning = Boolean(config?.sync?.running);
  useEffect(() => {
    if (!syncRunning) return;
    const timer = setInterval(async () => {
      try {
        const sync: SyncState = await readJson(await api('/sync'));
        setConfig((current) => (current ? { ...current, sync } : current));
      } catch { /* keep polling */ }
    }, 3000);
    return () => clearInterval(timer);
  }, [syncRunning]);

  const runSetup = async () => {
    setBusy('setup');
    setMessage(null);
    try {
      const data = await readJson(await api('/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ developerEmail }),
      }));
      setMessage({ type: 'ok', text: `Connected. Products will go to data source ${data.dataSource}.` });
      await loadConfig();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Setup failed' });
    } finally {
      setBusy(null);
    }
  };

  const runSync = async () => {
    setBusy('sync');
    setMessage(null);
    try {
      const data = await api('/sync', { method: 'POST' }).then((res) => res.json());
      setConfig((current) => (current ? { ...current, sync: data.sync } : current));
      if (!data.started) setMessage({ type: 'error', text: 'A sync is already running.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Sync failed to start' });
    } finally {
      setBusy(null);
    }
  };

  const loadStatus = async () => {
    setBusy('status');
    setMessage(null);
    try {
      setStatus(await readJson(await api('/status')));
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Could not load Google status' });
    } finally {
      setBusy(null);
    }
  };

  if (!config) {
    return <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500">{message?.text || 'Loading Google Shopping settings...'}</div>;
  }

  const sync = config.sync;
  const connected = Boolean(config.dataSource);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Google Shopping</h1>
            <p className="text-sm text-gray-500">Merchant Center account {config.merchantId} · {config.feedLabel} · {config.currency}</p>
          </div>
          <a href={`https://merchants.google.com/mc/overview?a=${config.merchantId}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-700 hover:underline">
            Open Merchant Center <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {message && (
          <div className={`mx-6 mt-4 px-4 py-3 rounded-lg text-sm ${message.type === 'ok' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>{message.text}</div>
        )}

        <ol className="px-6 py-2">
          <Step done title={`Merchant ID ${config.merchantId}`} />

          <Step done={config.keyConfigured} title="Service account key on the server">
            {config.keyError && <p className="text-red-600">{config.keyError}</p>}
            {config.keyConfigured ? (
              <>
                <p>Key for project <strong>{config.projectId}</strong> is installed.</p>
                <p>
                  In Merchant Center go to <strong>Settings → Account access → Add user</strong> and add this email with <strong>Admin</strong> access:
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="px-2 py-1 rounded bg-gray-50 border border-gray-100 text-xs break-all">{config.serviceAccountEmail}</code>
                  <button type="button" onClick={() => navigator.clipboard?.writeText(config.serviceAccountEmail || '')} className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700">
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </button>
                </div>
              </>
            ) : (
              <p>
                Create a service account with a JSON key in Google Cloud (Merchant API enabled), then set it on Render as
                <code className="mx-1 px-1 rounded bg-gray-50">GOOGLE_SERVICE_ACCOUNT_KEY</code>
                (the JSON or its base64) and redeploy.
              </p>
            )}
          </Step>

          <Step done={connected} title="Connect this website to Merchant Center">
            {connected ? (
              <p>Data source: <code className="px-1 rounded bg-gray-50 text-xs">{config.dataSource}</code></p>
            ) : (
              <>
                <p>Registers the Google Cloud project with your Merchant Center account and creates the product data source. Needed once.</p>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="email"
                    value={developerEmail}
                    onChange={(e) => setDeveloperEmail(e.target.value)}
                    placeholder="Your Merchant Center login email"
                    aria-label="Developer contact email"
                    className="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-gray-200 text-sm"
                  />
                  <button
                    type="button"
                    onClick={runSetup}
                    disabled={!config.keyConfigured || busy === 'setup'}
                    className="px-4 py-2 rounded-lg bg-purple-700 text-white text-sm font-semibold disabled:opacity-50"
                  >
                    {busy === 'setup' ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              </>
            )}
          </Step>

          <Step done={Boolean(sync?.result && !sync.running)} title="Send products to Google">
            <p>Products also sync automatically when you add, edit or delete them, and a full sync runs every night at 2 AM.</p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={runSync}
                disabled={!config.keyConfigured || sync?.running || busy === 'sync'}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-700 text-white text-sm font-semibold disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" /> {sync?.running ? 'Syncing...' : 'Sync all products now'}
              </button>
              {sync?.running && sync.progress && (
                <span className="text-sm text-gray-600">{sync.progress.done} of {sync.progress.total} done</span>
              )}
            </div>
            {sync?.error && <p className="text-red-600">Last sync failed: {sync.error}</p>}
            {sync?.result && !sync.running && (
              <div className="text-sm">
                <p>
                  Last {sync.trigger} sync{sync.finishedAt ? ` (${new Date(sync.finishedAt).toLocaleString('en-IN')})` : ''}:{' '}
                  <strong>{sync.result.synced}</strong> sent, {sync.result.skipped.length} skipped, {sync.result.failed.length} failed.
                </p>
                {sync.result.failed.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-red-700">
                    {sync.result.failed.slice(0, 10).map((f) => <li key={f.id}>{f.name}: {f.error}</li>)}
                  </ul>
                )}
              </div>
            )}
          </Step>
        </ol>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-gray-900">Google review status</h2>
          <button
            type="button"
            onClick={loadStatus}
            disabled={!config.keyConfigured || busy === 'status'}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${busy === 'status' ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>
        {!status ? (
          <p className="px-6 py-6 text-sm text-gray-500">New products usually show as pending for a few hours while Google reviews them. Refresh to see the latest status.</p>
        ) : (
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ['In Google', status.summary.total, 'text-gray-900'],
                ['Approved', status.summary.approved, 'text-emerald-700'],
                ['Pending', status.summary.pending, 'text-amber-700'],
                ['Disapproved', status.summary.disapproved, 'text-red-700'],
              ].map(([label, value, color]) => (
                <div key={label as string} className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
            {status.issues.length === 0 ? (
              <p className="text-sm text-gray-500">No issues reported by Google.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                      <th className="py-2 pr-4">Product</th>
                      <th className="py-2 pr-4">Issue</th>
                      <th className="py-2">Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {status.issues.map((issue, idx) => (
                      <tr key={`${issue.offerId}-${idx}`} className="border-b border-gray-50 align-top">
                        <td className="py-2 pr-4 text-gray-900">{issue.title || issue.offerId}</td>
                        <td className="py-2 pr-4 text-gray-600">
                          {issue.description}{issue.attribute ? ` (${issue.attribute})` : ''}
                          {issue.detail && <span className="block text-xs text-gray-400">{issue.detail}</span>}
                        </td>
                        <td className="py-2 text-gray-600">{issue.severity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMerchant;
