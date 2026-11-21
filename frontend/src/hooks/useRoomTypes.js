import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { FALLBACK_ROOM_TYPES } from '../lib/fallbackData.js';

export function useRoomTypes({ checkIn = '', checkOut = '', adults = 1, children = 0 } = {}) {
  const [roomTypes, setRoomTypes] = useState(() => (supabase ? [] : FALLBACK_ROOM_TYPES));
  const [availabilityMap, setAvailabilityMap] = useState({});
  const [loading, setLoading] = useState(Boolean(supabase));
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [error, setError] = useState(null);
  const [isFallback, setIsFallback] = useState(!supabase);

  const loadRooms = useCallback(async () => {
    if (!supabase) {
      setRoomTypes(FALLBACK_ROOM_TYPES);
      setIsFallback(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('room_types')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })
        .order('base_price', { ascending: true });

      if (fetchError) {
        console.error('Failed to load room types from Supabase:', fetchError);
        setError(fetchError);
        setRoomTypes(FALLBACK_ROOM_TYPES);
        setIsFallback(true);
      } else if (Array.isArray(data) && data.length > 0) {
        setRoomTypes(data);
        setIsFallback(false);
      } else {
        setRoomTypes([]);
        setIsFallback(false);
      }
    } catch (err) {
      console.error('Unexpected error loading room types:', err);
      setError(err);
      setRoomTypes(FALLBACK_ROOM_TYPES);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  useEffect(() => {
    if (!supabase || !checkIn || !checkOut || checkOut <= checkIn) {
      setAvailabilityMap({});
      return;
    }

    let cancelled = false;
    setCheckingAvailability(true);
    supabase
      .rpc('get_available_room_types', {
        p_check_in: checkIn,
        p_check_out: checkOut,
        p_adults: Number(adults) || 1,
        p_children: Number(children) || 0,
      })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && Array.isArray(data)) {
          const map = {};
          for (const row of data) {
            map[row.room_type_id] = row;
          }
          setAvailabilityMap(map);
        } else {
          setAvailabilityMap({});
        }
        setCheckingAvailability(false);
      });

    return () => {
      cancelled = true;
    };
  }, [checkIn, checkOut, adults, children]);

  return {
    roomTypes,
    availabilityMap,
    loading,
    checkingAvailability,
    error,
    isFallback,
    reload: loadRooms,
  };
}
