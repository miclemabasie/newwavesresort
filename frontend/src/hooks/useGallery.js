import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { FALLBACK_GALLERY_MEDIA } from '../lib/fallbackData.js';

export function useGallery({ featuredOnly = false } = {}) {
  const [items, setItems] = useState(() =>
    featuredOnly
      ? FALLBACK_GALLERY_MEDIA.filter((m) => m.is_featured_home)
      : FALLBACK_GALLERY_MEDIA,
  );
  const [loading, setLoading] = useState(Boolean(supabase));

  const reload = useCallback(async () => {
    if (!supabase) {
      setItems(
        featuredOnly
          ? FALLBACK_GALLERY_MEDIA.filter((m) => m.is_featured_home)
          : FALLBACK_GALLERY_MEDIA,
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      let query = supabase
        .from('gallery_media')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (featuredOnly) {
        query = query.eq('is_featured_home', true).limit(8);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        setItems(data);
      } else {
        setItems(
          featuredOnly
            ? FALLBACK_GALLERY_MEDIA.filter((m) => m.is_featured_home)
            : FALLBACK_GALLERY_MEDIA,
        );
      }
    } finally {
      setLoading(false);
    }
  }, [featuredOnly]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { items, loading, reload };
}
