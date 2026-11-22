import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase, getEdgeFunctionUrl } from '../../lib/supabase.js';
import { uploadToBucket } from '../../lib/storage.js';
import { Key, Copy, Trash2, Save, Upload } from 'lucide-react';

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function generatePlainKey() {
  const arr = new Uint8Array(16);
  window.crypto.getRandomValues(arr);
  const hex = Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `nwr_live_${hex}`;
}

const ALL_SCOPES = [
  'bookings:read',
  'bookings:write',
  'rooms:read',
  'rooms:write',
  'menu:read',
  'menu:write',
  'gallery:read',
  'gallery:write',
];

export default function IntegrationsAdmin() {
  const [settings, setSettings] = useState({
    whatsapp_number: '',
    kitchen_whatsapp_number: '',
    contact_phone: '',
    contact_email: '',
    info_email: '',
    youtube_channel_id: '',
    saker_landing_image_url: '',
  });
  const [savingSettings, setSavingSettings] = useState(false);

  const [keys, setKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [newScopes, setNewScopes] = useState(['bookings:read', 'bookings:write', 'rooms:read', 'rooms:write']);
  const [revealedKey, setRevealedKey] = useState('');

  const loadAll = useCallback(async () => {
    if (!supabase) return;
    const [{ data: settingsData }, { data: keysData }] = await Promise.all([
      supabase.from('site_settings').select('key, value'),
      supabase.from('api_keys').select('*').order('created_at', { ascending: false }),
    ]);

    if (Array.isArray(settingsData)) {
      const map = {};
      for (const row of settingsData) map[row.key] = row.value ?? '';
      setSettings((prev) => ({
        ...prev,
        whatsapp_number: map.whatsapp_number ?? prev.whatsapp_number,
        kitchen_whatsapp_number:
          map.kitchen_whatsapp_number ?? prev.kitchen_whatsapp_number,
        contact_phone: map.contact_phone ?? prev.contact_phone,
        contact_email: map.contact_email ?? prev.contact_email,
        info_email: map.info_email ?? prev.info_email,
        youtube_channel_id: map.youtube_channel_id ?? prev.youtube_channel_id,
        saker_landing_image_url: map.saker_landing_image_url ?? prev.saker_landing_image_url,
      }));
    }
    setKeys(keysData || []);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSavingSettings(true);
    try {
      const rows = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        is_public: true,
      }));
      const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
      if (error) throw error;
      toast.success('Site settings saved!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSakerUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadToBucket('resort-gallery', file, 'heritage');
      setSettings((prev) => ({ ...prev, saker_landing_image_url: res.publicUrl }));
      toast.success('Image uploaded — click Save Settings to publish.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCreateKey = async (e) => {
    e.preventDefault();
    if (!supabase || !newKeyName.trim()) return;
    try {
      const plain = generatePlainKey();
      const hash = await sha256Hex(plain);
      const { error } = await supabase.from('api_keys').insert({
        name: newKeyName.trim(),
        key_prefix: plain.slice(0, 14),
        key_hash: hash,
        scopes: newScopes,
        is_active: true,
      });
      if (error) throw error;
      setRevealedKey(plain);
      setNewKeyName('');
      toast.success('API Key created — copy it now, it will not be shown again!');
      loadAll();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleKeyActive = async (k) => {
    const { error } = await supabase.from('api_keys').update({ is_active: !k.is_active }).eq('id', k.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    loadAll();
  };

  const deleteKey = async (k) => {
    if (!window.confirm(`Revoke and delete key "${k.name}"?`)) return;
    const { error } = await supabase.from('api_keys').delete().eq('id', k.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    loadAll();
  };

  const pmsApiUrl = getEdgeFunctionUrl('pms-api') || 'https://<project>.supabase.co/functions/v1/pms-api';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-volcanic mb-1">Resort Settings</h1>
        <p className="text-sm text-volcanic/60 mb-0">
          Standalone website configuration for WhatsApp concierge, contact details, YouTube Channel ID, heritage imagery, and optional scoped external API keys.
        </p>
      </div>

      {/* Resort Settings */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm space-y-5">
        <h2 className="text-xl font-serif text-ocean mb-0">General & Channel Settings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>WhatsApp Concierge Number (digits w/ country code)</label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              placeholder="2376XXXXXXXX"
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>
              Kitchen / Chef WhatsApp Number (Optional — defaults to Concierge)
            </label>
            <input
              type="text"
              value={settings.kitchen_whatsapp_number}
              onChange={(e) =>
                setSettings({ ...settings, kitchen_whatsapp_number: e.target.value })
              }
              placeholder="2376XXXXXXXX"
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Public Display Phone</label>
            <input
              type="text"
              value={settings.contact_phone}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Concierge Email</label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>YouTube Channel ID (starts with UC...)</label>
            <input
              type="text"
              value={settings.youtube_channel_id}
              onChange={(e) => setSettings({ ...settings, youtube_channel_id: e.target.value })}
              placeholder="UC..."
              className={inp}
            />
          </div>
        </div>

        <div className="bg-sand/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className={lbl}>Saker Landing Heritage Photo URL (Story Page)</label>
            <input
              type="text"
              value={settings.saker_landing_image_url}
              onChange={(e) => setSettings({ ...settings, saker_landing_image_url: e.target.value })}
              placeholder="https://..."
              className={inp}
            />
          </div>
          <label className="px-4 py-2.5 rounded-xl bg-ocean text-white text-xs font-bold cursor-pointer hover:bg-volcanic inline-flex items-center gap-1.5 shrink-0 self-end">
            <Upload className="w-3.5 h-3.5" /> Upload
            <input type="file" accept="image/*" onChange={handleSakerUpload} className="hidden" />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={savingSettings}
            className="px-6 py-3 rounded-xl bg-volcanic hover:bg-lush text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {savingSettings ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* Scoped API Keys for External Tools */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm space-y-5">
        <div>
          <h2 className="text-xl font-serif text-ocean mb-1 flex items-center gap-2">
            <Key className="w-5 h-5 text-lush" /> Optional External Facility API (Not Required for Website Operation)
          </h2>
          <p className="text-xs text-volcanic/60 mb-0">
            Endpoint Base: <code className="font-mono bg-sand/50 px-2 py-0.5 rounded">{pmsApiUrl}</code>
          </p>
        </div>

        {revealedKey && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <p className="text-xs font-bold text-emerald-900 mb-0">
              Copy this API key now — for security it is stored as a SHA-256 hash and cannot be viewed again:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white px-3 py-2 rounded-lg font-mono text-xs border border-emerald-200 break-all">
                {revealedKey}
              </code>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(revealedKey);
                  toast.success('Copied to clipboard');
                }}
                className="px-3 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleCreateKey} className="bg-sand/20 rounded-2xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="Key name (e.g. Reception RMS Sync)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className={`${inp} flex-1 bg-white`}
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-volcanic hover:bg-lush text-white text-xs font-bold uppercase tracking-wider"
            >
              Generate Key
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_SCOPES.map((sc) => {
              const checked = newScopes.includes(sc);
              return (
                <label key={sc} className="inline-flex items-center gap-1.5 text-xs bg-white px-2.5 py-1 rounded-lg border border-sand cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setNewScopes((prev) =>
                        prev.includes(sc) ? prev.filter((s) => s !== sc) : [...prev, sc],
                      )
                    }
                    className="accent-lush"
                  />
                  <span className="font-mono">{sc}</span>
                </label>
              );
            })}
          </div>
        </form>

        <div className="space-y-2">
          {keys.map((k) => (
            <div key={k.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl border border-sand">
              <div>
                <p className="font-bold text-sm text-volcanic mb-0">{k.name}</p>
                <p className="text-xs font-mono text-volcanic/60 mb-0">
                  {k.key_prefix}•••••••• • Scopes: {(k.scopes || []).join(', ')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleKeyActive(k)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    k.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-sand text-volcanic/60'
                  }`}
                >
                  {k.is_active ? 'Active' : 'Disabled'}
                </button>
                <button
                  type="button"
                  onClick={() => deleteKey(k)}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const lbl = 'block text-[10px] font-black uppercase tracking-widest text-lush mb-1';
const inp =
  'w-full bg-sand/30 border border-sand rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lush text-volcanic';
