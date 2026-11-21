import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase.js';
import { uploadToBucket } from '../../lib/storage.js';
import { formatCurrency } from '../../lib/currency.js';
import {
  SUITE_CATEGORIES,
  BED_CONFIGURATIONS,
  VIEW_TYPES,
  AVAILABILITY_STATUSES,
} from '../../lib/constants.js';
import { Plus, Pencil, Trash2, Upload, CalendarX, X } from 'lucide-react';

function slugify(str) {
  return String(str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `suite-${Date.now()}`;
}

const emptyUnit = {
  id: null,
  slug: '',
  external_ref: '',
  suite_category: '1-bedroom',
  name_en: '',
  name_fr: '',
  short_description_en: '',
  short_description_fr: '',
  description_en: '',
  description_fr: '',
  base_price: 125000,
  bedrooms: 1,
  max_adults: 2,
  max_children: 1,
  bed_configuration: 'king',
  number_of_beds: 1,
  size_sqm: 65,
  view_type: 'sea',
  amenitiesText: 'High-Speed Wi-Fi, Private Balcony, Air Conditioning',
  cover_image_url: '',
  gallery_images: [],
  total_units: 1,
  availability_status: 'available',
  is_featured: true,
  is_published: true,
  sort_order: 0,
};

export default function UnitsAdmin() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [blockModalUnit, setBlockModalUnit] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [newBlock, setNewBlock] = useState({ start_date: '', end_date: '', units_blocked: 1, reason: 'booked' });

  const loadUnits = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('room_types')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('base_price', { ascending: true });
      if (error) throw error;
      setUnits(data || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUnits();
  }, [loadUnits]);

  const openEdit = (u) => {
    const amList = Array.isArray(u.amenities)
      ? u.amenities.map((a) => (typeof a === 'string' ? a : a.name_en)).filter(Boolean)
      : [];
    setEditing({
      ...emptyUnit,
      ...u,
      external_ref: u.external_ref || '',
      gallery_images: Array.isArray(u.gallery_images) ? u.gallery_images : [],
      amenitiesText: amList.join(', '),
    });
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const res = await uploadToBucket('resort-units', file, 'suites');
        uploaded.push({ url: res.publicUrl, storage_path: res.storagePath, is_cover: false });
      }
      setEditing((prev) => {
        const nextGallery = [...(prev.gallery_images || []), ...uploaded];
        const coverUrl = prev.cover_image_url || nextGallery[0]?.url || '';
        return { ...prev, cover_image_url: coverUrl, gallery_images: nextGallery };
      });
      toast.success(`Uploaded ${uploaded.length} photo(s)`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!supabase || !editing) return;
    setSaving(true);
    try {
      const amenities = editing.amenitiesText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        slug: editing.slug?.trim() || slugify(editing.name_en),
        external_ref: editing.external_ref?.trim() || null,
        suite_category: editing.suite_category,
        name_en: editing.name_en.trim(),
        name_fr: (editing.name_fr || editing.name_en).trim(),
        short_description_en: editing.short_description_en || '',
        short_description_fr: editing.short_description_fr || editing.short_description_en || '',
        description_en: editing.description_en || '',
        description_fr: editing.description_fr || editing.description_en || '',
        base_price: Number(editing.base_price) || 0,
        currency: 'XAF',
        bedrooms: Number(editing.bedrooms) || 1,
        max_adults: Number(editing.max_adults) || 2,
        max_children: Number(editing.max_children) || 0,
        bed_configuration: editing.bed_configuration,
        number_of_beds: Number(editing.number_of_beds) || 1,
        size_sqm: editing.size_sqm ? Number(editing.size_sqm) : null,
        view_type: editing.view_type,
        amenities,
        cover_image_url: editing.cover_image_url || editing.gallery_images?.[0]?.url || '',
        gallery_images: editing.gallery_images || [],
        total_units: Math.max(1, Number(editing.total_units) || 1),
        availability_status: editing.availability_status,
        is_featured: Boolean(editing.is_featured),
        is_published: Boolean(editing.is_published),
        sort_order: Number(editing.sort_order) || 0,
      };

      if (editing.id) {
        const { error } = await supabase.from('room_types').update(payload).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('room_types').insert(payload);
        if (error) throw error;
      }

      toast.success(editing.id ? 'Suite updated' : 'Suite created');
      setEditing(null);
      loadUnits();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUnit = async (u) => {
    if (!window.confirm(`Delete suite "${u.name_en}"?`)) return;
    try {
      const { error } = await supabase.from('room_types').delete().eq('id', u.id);
      if (error) throw error;
      toast.success('Suite deleted');
      loadUnits();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const openBlocks = async (u) => {
    setBlockModalUnit(u);
    const { data } = await supabase
      .from('room_unavailability')
      .select('*')
      .eq('room_type_id', u.id)
      .order('start_date', { ascending: true });
    setBlocks(data || []);
  };

  const addBlock = async (e) => {
    e.preventDefault();
    if (!blockModalUnit || !newBlock.start_date || !newBlock.end_date) return;
    try {
      const { error } = await supabase.from('room_unavailability').insert({
        room_type_id: blockModalUnit.id,
        start_date: newBlock.start_date,
        end_date: newBlock.end_date,
        units_blocked: Number(newBlock.units_blocked) || 1,
        reason: newBlock.reason || 'booked',
      });
      if (error) throw error;
      toast.success('Date block added');
      setNewBlock({ start_date: '', end_date: '', units_blocked: 1, reason: 'booked' });
      openBlocks(blockModalUnit);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteBlock = async (id) => {
    const { error } = await supabase.from('room_unavailability').delete().eq('id', id);
    if (error) {
      toast.error(error.message);
      return;
    }
    openBlocks(blockModalUnit);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-volcanic mb-1">Suites & Room Units</h1>
          <p className="text-sm text-volcanic/60 mb-0">
            Manage 1-, 2-, and 3-bedroom suites, rates in FCFA, Supabase Storage photos, and blocked dates.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ ...emptyUnit })}
          className="bg-volcanic hover:bg-lush text-white hover:text-[#0e1a28] px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" /> Add Suite
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-white rounded-2xl animate-pulse border border-sand" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((u) => (
            <div key={u.id} className="bg-white rounded-3xl border border-sand overflow-hidden shadow-sm flex flex-col">
              <div className="h-44 bg-sand/30 relative">
                {u.cover_image_url && (
                  <img src={u.cover_image_url} alt={u.name_en} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-volcanic/85 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                    {u.suite_category}
                  </span>
                  <span className="bg-white/90 text-ocean text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {u.total_units} unit(s)
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="text-lg font-serif text-volcanic">{u.name_en}</h3>
                  <span className="font-bold text-ocean text-sm whitespace-nowrap">
                    {formatCurrency(u.base_price)}
                  </span>
                </div>
                <p className="text-xs text-volcanic/60 mb-4 line-clamp-2">{u.short_description_en}</p>

                <div className="mt-auto pt-3 border-t border-sand/60 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => openBlocks(u)}
                    className="px-3 py-1.5 rounded-lg bg-sand/50 hover:bg-ocean hover:text-white text-xs font-bold inline-flex items-center gap-1"
                  >
                    <CalendarX className="w-3.5 h-3.5" /> Dates
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(u)}
                      className="px-3 py-1.5 rounded-lg bg-sand/50 hover:bg-lush hover:text-[#0e1a28] text-xs font-bold inline-flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteUnit(u)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suite Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <h2 className="text-2xl font-serif text-volcanic mb-0">
                {editing.id ? 'Edit Suite' : 'New Suite'}
              </h2>
              <button type="button" onClick={() => setEditing(null)} className="p-2 rounded-full hover:bg-sand/50">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className={lbl}>Name (EN) *</label>
                  <input
                    type="text"
                    required
                    value={editing.name_en}
                    onChange={(e) => setEditing({ ...editing, name_en: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>Name (FR)</label>
                  <input
                    type="text"
                    value={editing.name_fr}
                    onChange={(e) => setEditing({ ...editing, name_fr: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>URL Slug</label>
                  <input
                    type="text"
                    value={editing.slug}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    placeholder="auto-generated"
                    className={inp}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className={lbl}>Suite Type</label>
                  <select
                    value={editing.suite_category}
                    onChange={(e) => setEditing({ ...editing, suite_category: e.target.value })}
                    className={inp}
                  >
                    {SUITE_CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.labelEn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={lbl}>Nightly Rate (FCFA)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={editing.base_price}
                    onChange={(e) => setEditing({ ...editing, base_price: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>Total Units</label>
                  <input
                    type="number"
                    min={1}
                    value={editing.total_units}
                    onChange={(e) => setEditing({ ...editing, total_units: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className={lbl}>Status</label>
                  <select
                    value={editing.availability_status}
                    onChange={(e) => setEditing({ ...editing, availability_status: e.target.value })}
                    className={inp}
                  >
                    {AVAILABILITY_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>{s.labelEn}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-3">
                <div>
                  <label className={lbl}>Bedrooms</label>
                  <input type="number" min={0} value={editing.bedrooms} onChange={(e) => setEditing({ ...editing, bedrooms: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Max Adults</label>
                  <input type="number" min={1} value={editing.max_adults} onChange={(e) => setEditing({ ...editing, max_adults: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Max Children</label>
                  <input type="number" min={0} value={editing.max_children} onChange={(e) => setEditing({ ...editing, max_children: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Size (m²)</label>
                  <input type="number" min={10} value={editing.size_sqm || ''} onChange={(e) => setEditing({ ...editing, size_sqm: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Bed Type</label>
                  <select value={editing.bed_configuration} onChange={(e) => setEditing({ ...editing, bed_configuration: e.target.value })} className={inp}>
                    {BED_CONFIGURATIONS.map((b) => (
                      <option key={b.value} value={b.value}>{b.labelEn}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>View Type</label>
                  <select value={editing.view_type} onChange={(e) => setEditing({ ...editing, view_type: e.target.value })} className={inp}>
                    {VIEW_TYPES.map((v) => (
                      <option key={v.value} value={v.value}>{v.labelEn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={lbl}>Optional External Ref ID</label>
                  <input
                    type="text"
                    value={editing.external_ref}
                    onChange={(e) => setEditing({ ...editing, external_ref: e.target.value })}
                    placeholder="Optional facility mapping code"
                    className={inp}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>Description (EN)</label>
                  <textarea rows={3} value={editing.description_en} onChange={(e) => setEditing({ ...editing, description_en: e.target.value })} className={inp} />
                </div>
                <div>
                  <label className={lbl}>Description (FR)</label>
                  <textarea rows={3} value={editing.description_fr} onChange={(e) => setEditing({ ...editing, description_fr: e.target.value })} className={inp} />
                </div>
              </div>

              <div>
                <label className={lbl}>Amenities (comma-separated)</label>
                <input
                  type="text"
                  value={editing.amenitiesText}
                  onChange={(e) => setEditing({ ...editing, amenitiesText: e.target.value })}
                  className={inp}
                />
              </div>

              {/* Multi-photo upload */}
              <div className="bg-sand/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className={lbl}>Suite Gallery Photos (Supabase Storage)</label>
                  <label className="px-3.5 py-2 rounded-xl bg-ocean text-white text-xs font-bold cursor-pointer hover:bg-volcanic inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    {uploading ? 'Uploading...' : 'Upload Photos'}
                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                  </label>
                </div>

                <div className="flex flex-wrap gap-3">
                  {(editing.gallery_images || []).map((img, i) => {
                    const isCover = editing.cover_image_url === img.url;
                    return (
                      <div key={i} className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 ${isCover ? 'border-lush' : 'border-transparent'}`}>
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setEditing({ ...editing, cover_image_url: img.url })}
                          className="absolute bottom-1 left-1 bg-black/75 text-white text-[9px] px-1.5 py-0.5 rounded"
                        >
                          {isCover ? 'Cover' : 'Set Cover'}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setEditing({
                              ...editing,
                              gallery_images: editing.gallery_images.filter((_, idx) => idx !== i),
                            })
                          }
                          className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input type="checkbox" checked={editing.is_featured} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="w-4 h-4 accent-lush" />
                  Featured on Home
                </label>
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input type="checkbox" checked={editing.is_published} onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })} className="w-4 h-4 accent-lush" />
                  Published on Website
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-sand">
                <button type="button" onClick={() => setEditing(null)} className="px-5 py-2.5 rounded-xl bg-white text-volcanic border border-volcanic/20 hover:bg-sand/50 text-xs font-bold uppercase">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-volcanic hover:bg-lush text-white hover:text-[#0e1a28] text-xs font-bold uppercase">
                  {saving ? 'Saving...' : 'Save Suite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Unavailability Blocks Modal */}
      {blockModalUnit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <h3 className="text-xl font-serif text-volcanic mb-0">
                Blocked Dates — {blockModalUnit.name_en}
              </h3>
              <button type="button" onClick={() => setBlockModalUnit(null)} className="p-2 rounded-full hover:bg-sand/50">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addBlock} className="grid grid-cols-2 gap-3 bg-sand/20 p-4 rounded-2xl">
              <input type="date" required value={newBlock.start_date} onChange={(e) => setNewBlock({ ...newBlock, start_date: e.target.value })} className={inp} />
              <input type="date" required value={newBlock.end_date} onChange={(e) => setNewBlock({ ...newBlock, end_date: e.target.value })} className={inp} />
              <input type="number" min={1} max={blockModalUnit.total_units} value={newBlock.units_blocked} onChange={(e) => setNewBlock({ ...newBlock, units_blocked: e.target.value })} className={inp} placeholder="Units" />
              <button type="submit" className="bg-volcanic hover:bg-lush text-white hover:text-[#0e1a28] rounded-xl text-xs font-bold uppercase">
                Add Block
              </button>
            </form>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {blocks.length === 0 ? (
                <p className="text-xs text-volcanic/50 text-center py-4">No blocked date ranges.</p>
              ) : (
                blocks.map((b) => (
                  <div key={b.id} className="flex items-center justify-between p-3 bg-sand/20 rounded-xl text-xs">
                    <span>
                      <strong>{b.start_date}</strong> → <strong>{b.end_date}</strong> ({b.units_blocked} unit)
                    </span>
                    <button type="button" onClick={() => deleteBlock(b.id)} className="text-rose-600 hover:underline">
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const lbl = 'block text-[10px] font-black uppercase tracking-widest text-lush mb-1';
const inp =
  'w-full bg-sand/30 border border-sand rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lush text-volcanic';
