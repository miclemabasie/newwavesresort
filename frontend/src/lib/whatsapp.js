import { formatCurrency } from './currency.js';

export function sanitizeWhatsAppNumber(raw) {
  const cleaned = String(raw || '').replace(/\D/g, '');
  return cleaned || (import.meta?.env?.VITE_DEFAULT_WHATSAPP || '237600000000').replace(/\D/g, '');
}

export function buildGeneralWhatsAppUrl({ phone, message = '' }) {
  const target = sanitizeWhatsAppNumber(phone);
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${target}${query}`;
}

export function buildBookingWhatsAppUrl({ phone, booking, language = 'en' }) {
  const isFr = language === 'fr';
  const ref = booking?.reference_code || 'N/A';
  const room = booking?.room_type_name || booking?.room_type_name_snapshot || 'Suite';
  const checkIn = booking?.check_in_date || '';
  const checkOut = booking?.check_out_date || '';
  const guests = `${booking?.adults ?? 1} ${isFr ? 'adulte(s)' : 'adult(s)'}${
    Number(booking?.children) > 0 ? `, ${booking.children} ${isFr ? 'enfant(s)' : 'child(ren)'}` : ''
  }`;
  const total = formatCurrency(booking?.estimated_total ?? 0, booking?.currency || 'XAF');
  const guestName = booking?.guest_name || [booking?.guest_first_name, booking?.guest_last_name].filter(Boolean).join(' ');

  const lines = isFr
    ? [
        `Bonjour New Waves Resort (Ngeme, Limbe),`,
        `Je souhaite confirmer ma demande de réservation :`,
        `• Référence : ${ref}`,
        guestName ? `• Client : ${guestName}` : null,
        `• Suite : ${room} (x${booking?.rooms_requested || 1})`,
        `• Arrivée : ${checkIn}`,
        `• Départ : ${checkOut}`,
        `• Voyageurs : ${guests}`,
        `• Total estimé : ${total}`,
        booking?.special_requests ? `• Demandes : ${booking.special_requests}` : null,
      ]
    : [
        `Hello New Waves Resort (Ngeme, Limbe),`,
        `I would like to confirm my booking request:`,
        `• Reference: ${ref}`,
        guestName ? `• Guest: ${guestName}` : null,
        `• Suite: ${room} (x${booking?.rooms_requested || 1})`,
        `• Check-in: ${checkIn}`,
        `• Check-out: ${checkOut}`,
        `• Guests: ${guests}`,
        `• Estimated Total: ${total}`,
        booking?.special_requests ? `• Notes: ${booking.special_requests}` : null,
      ];

  return buildGeneralWhatsAppUrl({
    phone,
    message: lines.filter(Boolean).join('\n'),
  });
}
