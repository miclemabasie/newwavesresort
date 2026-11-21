import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase.js';
import { uploadToBucket } from '../../lib/storage.js';
import { formatCurrency } from '../../lib/currency.js';
import { MENU_CATEGORIES, DIETARY_TAGS, ALLERGENS } from '../../lib/constants.js';
import { Plus, Pencil, Trash2, Upload, Search, X, Star } from 'lucide-react';

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `dish-${Date.now()}`;
}

const emptyDish = {
  id: null,
  slug: '',
  name_en: '',
  name_fr: '',
  description_en: '',
  description_fr: '',
  category: 'main',
  price_xaf: 0,
  dietary_tags: [],
  allergens: [],
  preparation_minutes: 15,
  wine_pairing: '',
  image_url: '',
  storage_path: '',
  is_signature: false,
  is_active: true,
  cost_xaf: '',
  plating_notes: '',
  prep_station: '',
};

export default function MenuCatalogAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadItems = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*, meta:menu_item_internal_meta(*)')
        .order('category', { ascending: true })
        .order('name_en', { ascending: true });
      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const openEdit = (item) => {
    const meta = Array.isArray(item.meta) ? item.meta[0] : item.meta;
    setEditing({
      ...emptyDish,
      ...item,
      dietary_tags: item.dietary_tags || [],
      allergens: item.allergens || [],
      cost_xaf: meta?.cost_xaf ?? '',
      plating_notes: meta?.plating_notes ?? '',
      prep_station: meta?.prep_station ?? '',
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadToBucket('resort-menu', file, 'dishes');
      setEditing((prev) => ({
        ...prev,
        image_url: res.publicUrl,
        storage_path: res.storagePath,
      }));
      toast.success('Photo uploaded!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const toggleArrayValue = (field, val) => {
    setEditing((prev) => {
      const curr = prev[field] || [];
      return {
        ...prev,
        [field]: curr.includes(val) ? curr.filter((x) => x !== val) : [...curr, val],
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editing.name_en.trim()) return;
    setSaving(true);
    try {
      const payload = {
        slug: editing.slug?.trim() || slugify(editing.name_en),
        name_en: editing.name_en.trim(),
        name_fr: (editing.name_fr || editing.name_en).trim(),
        description_en: editing.description_en || '',
        description_fr: editing.description_fr || editing.description_en || '',
        category: editing.category,
        price_xaf: Number(editing.price_xaf) || 0,
        dietary_tags: editing.dietary_tags || [],
        allergens: editing.allergens || [],
        preparation_minutes: Number(editing.preparation_minutes) || 15,
        wine_pairing: editing.wine_pairing || '',
        image_url: editing.image_url || '',
        storage_path: editing.storage_path || '',
        is_signature: Boolean(editing.is_signature),
        is_active: Boolean(editing.is_active),
      };

      let savedId = editing.id;
      if (editing.id) {
        const { error } = await supabase.from('menu_items').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('menu_items').insert(payload).select('id').single();
        if (error) throw error;
        savedId = data.id;
      }

      if (savedId) {
        const { error: metaErr } = await supabase.from('menu_item_internal_meta').upsert(
          {
            menu_item_id: savedId,
            cost_xaf: editing.cost_xaf !== '' ? Number(editing.cost_xaf) : null,
            plating_notes: editing.plating_notes || '',
            prep_station: editing.prep_station || '',
          },
          { onConflict: 'menu_item_id' },
        );
        if (metaErr) throw metaErr;
      }

      toast.success(editing.id ? 'Dish updated' : 'Dish added to catalog');
      setEditing(null);
      loadItems();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.name_en}" from catalog?`)) return;
    try {
      const { error } = await supabase.from('menu_items').delete().eq('id', item.id);
      if (error) throw error;
      toast.success('Dish deleted');
      loadItems();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filtered = items.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name_en?.toLowerCase().includes(q) ||
        item.name_fr?.toLowerCase().includes(q) ||
        item.description_en?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-volcanic mb-1">Master Dish Catalog</h1>
          <p className="text-sm text-volcanic/60 mb-0">
            Create and manage dishes available for the Daily Menu drag-and-drop board.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ ...emptyDish })}
          className="bg-volcanic hover:bg-lush text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" /> Add Dish
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-sand flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-volcanic/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-sand/30 border border-sand text-sm outline-none focus:border-lush"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-sand/30 border border-sand text-sm outline-none focus:border-lush"
        >
          <option value="all">All Categories</option>
          {MENU_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* Dish Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-44 bg-white rounded-2xl animate-pulse border border-sand" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-sand overflow-hidden shadow-sm flex flex-col"
            >
              <div className="h-40 bg-sand/30 relative">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name_en} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-volcanic/40">
                    No Photo
                  </div>
                )}
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  <span className="bg-volcanic/85 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  {item.is_signature && (
                    <span className="bg-lush text-volcanic text-[10px] font-bold px-2 py-1 rounded-full inline-flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Signature
                    </span>
                  )}
                </div>
                {!item.is_active && (
                  <span className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    Inactive
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="text-lg font-serif text-volcanic leading-snug">{item.name_en}</h3>
                  <span className="text-ocean font-bold text-sm whitespace-nowrap">
                    {formatCurrency(item.price_xaf)}
                  </span>
                </div>
                <p className="text-xs text-volcanic/60 line-clamp-2 mb-4">{item.description_en}</p>

                <div className="mt-auto flex justify-end gap-2 pt-3 border-t border-sand/60">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="px-3 py-1.5 rounded-lg bg-sand/50 hover:bg-ocean hover:text-white text-xs font-bold inline-flex items-center gap-1"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-bold inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dish Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-sand pb-4">
              <h2 className="text-2xl font-serif text-volcanic mb-0">
                {editing.id ? 'Edit Dish' : 'New Dish'}
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="p-2 rounded-full hover:bg-sand/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editing.name_en}
                    onChange={(e) => setEditing({ ...editing, name_en: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Name (French)
                  </label>
                  <input
                    type="text"
                    value={editing.name_fr}
                    onChange={(e) => setEditing({ ...editing, name_fr: e.target.value })}
                    placeholder="Defaults to English if blank"
                    className={inp}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Category
                  </label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className={inp}
                  >
                    {MENU_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Price (FCFA / XAF) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={50}
                    value={editing.price_xaf}
                    onChange={(e) => setEditing({ ...editing, price_xaf: e.target.value })}
                    className={inp}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Prep Station
                  </label>
                  <select
                    value={editing.prep_station}
                    onChange={(e) => setEditing({ ...editing, prep_station: e.target.value })}
                    className={inp}
                  >
                    <option value="">None</option>
                    <option value="grill">Grill / Sauté</option>
                    <option value="saute">Sauté</option>
                    <option value="fry">Fry</option>
                    <option value="pastry">Pastry</option>
                    <option value="bar">Bar</option>
                    <option value="cold">Cold / Garde Manger</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Description (English)
                  </label>
                  <textarea
                    rows={3}
                    value={editing.description_en}
                    onChange={(e) => setEditing({ ...editing, description_en: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Description (French)
                  </label>
                  <textarea
                    rows={3}
                    value={editing.description_fr}
                    onChange={(e) => setEditing({ ...editing, description_fr: e.target.value })}
                    className={inp}
                  />
                </div>
              </div>

              {/* Photo upload */}
              <div className="bg-sand/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                {editing.image_url && (
                  <img
                    src={editing.image_url}
                    alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                )}
                <div className="flex-1 w-full">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Dish Image URL or Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editing.image_url}
                      onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                      placeholder="https://... or upload below"
                      className={`${inp} flex-1`}
                    />
                    <label className="px-4 py-2.5 rounded-xl bg-ocean text-white text-xs font-bold cursor-pointer hover:bg-volcanic inline-flex items-center gap-1.5 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      {uploading ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Dietary tags */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-2">
                  Dietary Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_TAGS.map((tag) => {
                    const active = editing.dietary_tags?.includes(tag.value);
                    return (
                      <button
                        type="button"
                        key={tag.value}
                        onClick={() => toggleArrayValue('dietary_tags', tag.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          active
                            ? 'bg-lush text-white border-lush'
                            : 'bg-white border-sand text-volcanic/70'
                        }`}
                      >
                        {tag.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Allergens */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-2">
                  Allergens
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGENS.map((alg) => {
                    const active = editing.allergens?.includes(alg.value);
                    return (
                      <button
                        type="button"
                        key={alg.value}
                        onClick={() => toggleArrayValue('allergens', alg.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          active
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white border-sand text-volcanic/70'
                        }`}
                      >
                        {alg.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.is_signature}
                    onChange={(e) => setEditing({ ...editing, is_signature: e.target.checked })}
                    className="w-4 h-4 accent-lush"
                  />
                  Signature Dish
                </label>
                <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.is_active}
                    onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                    className="w-4 h-4 accent-lush"
                  />
                  Active in Catalog
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-sand">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-5 py-2.5 rounded-xl border border-sand text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-volcanic hover:bg-lush text-white text-xs font-bold uppercase tracking-wider disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inp =
  'w-full bg-sand/30 border border-sand rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lush text-volcanic';
