import { useCurrency } from '../context/currencyHelpers.js';

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      aria-label="Display Currency"
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="px-2.5 py-2 text-xs font-bold uppercase text-volcanic/80 hover:text-lush transition-colors bg-white/60 rounded-lg border border-sand/50 hover:border-lush/50 focus:outline-none cursor-pointer"
    >
      <option value="XAF">FCFA</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  );
}
