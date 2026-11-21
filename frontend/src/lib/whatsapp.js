import { formatCurrency } from "./currency.js";

export function sanitizeWhatsAppNumber(raw) {
  const cleaned = String(raw || "").replace(/\D/g, "");
  return (
    cleaned ||
    (import.meta?.env?.VITE_DEFAULT_WHATSAPP || "237600000000").replace(
      /\D/g,
      "",
    )
  );
}

export function buildGeneralWhatsAppUrl({ phone, message = "" }) {
  const target = sanitizeWhatsAppNumber(phone);
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${target}${query}`;
}

export function buildBookingWhatsAppMessage({ booking, language = "en" }) {
  const isFr = language === "fr";
  const ref = booking?.reference_code || "N/A";
  const room =
    booking?.room_type_name || booking?.room_type_name_snapshot || "Suite";
  const checkIn = booking?.check_in_date || "";
  const checkOut = booking?.check_out_date || "";
  const nightsPart = booking?.nights
    ? ` (${booking.nights} ${isFr ? (booking.nights === 1 ? "nuit" : "nuits") : booking.nights === 1 ? "night" : "nights"})`
    : "";
  const guests = `${booking?.adults ?? 1} ${isFr ? "adulte(s)" : "adult(s)"}${
    Number(booking?.children) > 0
      ? `, ${booking.children} ${isFr ? "enfant(s)" : "child(ren)"}`
      : ""
  }`;
  const total = formatCurrency(
    booking?.estimated_total ?? 0,
    booking?.currency || "XAF",
  );
  const guestName =
    booking?.guest_name ||
    [booking?.guest_first_name, booking?.guest_last_name]
      .filter(Boolean)
      .join(" ");

  const lines = isFr
    ? [
        `*Nouvelle Commande de Réservation — New Waves Resort (Ngeme, Limbé)*`,
        `Merci de confirmer ma réservation :`,
        `• *Référence* : ${ref}`,
        guestName ? `• *Client* : ${guestName}` : null,
        booking?.guest_phone ? `• *Téléphone / WhatsApp* : ${booking.guest_phone}` : null,
        booking?.guest_email ? `• *Email* : ${booking.guest_email}` : null,
        booking?.guest_company_name
          ? `• *Organisation* : ${booking.guest_company_name}`
          : null,
        `• *Suite* : ${room} (x${booking?.rooms_requested || 1})`,
        `• *Séjour* : ${checkIn} → ${checkOut}${nightsPart}`,
        `• *Voyageurs* : ${guests}`,
        `• *Total estimé* : ${total}`,
        booking?.special_requests
          ? `• *Demandes* : ${booking.special_requests}`
          : null,
      ]
    : [
        `*New Booking Order — New Waves Resort (Ngeme, Limbe)*`,
        `Please confirm my reservation request:`,
        `• *Reference*: ${ref}`,
        guestName ? `• *Guest*: ${guestName}` : null,
        booking?.guest_phone ? `• *Phone / WhatsApp*: ${booking.guest_phone}` : null,
        booking?.guest_email ? `• *Email*: ${booking.guest_email}` : null,
        booking?.guest_company_name
          ? `• *Organization*: ${booking.guest_company_name}`
          : null,
        `• *Suite*: ${room} (x${booking?.rooms_requested || 1})`,
        `• *Stay*: ${checkIn} → ${checkOut}${nightsPart}`,
        `• *Guests*: ${guests}`,
        `• *Estimated Total*: ${total}`,
        booking?.special_requests
          ? `• *Notes*: ${booking.special_requests}`
          : null,
      ];

  return lines.filter(Boolean).join("\n");
}

export function buildBookingWhatsAppUrl({ phone, booking, language = "en" }) {
  return buildGeneralWhatsAppUrl({
    phone,
    message: buildBookingWhatsAppMessage({ booking, language }),
  });
}

export function buildInquiryWhatsAppUrl({ phone, inquiry, language = "en" }) {
  const isFr = language === "fr";
  const lines = isFr
    ? [
        `*Nouvelle Demande Conciergerie — New Waves Resort*`,
        inquiry?.fullName ? `• *Nom* : ${inquiry.fullName}` : null,
        inquiry?.email ? `• *Email* : ${inquiry.email}` : null,
        inquiry?.phone ? `• *Téléphone* : ${inquiry.phone}` : null,
        inquiry?.inquiryType ? `• *Objet* : ${inquiry.inquiryType}` : null,
        inquiry?.message ? `• *Message* : ${inquiry.message}` : null,
      ]
    : [
        `*New Concierge Inquiry — New Waves Resort*`,
        inquiry?.fullName ? `• *Name*: ${inquiry.fullName}` : null,
        inquiry?.email ? `• *Email*: ${inquiry.email}` : null,
        inquiry?.phone ? `• *Phone*: ${inquiry.phone}` : null,
        inquiry?.inquiryType ? `• *Subject*: ${inquiry.inquiryType}` : null,
        inquiry?.message ? `• *Message*: ${inquiry.message}` : null,
      ];

  return buildGeneralWhatsAppUrl({
    phone,
    message: lines.filter(Boolean).join("\n"),
  });
}

export function buildDiningWhatsAppUrl({ phone, dishName = "", language = "en" }) {
  const isFr = language === "fr";
  const message = dishName
    ? isFr
      ? `Bonjour New Waves Resort, je souhaite réserver une table ou commander depuis le Menu du Jour (${dishName}).`
      : `Hello New Waves Resort, I would like to reserve a table or order from Today's Daily Menu (${dishName}).`
    : isFr
      ? `Bonjour New Waves Resort, je souhaite réserver une table pour le Menu du Jour.`
      : `Hello New Waves Resort, I would like to reserve a table for Today's Daily Menu.`;

  return buildGeneralWhatsAppUrl({ phone, message });
}
