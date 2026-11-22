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

const ORDER_FULFILLMENT_LABELS = {
  dine_in: { en: "Dine-In (Restaurant)", fr: "Sur place (Restaurant)" },
  room_service: { en: "Room Service", fr: "Service en chambre" },
  takeaway: { en: "Takeaway / Pickup", fr: "À emporter" },
};

export function buildOrderOnlineUrl({ referenceCode, viewToken = "", origin = "" }) {
  const cleanRef = encodeURIComponent(String(referenceCode || "").trim());
  const base =
    String(origin || "").replace(/\/+$/, "") ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const cleanToken = String(viewToken || "").trim();
  const tokenQuery = cleanToken ? `?t=${encodeURIComponent(cleanToken)}` : "";
  return `${base}/order/${cleanRef}${tokenQuery}`;
}

export function buildMenuOrderWhatsAppMessage({
  order = {},
  onlineUrl = "",
  formatPrice = null,
  language = "en",
}) {
  const isFr = language === "fr";
  const formatAmount = (val) => {
    const num = Number(val || 0);
    if (typeof formatPrice === "function") return formatPrice(num);
    return `${num.toLocaleString("en-US")} FCFA`;
  };

  const fulfillmentKey = order.fulfillment_type || "dine_in";
  const fulfillmentLabel =
    ORDER_FULFILLMENT_LABELS[fulfillmentKey]?.[isFr ? "fr" : "en"] || fulfillmentKey;

  const resolvedUrl =
    onlineUrl ||
    buildOrderOnlineUrl({
      referenceCode: order.reference_code,
      viewToken: order.view_token,
    });

  const itemLines = (order.items || []).map((item) => {
    const qty = Number(item.quantity || 1);
    const dishName = isFr ? item.name_fr || item.name_en : item.name_en || item.name_fr;
    const lineTotal =
      item.line_total_xaf ?? Number(item.unit_price_xaf || 0) * qty;
    const baseLine = `• ${qty}x ${dishName} — ${formatAmount(lineTotal)}`;
    return item.item_notes ? `${baseLine}\n   _${item.item_notes}_` : baseLine;
  });

  const lines = isFr
    ? [
        `🍽️ *Nouvelle Commande Menu — ${order.reference_code}*`,
        `New Waves Resort, Ngeme Limbe`,
        ``,
        `👤 *Client :* ${order.guest_name || ""}`,
        `📞 *Téléphone :* ${order.guest_phone || ""}`,
        `🛎️ *Service :* ${fulfillmentLabel}${order.location_label ? ` (${order.location_label})` : ""}`,
        `🕒 *Heure souhaitée :* ${order.preferred_time || "Dès que possible"}${order.guests_count ? ` • ${order.guests_count} pers.` : ""}`,
        ``,
        `📋 *Détails de la commande :*`,
        ...itemLines,
        ...(order.special_instructions
          ? [``, `📝 *Notes cuisine :* ${order.special_instructions}`]
          : []),
        ``,
        `💰 *Total estimé :* ${formatAmount(order.total_xaf)}`,
        ``,
        `🔗 *Ouvrir le ticket en ligne (Chef & Suivi) :*`,
        resolvedUrl,
      ]
    : [
        `🍽️ *New Menu Order — ${order.reference_code}*`,
        `New Waves Resort, Ngeme Limbe`,
        ``,
        `👤 *Guest:* ${order.guest_name || ""}`,
        `📞 *Phone:* ${order.guest_phone || ""}`,
        `🛎️ *Service:* ${fulfillmentLabel}${order.location_label ? ` (${order.location_label})` : ""}`,
        `🕒 *Preferred Time:* ${order.preferred_time || "As soon as possible"}${order.guests_count ? ` • ${order.guests_count} guests` : ""}`,
        ``,
        `📋 *Order Details:*`,
        ...itemLines,
        ...(order.special_instructions
          ? [``, `📝 *Kitchen Notes:* ${order.special_instructions}`]
          : []),
        ``,
        `💰 *Estimated Total:* ${formatAmount(order.total_xaf)}`,
        ``,
        `🔗 *View & Update Order Online:*`,
        resolvedUrl,
      ];

  return lines.join("\n");
}

export function buildMenuOrderWhatsAppUrl({
  phone,
  order,
  onlineUrl = "",
  formatPrice = null,
  language = "en",
}) {
  const message = buildMenuOrderWhatsAppMessage({
    order,
    onlineUrl,
    formatPrice,
    language,
  });
  return buildGeneralWhatsAppUrl({ phone, message });
}
