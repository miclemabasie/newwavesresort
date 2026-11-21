import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { FALLBACK_SITE_SETTINGS } from '../lib/fallbackData.js';

export function useSiteSettings() {
  const [settings, setSettings] = useState(FALLBACK_SITE_SETTINGS);
  const [loading, setLoading] = useState(Boolean(supabase));

  const reload = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (!error && Array.isArray(data) && data.length > 0) {
        const merged = { ...FALLBACK_SITE_SETTINGS };
        for (const row of data) {
          if (row.key) merged[row.key] = row.value;
        }
        setSettings(merged);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { settings, loading, reload };
}
