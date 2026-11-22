import { getLimbeTodayISO } from "./currency.js";

export const FALLBACK_SITE_SETTINGS = {
  property_name: "New Waves Resort, Ngeme Limbe",
  property_tagline: "A Resort Designed by & for Professionals",
  whatsapp_number: import.meta?.env?.VITE_DEFAULT_WHATSAPP || "237600000000",
  kitchen_whatsapp_number: "",
  contact_phone: "+237 600 000 001",
  contact_email: "residency@newwavesresort.com",
  info_email: "info@newwavesresort.com",
  foundation_email: "impact@fisiyfoundation.org",
  address_en: "Ngeme, Mile 4 Coastal Road, Limbe, Cameroon",
  address_fr: "Ngeme, Route Côtière Mile 4, Limbe, Cameroun",
  youtube_channel_id: "",
  check_in_time: "14:00",
  check_out_time: "11:00",
  cancellation_hours: 24,
  currency_code: "XAF",
  currency_symbol: "FCFA",
  display_exchange_rates: { USD: 600, EUR: 655.957 },
  featured_video_url:
    "https://res.cloudinary.com/onuna2fn/video/upload/v1792764145/newwavesresort.mp4",
  saker_landing_image_url: "",
};

export const FALLBACK_ROOM_TYPES = [
  {
    id: "fallback-nomad-1br",
    slug: "nomad-one-bedroom-suite",
    suite_category: "1-bedroom",
    name_en: "1-Bedroom Nomad Suite",
    name_fr: "Suite Nomade 1 Chambre",
    short_description_en:
      "Ergonomic ocean-breeze sanctuary built for remote executives and scholars.",
    short_description_fr:
      "Sanctuaire ergonomique face à l'océan conçu pour dirigeants et chercheurs.",
    description_en:
      "Designed for extended residencies and focused deep work. Features an ergonomic workstation, high-speed redundant Wi-Fi, king bedroom, private balcony, and full kitchenette.",
    description_fr:
      "Conçue pour les résidences prolongées et le travail de fond. Comprend un bureau ergonomique, Wi-Fi redondant haut débit, lit king-size, balcon privé et kitchenette complète.",
    base_price: 125000,
    currency: "XAF",
    bedrooms: 1,
    max_adults: 2,
    max_children: 1,
    bed_configuration: "king",
    number_of_beds: 1,
    size_sqm: 65,
    view_type: "sea",
    amenities: [
      "Private Balcony",
      "King-size Bed",
      "Ergonomic Workstation",
      "High-Speed Wi-Fi",
      "Full Kitchenette",
      "Laptop Safe",
    ],
    cover_image_url: "/assets/general/image14.jpeg",
    gallery_images: [
      { url: "/assets/general/image14.jpeg", is_cover: true, display_order: 0 },
    ],
    total_units: 4,
    availability_status: "available",
    is_featured: true,
    is_published: true,
    sort_order: 1,
  },
  {
    id: "fallback-garden-2br",
    slug: "garden-two-bedroom-suite",
    suite_category: "2-bedroom",
    name_en: "2-Bedroom Tropical Garden Suite",
    name_fr: "Suite Jardin Tropical 2 Chambres",
    short_description_en:
      "Quiet two-bedroom sanctuary nestled amidst volcanic-soil botanical gardens.",
    short_description_fr:
      "Sanctuaire calme de deux chambres niché au cœur des jardins tropicaux.",
    description_en:
      "Ideal for colleagues or small families seeking tranquility near Mount Cameroon. Includes two private bedrooms, shaded patio, rain shower, and high-speed fiber connectivity.",
    description_fr:
      "Idéale pour collègues ou familles en quête de sérénité au pied du Mont Cameroun. Deux chambres privées, patio ombragé, douche pluie et connexion fibre haut débit.",
    base_price: 165000,
    currency: "XAF",
    bedrooms: 2,
    max_adults: 4,
    max_children: 2,
    bed_configuration: "queen",
    number_of_beds: 2,
    size_sqm: 95,
    view_type: "garden",
    amenities: [
      "Private Patio",
      "2 Private Bedrooms",
      "Garden Views",
      "Rain Shower",
      "High-Speed Wi-Fi",
      "Dining Area",
    ],
    cover_image_url: "/assets/general/image15.jpeg",
    gallery_images: [
      { url: "/assets/general/image15.jpeg", is_cover: true, display_order: 0 },
    ],
    total_units: 3,
    availability_status: "available",
    is_featured: true,
    is_published: true,
    sort_order: 2,
  },
  {
    id: "fallback-atlantic-2br",
    slug: "atlantic-horizon-two-bedroom-suite",
    suite_category: "2-bedroom",
    name_en: "2-Bedroom Atlantic Horizon Suite",
    name_fr: "Suite Horizon Atlantique 2 Chambres",
    short_description_en:
      "Panoramic Gulf of Guinea coastal residence with sunlit executive lounge.",
    short_description_fr:
      "Résidence côtière panoramique sur le Golfe de Guinée avec salon exécutif.",
    description_en:
      "Wake up to sweeping Atlantic vistas from two spacious ocean-facing suites, complete with conference-ready dining room, deep soak bathtub, and private entrance.",
    description_fr:
      "Réveillez-vous face à l'Atlantique dans deux suites spacieuses avec salle à manger de réunion, baignoire profonde et entrée privée.",
    base_price: 210000,
    currency: "XAF",
    bedrooms: 2,
    max_adults: 4,
    max_children: 2,
    bed_configuration: "king",
    number_of_beds: 2,
    size_sqm: 120,
    view_type: "sea",
    amenities: [
      "Panoramic Sea View",
      "2 King Bedrooms",
      "Private Terrace",
      "Deep Soak Bathtub",
      "Smart TV",
      "24/7 Power & Starlink",
    ],
    cover_image_url: "/assets/general/image11.jpeg",
    gallery_images: [
      { url: "/assets/general/image11.jpeg", is_cover: true, display_order: 0 },
    ],
    total_units: 2,
    availability_status: "available",
    is_featured: true,
    is_published: true,
    sort_order: 3,
  },
  {
    id: "fallback-founders-3br",
    slug: "executive-founders-three-bedroom-suite",
    suite_category: "3-bedroom",
    name_en: "3-Bedroom Executive Founders Suite",
    name_fr: "Suite des Fondateurs 3 Chambres",
    short_description_en:
      "Flagship multi-bedroom residency for delegations, summits, and VIP retreats.",
    short_description_fr:
      "Résidence phare 3 chambres pour délégations, sommets et retraites VIP.",
    description_en:
      "Our premier 180sqm waterfront residence engineered for leadership delegations and families. Features three private bedrooms, executive board dining table, gourmet kitchen, and personalized concierge.",
    description_fr:
      "Notre résidence phare de 180 m² en bord de mer conçue pour délégations et familles. Trois chambres privées, table exécutive, cuisine gastronomique et conciergerie dédiée.",
    base_price: 350000,
    currency: "XAF",
    bedrooms: 3,
    max_adults: 6,
    max_children: 2,
    bed_configuration: "super_king",
    number_of_beds: 3,
    size_sqm: 180,
    view_type: "sea",
    amenities: [
      "3 En-Suite Bedrooms",
      "Ocean View Terrace",
      "Executive Lounge",
      "Gourmet Kitchen",
      "Concierge Service",
      "Private Entrance",
    ],
    cover_image_url: "/assets/general/image3.jpeg",
    gallery_images: [
      { url: "/assets/general/image3.jpeg", is_cover: true, display_order: 0 },
    ],
    total_units: 1,
    availability_status: "available",
    is_featured: true,
    is_published: true,
    sort_order: 4,
  },
];

export const FALLBACK_MENU_ITEMS = [
  {
    id: "fallback-dish-1",
    slug: "plantain-crisps-kati-kati",
    name_en: "Plantain Crisps with Spicy Kati-Kati",
    name_fr: "Chips de Plantain au Kati-Kati Épicé",
    description_en:
      "Thinly sliced organic plantains served with fiery roasted kati-kati pepper reduction.",
    description_fr:
      "Plantains biologiques finement tranchés servis avec une sauce pimentée kati-kati.",
    category: "appetizer",
    price_xaf: 3500,
    dietary_tags: ["vegan", "gluten_free", "organic", "spicy"],
    allergens: [],
    image_url:
      "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&q=80&w=800",
    is_signature: true,
    is_active: true,
  },
  {
    id: "fallback-dish-2",
    slug: "mbongo-tchobi-prawns",
    name_en: "Mbongo Tchobi Atlantic Prawns",
    name_fr: "Crevettes Atlantiques au Mbongo Tchobi",
    description_en:
      "Wild Gulf of Guinea prawns simmered in a rich aromatic black spice broth with crayfish and herbs.",
    description_fr:
      "Crevettes sauvages du Golfe de Guinée mijotées dans un bouillon aromatique aux épices noires.",
    category: "appetizer",
    price_xaf: 6500,
    dietary_tags: ["gluten_free", "organic"],
    allergens: ["crustaceans"],
    image_url:
      "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=800",
    is_signature: true,
    is_active: true,
  },
  {
    id: "fallback-dish-3",
    slug: "chargrilled-atlantic-lobster",
    name_en: "Atlantic Chargrilled Lobster",
    name_fr: "Homard Grillé de l'Atlantique",
    description_en:
      "Caught daily off the Limbe coast, basted with volcanic-soil herb butter and grilled plantain.",
    description_fr:
      "Pêché chaque matin au large de Limbe, nappé de beurre aux herbes volcaniques.",
    category: "main",
    price_xaf: 18500,
    dietary_tags: ["gluten_free", "organic"],
    allergens: ["crustaceans", "milk"],
    image_url:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=800",
    is_signature: true,
    is_active: true,
  },
  {
    id: "fallback-dish-4",
    slug: "volcanic-stone-sea-bream",
    name_en: "Traditional Limbe Sea Bream",
    name_fr: "Dorade Traditionnelle de Limbe",
    description_en:
      "Whole sea bream slow-roasted over volcanic stone heat with ginger, turmeric, and local greens.",
    description_fr:
      "Dorade entière rôtie lentement sur pierre volcanique au gingembre, curcuma et légumes locaux.",
    category: "main",
    price_xaf: 12000,
    dietary_tags: ["gluten_free", "organic"],
    allergens: ["fish"],
    image_url:
      "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800",
    is_signature: true,
    is_active: true,
  },
  {
    id: "fallback-dish-5",
    slug: "ndole-vegetarian-heritage",
    name_en: "Heritage Ndolé Vegetarian",
    name_fr: "Ndolé Végétarien Traditionnel",
    description_en:
      "Creamy organic bitterleaf stew simmered with roasted groundnuts, served with boiled plantains or bobolo.",
    description_fr:
      "Feuilles amères biologiques mijotées aux arachides grillées, servies avec plantains ou bobolo.",
    category: "main",
    price_xaf: 8500,
    dietary_tags: ["vegan", "vegetarian", "gluten_free", "organic"],
    allergens: ["peanuts"],
    image_url:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
    is_signature: false,
    is_active: true,
  },
  {
    id: "fallback-dish-6",
    slug: "grass-fed-beef-kati-kati",
    name_en: "Grass-Fed Beef Fillet & Honey Glaze",
    name_fr: "Filet de Bœuf Nourri à l'Herbe & Miel Local",
    description_en:
      "Tender grass-fed beef grilled over volcanic coals and glazed with Fako wildflower honey and pepper.",
    description_fr:
      "Filet tendre grillé sur braises volcaniques, glacé au miel sauvage du Fako et poivre local.",
    category: "main",
    price_xaf: 14500,
    dietary_tags: ["gluten_free"],
    allergens: [],
    image_url:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
    is_signature: false,
    is_active: true,
  },
  {
    id: "fallback-dish-7",
    slug: "mt-cameroon-garden-salad",
    name_en: "Mt. Cameroon Volcanic Garden Salad",
    name_fr: "Salade du Jardin Volcanique du Mont Cameroun",
    description_en:
      "Crisp organic greens, avocado, roasted papaya seeds, and citrus vinaigrette from mountain foothills.",
    description_fr:
      "Jeunes pousses biologiques, avocat, graines de papaye torréfiées et vinaigrette aux agrumes.",
    category: "side",
    price_xaf: 5500,
    dietary_tags: ["vegan", "vegetarian", "gluten_free", "organic"],
    allergens: [],
    image_url:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
    is_signature: false,
    is_active: true,
  },
  {
    id: "fallback-dish-8",
    slug: "hibiscus-ginger-sunrise-elixir",
    name_en: "Foléré & Volcanic Ginger Elixir",
    name_fr: "Élixir Foléré & Gingembre Volcanique",
    description_en:
      "Chilled organic hibiscus infusion steeped with fresh Fako ginger, mint, and raw cane nectar.",
    description_fr:
      "Infusion glacée d'hibiscus biologique au gingembre frais du Fako, menthe et nectar de canne.",
    category: "beverage",
    price_xaf: 2500,
    dietary_tags: ["vegan", "gluten_free", "organic"],
    allergens: [],
    image_url:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=800",
    is_signature: false,
    is_active: true,
  },
];

export function buildFallbackDailyMenu() {
  return {
    id: "fallback-daily-menu",
    service_date: getLimbeTodayISO(),
    title_en: "Fresh from the Gulf of Guinea & Fako Farms",
    title_fr: "Fraîcheur du Golfe de Guinée & Fermes du Fako",
    chef_note_en:
      "Today our fishermen landed Atlantic lobster and sea bream at dawn, paired with strictly organic mountain greens.",
    chef_note_fr:
      "Nos pêcheurs ont ramené ce matin homard et dorade de l'Atlantique, accompagnés de légumes biologiques du Mont Cameroun.",
    status: "published",
    entries: FALLBACK_MENU_ITEMS.map((item, idx) => ({
      id: `fallback-entry-${idx}`,
      meal_period:
        item.category === "beverage" || item.category === "side"
          ? "all_day"
          : idx % 2 === 0
            ? "lunch"
            : "dinner",
      display_order: idx,
      daily_price_override: null,
      is_available: true,
      highlight_badge: item.is_signature ? "chef_pick" : "",
      menu_item: item,
    })),
  };
}

export const FALLBACK_GALLERY_MEDIA = [
  {
    id: "fallback-gal-1",
    media_type: "image",
    title_en: "Atlantic Vista",
    title_fr: "Vue Atlantique",
    description_en: "The main resort facade facing the Gulf of Guinea.",
    description_fr: "Façade principale face au Golfe de Guinée.",
    category: "architecture",
    image_url: "/assets/general/image3.jpeg",
    is_featured_home: true,
    is_published: true,
    display_order: 1,
  },
  {
    id: "fallback-gal-2",
    media_type: "image",
    title_en: "Executive Nomad Suite",
    title_fr: "Suite Nomade Exécutive",
    description_en: "Equipped with ergonomic workstations and Atlantic views.",
    description_fr: "Équipée de postes de travail ergonomiques avec vue océan.",
    category: "interiors",
    image_url: "/assets/general/image11.jpeg",
    is_featured_home: true,
    is_published: true,
    display_order: 2,
  },
  {
    id: "fallback-gal-3",
    media_type: "image",
    title_en: "The Infinity Edge",
    title_fr: "Piscine à Débordement",
    description_en: "Limbe's premier ocean-front volcanic-view pool.",
    description_fr: "La piscine panoramique face à l'océan à Limbe.",
    category: "leisure",
    image_url: "/assets/general/image15.jpeg",
    is_featured_home: true,
    is_published: true,
    display_order: 3,
  },
  {
    id: "fallback-gal-4",
    media_type: "image",
    title_en: "Coastal Culinary Terrace",
    title_fr: "Terrasse Culinaire Côtière",
    description_en: "Fresh seafood served overlooking the volcanic shoreline.",
    description_fr: "Fruits de mer frais servis face au littoral volcanique.",
    category: "dining",
    image_url: "/assets/general/image1.jpeg",
    is_featured_home: true,
    is_published: true,
    display_order: 4,
  },
  {
    id: "fallback-gal-5",
    media_type: "image",
    title_en: "Starlit Serenity",
    title_fr: "Sérénité Étoilée",
    description_en: "Evening illumination across the Ngeme sanctuary.",
    description_fr: "Illuminations du soir au sanctuaire de Ngeme.",
    category: "architecture",
    image_url: "/assets/general/image5.jpeg",
    is_featured_home: true,
    is_published: true,
    display_order: 5,
  },
  {
    id: "fallback-gal-6",
    media_type: "image",
    title_en: "The Dialogue Lounge",
    title_fr: "Salon des Dialogues",
    description_en: "Where global leaders and thinkers convene.",
    description_fr: "Espace de rencontre des leaders et penseurs.",
    category: "professional",
    image_url: "/assets/general/image2.jpeg",
    is_featured_home: true,
    is_published: true,
    display_order: 6,
  },
  {
    id: "fallback-gal-7",
    media_type: "image",
    title_en: "The Heritage Pavilion",
    title_fr: "Le Pavillon Héritage",
    description_en: "Refined outdoor dining and gatherings by the sea.",
    description_fr: "Réceptions en plein air face à la mer.",
    category: "architecture",
    image_url: "/assets/general/image16.jpeg",
    is_featured_home: true,
    is_published: true,
    display_order: 7,
  },
  {
    id: "fallback-gal-8",
    media_type: "youtube",
    title_en: "Ocean-Side Intellectual Talks Highlight",
    title_fr: "Temps Fort des Dialogues Océaniques",
    description_en:
      "Dialogues on African governance, digital innovation, and sustainable heritage.",
    description_fr:
      "Échanges sur la gouvernance africaine, l'innovation et le patrimoine durable.",
    category: "talks",
    youtube_video_id: "5Aa9Mc1VqKE",
    youtube_url: "https://www.youtube.com/watch?v=5Aa9Mc1VqKE",
    youtube_duration: "54:32",
    is_featured_home: true,
    is_published: true,
    display_order: 8,
  },
];
