import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { getLimbeTodayISO } from '../lib/currency.js';
import { buildFallbackDailyMenu, FALLBACK_MENU_ITEMS } from '../lib/fallbackData.js';

export function useDailyMenu() {
  const todayISO = getLimbeTodayISO();
  const [dailyMenu, setDailyMenu] = useState(() => (supabase ? null : buildFallbackDailyMenu()));
  const [catalogItems, setCatalogItems] = useState(() => (supabase ? [] : FALLBACK_MENU_ITEMS));
  const [isFallbackLatest, setIsFallbackLatest] = useState(false);
  const [loading, setLoading] = useState(Boolean(supabase));

  const load = useCallback(async () => {
    if (!supabase) {
      setDailyMenu(buildFallbackDailyMenu());
      setCatalogItems(FALLBACK_MENU_ITEMS);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [{ data: activeItems }, { data: todayMenu }] = await Promise.all([
        supabase
          .from('menu_items')
          .select('*')
          .eq('is_active', true)
          .order('is_signature', { ascending: false })
          .order('name_en', { ascending: true }),
        supabase
          .from('daily_menus')
          .select('*, daily_menu_entries(*, menu_item:menu_items(*))')
          .eq('service_date', todayISO)
          .eq('status', 'published')
          .maybeSingle(),
      ]);

      if (Array.isArray(activeItems) && activeItems.length > 0) {
        setCatalogItems(activeItems);
      }

      if (todayMenu) {
        const sortedEntries = [...(todayMenu.daily_menu_entries || [])]
          .filter((e) => e.menu_item)
          .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
        setDailyMenu({ ...todayMenu, entries: sortedEntries });
        setIsFallbackLatest(false);
      } else {
        // Fallback to most recent published daily menu if today's isn't published yet
        const { data: latestMenu } = await supabase
          .from('daily_menus')
          .select('*, daily_menu_entries(*, menu_item:menu_items(*))')
          .eq('status', 'published')
          .lte('service_date', todayISO)
          .order('service_date', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (latestMenu) {
          const sortedEntries = [...(latestMenu.daily_menu_entries || [])]
            .filter((e) => e.menu_item)
            .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
          setDailyMenu({ ...latestMenu, entries: sortedEntries });
          setIsFallbackLatest(true);
        } else {
          setDailyMenu(null);
          setIsFallbackLatest(false);
        }
      }
    } catch {
      setDailyMenu(buildFallbackDailyMenu());
      setCatalogItems(FALLBACK_MENU_ITEMS);
      setIsFallbackLatest(false);
    } finally {
      setLoading(false);
    }
  }, [todayISO]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    todayISO,
    dailyMenu,
    catalogItems,
    isFallbackLatest,
    loading,
    reload: load,
  };
}
