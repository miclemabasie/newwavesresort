export const DEFAULT_EXCHANGE_RATES = {
  USD: 600,
  EUR: 655.957,
};

export function formatCurrency(amountXaf, currency = 'XAF', rates = DEFAULT_EXCHANGE_RATES) {
  const num = Number(amountXaf);
  if (!Number.isFinite(num)) return '—';

  const normalized = (currency || 'XAF').toUpperCase();
  if (normalized === 'USD') {
    const rate = Number(rates?.USD) > 0 ? Number(rates.USD) : DEFAULT_EXCHANGE_RATES.USD;
    const val = Math.round(num / rate);
    return `$${val.toLocaleString('en-US')}`;
  }
  if (normalized === 'EUR') {
    const rate = Number(rates?.EUR) > 0 ? Number(rates.EUR) : DEFAULT_EXCHANGE_RATES.EUR;
    const val = Math.round(num / rate);
    return `€${val.toLocaleString('en-US')}`;
  }

  return `${Math.round(num).toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ')} FCFA`;
}

export function getLimbeTodayISO() {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Africa/Douala',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export function formatReadableDate(dateStr, lang = 'en') {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
      timeZone: 'Africa/Douala',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dt);
  } catch {
    return dateStr;
  }
}
