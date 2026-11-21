import { useState, useCallback, useEffect } from 'react';
import { DEFAULT_EXCHANGE_RATES, formatCurrency } from '../lib/currency.js';
import { supabase } from '../lib/supabase.js';
import { CurrencyContext } from './currencyHelpers.js';

const STORAGE_KEY = 'nwr_display_currency';

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    if (typeof window === 'undefined') return 'XAF';
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return ['XAF', 'USD', 'EUR'].includes(saved) ? saved : 'XAF';
  });

  const [rates, setRates] = useState(DEFAULT_EXCHANGE_RATES);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'display_exchange_rates')
      .maybeSingle()
      .then(({ data }) => {
        if (data?.value && typeof data.value === 'object') {
          setRates({ ...DEFAULT_EXCHANGE_RATES, ...data.value });
        }
      });
  }, []);

  const setCurrency = useCallback((next) => {
    if (!['XAF', 'USD', 'EUR'].includes(next)) return;
    setCurrencyState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const formatPrice = useCallback(
    (amountXaf, overrideCurrency) => formatCurrency(amountXaf, overrideCurrency || currency, rates),
    [currency, rates],
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}
