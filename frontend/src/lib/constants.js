export const SUITE_CATEGORIES = [
  { value: '1-bedroom', labelEn: '1-Bedroom', labelFr: '1 Chambre' },
  { value: '2-bedroom', labelEn: '2-Bedroom', labelFr: '2 Chambres' },
  { value: '3-bedroom', labelEn: '3-Bedroom', labelFr: '3 Chambres' },
  { value: 'studio', labelEn: 'Studio', labelFr: 'Studio' },
  { value: 'villa', labelEn: 'Villa', labelFr: 'Villa' },
  { value: 'conference', labelEn: 'Conference', labelFr: 'Conférence' },
];

export const BED_CONFIGURATIONS = [
  { value: 'single', labelEn: 'Single', labelFr: 'Simple' },
  { value: 'twin', labelEn: 'Twin', labelFr: 'Jumeaux' },
  { value: 'double', labelEn: 'Double', labelFr: 'Double' },
  { value: 'queen', labelEn: 'Queen', labelFr: 'Queen' },
  { value: 'king', labelEn: 'King', labelFr: 'King' },
  { value: 'super_king', labelEn: 'Super King', labelFr: 'Super King' },
  { value: 'sofa_bed', labelEn: 'Sofa Bed', labelFr: 'Canapé-lit' },
  { value: 'bunk', labelEn: 'Bunk Beds', labelFr: 'Lits superposés' },
];

export const VIEW_TYPES = [
  { value: 'sea', labelEn: 'Atlantic Sea View', labelFr: 'Vue Mer Atlantique' },
  { value: 'garden', labelEn: 'Tropical Garden View', labelFr: 'Vue Jardin Tropical' },
  { value: 'pool', labelEn: 'Pool View', labelFr: 'Vue Piscine' },
  { value: 'mountain', labelEn: 'Mount Cameroon View', labelFr: 'Vue Mont Cameroun' },
  { value: 'courtyard', labelEn: 'Courtyard View', labelFr: 'Vue Cour' },
  { value: 'city', labelEn: 'Limbe View', labelFr: 'Vue Ville' },
  { value: 'none', labelEn: 'Standard', labelFr: 'Standard' },
];

export const AVAILABILITY_STATUSES = [
  { value: 'available', labelEn: 'Available', labelFr: 'Disponible', tone: 'success' },
  { value: 'limited', labelEn: 'Limited', labelFr: 'Limité', tone: 'warning' },
  { value: 'booked', labelEn: 'Booked', labelFr: 'Complet', tone: 'danger' },
  { value: 'maintenance', labelEn: 'Maintenance', labelFr: 'Maintenance', tone: 'neutral' },
];

export const MEAL_PERIODS = [
  { value: 'all_day', labelEn: 'All Day', labelFr: 'Toute la journée' },
  { value: 'breakfast', labelEn: 'Breakfast', labelFr: 'Petit-déjeuner' },
  { value: 'lunch', labelEn: 'Lunch', labelFr: 'Déjeuner' },
  { value: 'dinner', labelEn: 'Dinner', labelFr: 'Dîner' },
];

export const MENU_CATEGORIES = [
  { value: 'appetizer', labelEn: 'Appetizer', labelFr: 'Entrée' },
  { value: 'main', labelEn: 'Main Course', labelFr: 'Plat Principal' },
  { value: 'side', labelEn: 'Side / Salad', labelFr: 'Accompagnement' },
  { value: 'dessert', labelEn: 'Dessert', labelFr: 'Dessert' },
  { value: 'beverage', labelEn: 'Beverage', labelFr: 'Boisson' },
  { value: 'cocktail', labelEn: 'Cocktail', labelFr: 'Cocktail' },
  { value: 'wine', labelEn: 'Wine', labelFr: 'Vin' },
  { value: 'spirit', labelEn: 'Spirit', labelFr: 'Spiritueux' },
  { value: 'other', labelEn: 'Other', labelFr: 'Autre' },
];

export const DIETARY_TAGS = [
  { value: 'organic', labelEn: 'Organic', labelFr: 'Biologique' },
  { value: 'vegan', labelEn: 'Vegan', labelFr: 'Végan' },
  { value: 'vegetarian', labelEn: 'Vegetarian', labelFr: 'Végétarien' },
  { value: 'gluten_free', labelEn: 'Gluten-Free', labelFr: 'Sans Gluten' },
  { value: 'dairy_free', labelEn: 'Dairy-Free', labelFr: 'Sans Lactose' },
  { value: 'nut_free', labelEn: 'Nut-Free', labelFr: 'Sans Noix' },
  { value: 'halal', labelEn: 'Halal', labelFr: 'Halal' },
  { value: 'spicy', labelEn: 'Spicy', labelFr: 'Épicé' },
];

export const ALLERGENS = [
  { value: 'gluten', labelEn: 'Gluten', labelFr: 'Gluten' },
  { value: 'crustaceans', labelEn: 'Shellfish', labelFr: 'Crustacés' },
  { value: 'eggs', labelEn: 'Eggs', labelFr: 'Œufs' },
  { value: 'fish', labelEn: 'Fish', labelFr: 'Poisson' },
  { value: 'peanuts', labelEn: 'Peanuts', labelFr: 'Arachides' },
  { value: 'soybeans', labelEn: 'Soy', labelFr: 'Soja' },
  { value: 'milk', labelEn: 'Dairy', labelFr: 'Lait' },
  { value: 'tree_nuts', labelEn: 'Tree Nuts', labelFr: 'Fruits à coque' },
  { value: 'celery', labelEn: 'Celery', labelFr: 'Céleri' },
  { value: 'mustard', labelEn: 'Mustard', labelFr: 'Moutarde' },
  { value: 'sesame', labelEn: 'Sesame', labelFr: 'Sésame' },
  { value: 'sulphites', labelEn: 'Sulphites', labelFr: 'Sulfites' },
  { value: 'lupin', labelEn: 'Lupin', labelFr: 'Lupin' },
  { value: 'molluscs', labelEn: 'Molluscs', labelFr: 'Mollusques' },
];

export const HIGHLIGHT_BADGES = [
  { value: '', labelEn: 'None', labelFr: 'Aucun' },
  { value: 'chef_pick', labelEn: "Chef's Pick", labelFr: 'Choix du Chef' },
  { value: 'fresh_catch', labelEn: 'Fresh Catch', labelFr: 'Pêche du Jour' },
  { value: 'seasonal', labelEn: 'Seasonal', labelFr: 'De Saison' },
];

export const GALLERY_CATEGORIES = [
  { value: 'architecture', labelEn: 'Architecture', labelFr: 'Architecture' },
  { value: 'interiors', labelEn: 'Interiors', labelFr: 'Intérieurs' },
  { value: 'leisure', labelEn: 'Leisure', labelFr: 'Loisirs' },
  { value: 'dining', labelEn: 'Dining', labelFr: 'Gastronomie' },
  { value: 'professional', labelEn: 'Professional', labelFr: 'Professionnel' },
  { value: 'events', labelEn: 'Events', labelFr: 'Événements' },
  { value: 'nature', labelEn: 'Nature', labelFr: 'Nature' },
  { value: 'talks', labelEn: 'Talks', labelFr: 'Conférences' },
];

export const BOOKING_STATUSES = [
  { value: 'pending', labelEn: 'Pending', labelFr: 'En attente' },
  { value: 'confirmed', labelEn: 'Confirmed', labelFr: 'Confirmée' },
  { value: 'checked_in', labelEn: 'Checked In', labelFr: 'Arrivé' },
  { value: 'checked_out', labelEn: 'Checked Out', labelFr: 'Parti' },
  { value: 'declined', labelEn: 'Declined', labelFr: 'Refusée' },
  { value: 'cancelled', labelEn: 'Cancelled', labelFr: 'Annulée' },
  { value: 'no_show', labelEn: 'No Show', labelFr: 'Non présenté' },
];

export const MENU_ORDER_STATUSES = [
  { value: 'pending', labelEn: 'Order Received', labelFr: 'Commande reçue' },
  { value: 'confirmed', labelEn: 'Confirmed', labelFr: 'Confirmée' },
  { value: 'preparing', labelEn: 'Preparing', labelFr: 'En préparation' },
  { value: 'ready', labelEn: 'Ready to Serve', labelFr: 'Prête à servir' },
  { value: 'completed', labelEn: 'Served / Completed', labelFr: 'Servie / Terminée' },
  { value: 'cancelled', labelEn: 'Cancelled', labelFr: 'Annulée' },
];

export const FULFILLMENT_TYPES = [
  { value: 'dine_in', labelEn: 'Dine-In (Restaurant)', labelFr: 'Sur place (Restaurant)' },
  { value: 'room_service', labelEn: 'Room Service', labelFr: 'Service en chambre' },
  { value: 'takeaway', labelEn: 'Takeaway / Pickup', labelFr: 'À emporter' },
];

export const SYNC_STATUSES = [
  { value: 'pending', labelEn: 'Pending Pull', labelFr: 'En attente' },
  { value: 'pulled', labelEn: 'Pulled', labelFr: 'Récupérée' },
  { value: 'synced', labelEn: 'Synced', labelFr: 'Synchronisée' },
  { value: 'ignored', labelEn: 'Ignored', labelFr: 'Ignorée' },
];

export function getOptionLabel(list, value, lang = 'en') {
  const found = list.find((item) => item.value === value);
  if (!found) return value || '';
  return lang === 'fr' ? found.labelFr : found.labelEn;
}
