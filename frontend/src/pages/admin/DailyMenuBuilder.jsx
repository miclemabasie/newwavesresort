import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  closestCorners,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase.js';
import { formatCurrency, getLimbeTodayISO } from '../../lib/currency.js';
import { MEAL_PERIODS, MENU_CATEGORIES, HIGHLIGHT_BADGES } from '../../lib/constants.js';
import {
  GripVertical,
  Trash2,
  Copy,
  Save,
  Globe,
  Search,
  ExternalLink,
} from 'lucide-react';

function prevDateISO(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d - 1));
  return dt.toISOString().slice(0, 10);
}

function makeTempEntry(menuItem, mealPeriod) {
  return {
    id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    menu_item_id: menuItem.id,
    menu_item: menuItem,
    meal_period: mealPeriod,
    daily_price_override: '',
    is_available: true,
    highlight_badge: menuItem.is_signature ? 'chef_pick' : '',
  };
}

export default function DailyMenuBuilder() {
  const todayISO = useMemo(() => getLimbeTodayISO(), []);
  const [serviceDate, setServiceDate] = useState(todayISO);
  const [catalog, setCatalog] = useState([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const [menuMeta, setMenuMeta] = useState({
    id: null,
    title_en: "Today's Atlantic Selection",
    title_fr: 'Sélection Atlantique du Jour',
    chef_note_en: '',
    chef_note_fr: '',
    status: 'draft',
  });

  const [slots, setSlots] = useState({
    all_day: [],
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  const [activeDragItem, setActiveDragItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 5 } }),
    useSensor(KeyboardSensor),
  );

  const loadBoard = useCallback(async (targetDate) => {
    if (!supabase) return;
    setLoading(true);
    try {
      const [{ data: itemsData }, { data: dailyData }] = await Promise.all([
        supabase
          .from('menu_items')
          .select('*')
          .eq('is_active', true)
          .order('category', { ascending: true })
          .order('name_en', { ascending: true }),
        supabase
          .from('daily_menus')
          .select('*, daily_menu_entries(*, menu_item:menu_items(*))')
          .eq('service_date', targetDate)
          .maybeSingle(),
      ]);

      setCatalog(itemsData || []);

      if (dailyData) {
        setMenuMeta({
          id: dailyData.id,
          title_en: dailyData.title_en || "Today's Atlantic Selection",
          title_fr: dailyData.title_fr || 'Sélection Atlantique du Jour',
          chef_note_en: dailyData.chef_note_en || '',
          chef_note_fr: dailyData.chef_note_fr || '',
          status: dailyData.status || 'draft',
        });

        const nextSlots = { all_day: [], breakfast: [], lunch: [], dinner: [] };
        const sorted = [...(dailyData.daily_menu_entries || [])].sort(
          (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
        );
        for (const entry of sorted) {
          if (entry.menu_item && nextSlots[entry.meal_period]) {
            nextSlots[entry.meal_period].push({
              ...entry,
              daily_price_override:
                entry.daily_price_override !== null && entry.daily_price_override !== undefined
                  ? String(entry.daily_price_override)
                  : '',
            });
          }
        }
        setSlots(nextSlots);
      } else {
        setMenuMeta({
          id: null,
          title_en: "Today's Atlantic Selection",
          title_fr: 'Sélection Atlantique du Jour',
          chef_note_en: '',
          chef_note_fr: '',
          status: 'draft',
        });
        setSlots({ all_day: [], breakfast: [], lunch: [], dinner: [] });
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBoard(serviceDate);
  }, [serviceDate, loadBoard]);

  const addDishToSlot = (item, mealPeriod) => {
    setSlots((prev) => {
      if (prev[mealPeriod].some((e) => e.menu_item_id === item.id)) {
        toast.error(`"${item.name_en}" is already in ${mealPeriod.replace('_', ' ')}`);
        return prev;
      }
      return {
        ...prev,
        [mealPeriod]: [...prev[mealPeriod], makeTempEntry(item, mealPeriod)],
      };
    });
  };

  const updateEntry = (mealPeriod, entryId, patch) => {
    setSlots((prev) => ({
      ...prev,
      [mealPeriod]: prev[mealPeriod].map((e) => (e.id === entryId ? { ...e, ...patch } : e)),
    }));
  };

  const removeEntry = (mealPeriod, entryId) => {
    setSlots((prev) => ({
      ...prev,
      [mealPeriod]: prev[mealPeriod].filter((e) => e.id !== entryId),
    }));
  };

  const findSlotOfEntry = (entryId) => {
    for (const key of Object.keys(slots)) {
      if (slots[key].some((e) => `entry::${e.id}` === entryId)) {
        return key;
      }
    }
    return null;
  };

  const handleDragStart = (event) => {
    setActiveDragItem(event.active.data.current || null);
  };

  const handleDragEnd = (event) => {
    setActiveDragItem(null);
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overId = String(over.id);

    let targetPeriod = null;
    if (overId.startsWith('slot::')) {
      targetPeriod = overId.replace('slot::', '');
    } else if (overId.startsWith('entry::')) {
      targetPeriod = findSlotOfEntry(overId);
    }
    if (!targetPeriod) return;

    if (activeData?.kind === 'catalog') {
      addDishToSlot(activeData.item, targetPeriod);
      return;
    }

    if (activeData?.kind === 'entry') {
      const sourcePeriod = findSlotOfEntry(String(active.id));
      if (!sourcePeriod) return;

      if (sourcePeriod === targetPeriod) {
        const list = slots[sourcePeriod];
        const oldIndex = list.findIndex((e) => `entry::${e.id}` === String(active.id));
        const newIndex = overId.startsWith('entry::')
          ? list.findIndex((e) => `entry::${e.id}` === overId)
          : list.length - 1;
        if (oldIndex >= 0 && newIndex >= 0 && oldIndex !== newIndex) {
          setSlots((prev) => ({
            ...prev,
            [sourcePeriod]: arrayMove(prev[sourcePeriod], oldIndex, newIndex),
          }));
        }
      } else {
        // Move across meal periods
        const moving = slots[sourcePeriod].find((e) => `entry::${e.id}` === String(active.id));
        if (!moving) return;
        if (slots[targetPeriod].some((e) => e.menu_item_id === moving.menu_item_id)) {
          toast.error('Dish already exists in that meal period.');
          return;
        }
        setSlots((prev) => ({
          ...prev,
          [sourcePeriod]: prev[sourcePeriod].filter((e) => e.id !== moving.id),
          [targetPeriod]: [...prev[targetPeriod], { ...moving, meal_period: targetPeriod }],
        }));
      }
    }
  };

  const handleClonePreviousDay = async () => {
    if (!supabase) return;
    const prevDate = prevDateISO(serviceDate);
    try {
      const { data: prevMenu, error } = await supabase
        .from('daily_menus')
        .select('*, daily_menu_entries(*, menu_item:menu_items(*))')
        .eq('service_date', prevDate)
        .maybeSingle();
      if (error) throw error;
      if (!prevMenu) {
        toast.error(`No menu found for ${prevDate}`);
        return;
      }

      const nextSlots = { all_day: [], breakfast: [], lunch: [], dinner: [] };
      const sorted = [...(prevMenu.daily_menu_entries || [])].sort(
        (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
      );
      for (const entry of sorted) {
        if (entry.menu_item && nextSlots[entry.meal_period]) {
          const fresh = makeTempEntry(entry.menu_item, entry.meal_period);
          fresh.daily_price_override =
            entry.daily_price_override !== null && entry.daily_price_override !== undefined
              ? String(entry.daily_price_override)
              : '';
          fresh.highlight_badge = entry.highlight_badge || '';
          fresh.is_available = true;
          nextSlots[entry.meal_period].push(fresh);
        }
      }

      setMenuMeta((prev) => ({
        ...prev,
        title_en: prevMenu.title_en || prev.title_en,
        title_fr: prevMenu.title_fr || prev.title_fr,
        chef_note_en: prevMenu.chef_note_en || prev.chef_note_en,
        chef_note_fr: prevMenu.chef_note_fr || prev.chef_note_fr,
        status: 'draft',
      }));
      setSlots(nextSlots);
      toast.success(`Loaded dishes from ${prevDate} — review and click Save & Publish`);
    } catch (err) {
      toast.error(err.message || `Could not copy menu from ${prevDate}`);
    }
  };

  const handleSave = async (targetStatus) => {
    if (!supabase) return;
    setSaving(true);
    try {
      const { data: menuRow, error: menuErr } = await supabase
        .from('daily_menus')
        .upsert(
          {
            service_date: serviceDate,
            title_en: menuMeta.title_en,
            title_fr: menuMeta.title_fr,
            chef_note_en: menuMeta.chef_note_en,
            chef_note_fr: menuMeta.chef_note_fr,
            status: targetStatus,
            published_at: targetStatus === 'published' ? new Date().toISOString() : null,
          },
          { onConflict: 'service_date' },
        )
        .select('*')
        .single();

      if (menuErr) throw menuErr;

      const { error: delErr } = await supabase
        .from('daily_menu_entries')
        .delete()
        .eq('daily_menu_id', menuRow.id);
      if (delErr) throw delErr;

      const entriesPayload = [];
      for (const period of Object.keys(slots)) {
        slots[period].forEach((entry, idx) => {
          entriesPayload.push({
            daily_menu_id: menuRow.id,
            menu_item_id: entry.menu_item_id,
            meal_period: period,
            display_order: idx,
            daily_price_override:
              entry.daily_price_override !== '' && entry.daily_price_override !== null
                ? Number(entry.daily_price_override)
                : null,
            is_available: entry.is_available !== false,
            highlight_badge: entry.highlight_badge || '',
          });
        });
      }

      if (entriesPayload.length > 0) {
        const { error: entriesErr } = await supabase
          .from('daily_menu_entries')
          .insert(entriesPayload);
        if (entriesErr) throw entriesErr;
      }

      toast.success(
        targetStatus === 'published'
          ? `Published menu for ${serviceDate}!`
          : `Saved draft for ${serviceDate}`,
      );
      loadBoard(serviceDate);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredCatalog = catalog.filter((item) => {
    if (catFilter !== 'all' && item.category !== catFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.name_en?.toLowerCase().includes(q) ||
        item.name_fr?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="bg-white rounded-3xl p-6 border border-sand shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-serif text-volcanic mb-0">Daily Menu Builder</h1>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  menuMeta.status === 'published'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {menuMeta.status}
              </span>
            </div>
            <p className="text-xs text-volcanic/60 mt-1 mb-0">
              Drag dishes from the catalog into meal periods, reorder, toggle Sold Out, and publish live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <input
              type="date"
              value={serviceDate}
              onChange={(e) => setServiceDate(e.target.value)}
              className="bg-sand/40 border border-sand rounded-xl px-3.5 py-2 text-sm font-bold text-volcanic outline-none focus:border-lush"
            />
            <button
              type="button"
              onClick={handleClonePreviousDay}
              className="px-4 py-2 rounded-xl bg-white border border-ocean/25 hover:border-ocean text-xs font-bold text-ocean inline-flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Yesterday
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave('draft')}
              className="px-4 py-2 rounded-xl bg-sand hover:bg-volcanic hover:text-white text-volcanic text-xs font-bold inline-flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Save Draft
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSave('published')}
              className="px-5 py-2 rounded-xl bg-lush hover:bg-volcanic text-[#0e1a28] hover:text-white text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow"
            >
              <Globe className="w-3.5 h-3.5" /> Save & Publish
            </button>
            <Link
              to="/services/dining"
              target="_blank"
              className="p-2 rounded-xl border border-sand text-volcanic/60 hover:text-ocean"
              title="Preview Live Dining Page"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Titles & Chef's Daily Notes */}
        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-sand/60">
          <div className="space-y-2">
            <input
              type="text"
              value={menuMeta.title_en}
              onChange={(e) => setMenuMeta({ ...menuMeta, title_en: e.target.value })}
              placeholder="Menu Title (English)"
              className={inp}
            />
            <textarea
              rows={2}
              value={menuMeta.chef_note_en}
              onChange={(e) => setMenuMeta({ ...menuMeta, chef_note_en: e.target.value })}
              placeholder="Chef's Note for Today (English)..."
              className={inp}
            />
          </div>
          <div className="space-y-2">
            <input
              type="text"
              value={menuMeta.title_fr}
              onChange={(e) => setMenuMeta({ ...menuMeta, title_fr: e.target.value })}
              placeholder="Titre du Menu (Français)"
              className={inp}
            />
            <textarea
              rows={2}
              value={menuMeta.chef_note_fr}
              onChange={(e) => setMenuMeta({ ...menuMeta, chef_note_fr: e.target.value })}
              placeholder="Mot du Chef pour aujourd'hui (Français)..."
              className={inp}
            />
          </div>
        </div>
      </div>

      {/* Drag and Drop Workspace */}
      {loading ? (
        <div className="h-96 bg-white rounded-3xl animate-pulse border border-sand" />
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left Catalog Palette */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-sand shadow-sm space-y-4 lg:sticky lg:top-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-serif text-volcanic mb-0">Kitchen Catalog</h2>
                <Link to="/admin/menu-catalog" className="text-xs font-bold text-ocean hover:text-lush">
                  + Manage
                </Link>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-volcanic/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter dishes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-sand/30 border border-sand text-xs outline-none focus:border-lush"
                  />
                </div>
                <select
                  value={catFilter}
                  onChange={(e) => setCatFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-sand/30 border border-sand text-xs outline-none"
                >
                  <option value="all">All Categories</option>
                  {MENU_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {filteredCatalog.map((item) => (
                  <DraggableCatalogCard key={item.id} item={item} onQuickAdd={addDishToSlot} />
                ))}
              </div>
            </div>

            {/* Right Meal Period Drop Zones */}
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-5">
              {MEAL_PERIODS.map((mp) => (
                <MealSlotZone
                  key={mp.value}
                  period={mp.value}
                  label={mp.labelEn}
                  entries={slots[mp.value]}
                  onUpdateEntry={(id, patch) => updateEntry(mp.value, id, patch)}
                  onRemoveEntry={(id) => removeEntry(mp.value, id)}
                />
              ))}
            </div>
          </div>

          <DragOverlay>
            {activeDragItem ? (
              <div className="bg-white rounded-xl p-3 shadow-2xl border-2 border-lush max-w-xs opacity-95">
                <p className="text-sm font-serif font-bold text-volcanic mb-0">
                  {activeDragItem.kind === 'catalog'
                    ? activeDragItem.item.name_en
                    : activeDragItem.entry?.menu_item?.name_en}
                </p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}

function DraggableCatalogCard({ item, onQuickAdd }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `catalog::${item.id}`,
    data: { kind: 'catalog', item },
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-3 rounded-2xl border border-sand bg-sand/20 hover:bg-white transition-all flex items-center gap-3 ${
        isDragging ? 'opacity-40' : ''
      }`}
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing text-volcanic/40 hover:text-lush p-1"
        title="Drag to a meal slot"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {item.image_url && (
        <img src={item.image_url} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-volcanic truncate mb-0">{item.name_en}</p>
        <p className="text-[11px] text-ocean font-semibold mb-0">
          {formatCurrency(item.price_xaf)} • {item.category}
        </p>
      </div>

      <select
        aria-label={`Quick add ${item.name_en}`}
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) {
            onQuickAdd(item, e.target.value);
            e.target.value = '';
          }
        }}
        className="text-[10px] font-bold bg-white border border-sand rounded-lg px-2 py-1 text-volcanic/75 cursor-pointer"
      >
        <option value="" disabled>
          + Add
        </option>
        {MEAL_PERIODS.map((p) => (
          <option key={p.value} value={p.value}>
            {p.labelEn}
          </option>
        ))}
      </select>
    </div>
  );
}

function MealSlotZone({ period, label, entries, onUpdateEntry, onRemoveEntry }) {
  const { setNodeRef, isOver } = useDroppable({ id: `slot::${period}` });

  return (
    <div
      ref={setNodeRef}
      className={`bg-white rounded-3xl p-5 border-2 transition-colors min-h-[280px] flex flex-col ${
        isOver ? 'border-lush bg-lush/5' : 'border-sand'
      }`}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-sand/60">
        <h3 className="text-xl font-serif text-ocean mb-0">{label}</h3>
        <span className="text-xs font-bold text-volcanic/50">{entries.length} dishes</span>
      </div>

      <SortableContext
        items={entries.map((e) => `entry::${e.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 flex-1">
          {entries.length === 0 ? (
            <div className="h-36 rounded-2xl border-2 border-dashed border-sand flex items-center justify-center text-xs text-volcanic/40 text-center px-4">
              Drag dishes here or use "+ Add" from the catalog
            </div>
          ) : (
            entries.map((entry) => (
              <SortableSlotEntry
                key={entry.id}
                entry={entry}
                onUpdate={(patch) => onUpdateEntry(entry.id, patch)}
                onRemove={() => onRemoveEntry(entry.id)}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

function SortableSlotEntry({ entry, onUpdate, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `entry::${entry.id}`,
    data: { kind: 'entry', entry },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3.5 rounded-2xl border border-sand bg-sand/15 space-y-2.5 ${
        isDragging ? 'opacity-40 shadow-xl' : ''
      } ${!entry.is_available ? 'opacity-65 bg-rose-50/40' : ''}`}
    >
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing text-volcanic/40 hover:text-lush p-0.5"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-volcanic truncate mb-0">
            {entry.menu_item?.name_en}
          </p>
          <p className="text-[11px] text-volcanic/60 mb-0">
            Base: {formatCurrency(entry.menu_item?.price_xaf)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onUpdate({ is_available: !entry.is_available })}
          className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            entry.is_available
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-rose-600 text-white'
          }`}
        >
          {entry.is_available ? 'Available' : 'Sold Out'}
        </button>

        <button
          type="button"
          onClick={onRemove}
          className="text-volcanic/40 hover:text-rose-600 p-1"
          title="Remove from slot"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 pl-6">
        <input
          type="number"
          min={0}
          step={50}
          placeholder="Override FCFA"
          value={entry.daily_price_override ?? ''}
          onChange={(e) => onUpdate({ daily_price_override: e.target.value })}
          className="bg-white border border-sand rounded-lg px-2.5 py-1 text-xs outline-none focus:border-lush"
        />
        <select
          value={entry.highlight_badge || ''}
          onChange={(e) => onUpdate({ highlight_badge: e.target.value })}
          className="bg-white border border-sand rounded-lg px-2 py-1 text-xs outline-none focus:border-lush"
        >
          {HIGHLIGHT_BADGES.map((b) => (
            <option key={b.value} value={b.value}>
              {b.labelEn}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

const inp =
  'w-full bg-sand/30 border border-sand rounded-xl px-3.5 py-2 text-sm outline-none focus:border-lush text-volcanic';
