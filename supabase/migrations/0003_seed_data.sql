-- Idempotent starter seed data for New Waves Resort (Ngeme, Limbe)

INSERT INTO public.site_settings (key, value, is_public) VALUES
  ('property_name', '"New Waves Resort, Ngeme Limbe"'::jsonb, true),
  ('property_tagline', '"A Resort Designed by & for Professionals"'::jsonb, true),
  ('whatsapp_number', '"237600000000"'::jsonb, true),
  ('contact_phone', '"+237 600 000 000"'::jsonb, true),
  ('contact_email', '"residency@newwavesresort.com"'::jsonb, true),
  ('info_email', '"info@newwavesresort.com"'::jsonb, true),
  ('foundation_email', '"impact@fisiyfoundation.org"'::jsonb, true),
  ('address_en', '"Ngeme, Mile 4 Coastal Road, Limbe, Cameroon"'::jsonb, true),
  ('address_fr', '"Ngeme, Route Côtière Mile 4, Limbe, Cameroun"'::jsonb, true),
  ('youtube_channel_id', '""'::jsonb, true),
  ('check_in_time', '"14:00"'::jsonb, true),
  ('check_out_time', '"11:00"'::jsonb, true),
  ('cancellation_hours', '24'::jsonb, true),
  ('currency_code', '"XAF"'::jsonb, true),
  ('currency_symbol', '"FCFA"'::jsonb, true),
  ('display_exchange_rates', '{"USD": 600, "EUR": 655.957}'::jsonb, true),
  ('featured_video_url', '"https://res.cloudinary.com/onuna2fn/video/upload/v1792764145/newwavesresort.mp4"'::jsonb, true),
  ('saker_landing_image_url', '""'::jsonb, true)
ON CONFLICT (key) DO NOTHING;

-- Starter Room Types (1-Bedroom, 2-Bedroom, 3-Bedroom & Villa)
INSERT INTO public.room_types (
  slug, suite_category, name_en, name_fr,
  short_description_en, short_description_fr,
  description_en, description_fr,
  base_price, currency, bedrooms, max_adults, max_children,
  bed_configuration, number_of_beds, size_sqm, view_type,
  amenities, cover_image_url, gallery_images,
  total_units, availability_status, is_featured, is_published, sort_order
) VALUES
(
  'nomad-one-bedroom-suite',
  '1-bedroom',
  '1-Bedroom Nomad Suite',
  'Suite Nomade 1 Chambre',
  'Ergonomic ocean-breeze sanctuary built for remote executives and scholars.',
  'Sanctuaire ergonomique face à l''océan conçu pour dirigeants et chercheurs.',
  'Designed for extended residencies and focused deep work. Features an ergonomic workspace, high-speed redundant Wi-Fi, king bedroom, private balcony, and full kitchenette.',
  'Conçue pour les résidences prolongées et le travail de fond. Comprend un bureau ergonomique, Wi-Fi redondant haut débit, lit king-size, balcon privé et kitchenette complète.',
  125000, 'XAF', 1, 2, 1, 'king', 1, 65, 'sea',
  '["Private Balcony", "King-size Bed", "Ergonomic Workstation", "High-Speed Wi-Fi", "Full Kitchenette", "Laptop Safe"]'::jsonb,
  '/assets/general/image14.jpeg',
  '[{"url":"/assets/general/image14.jpeg","caption_en":"Suite living workspace","caption_fr":"Espace de travail","is_cover":true,"display_order":0}]'::jsonb,
  4, 'available', true, true, 1
),
(
  'garden-two-bedroom-suite',
  '2-bedroom',
  '2-Bedroom Tropical Garden Suite',
  'Suite Jardin Tropical 2 Chambres',
  'Quiet two-bedroom sanctuary nestled amidst volcanic-soil botanical gardens.',
  'Sanctuaire calme de deux chambres niché au cœur des jardins tropicaux.',
  'Ideal for colleagues or small families seeking tranquility near Mount Cameroon. Includes two private bedrooms, shaded patio, rain shower, and high-speed fiber connectivity.',
  'Idéale pour collègues ou familles en quête de sérénité au pied du Mont Cameroun. Deux chambres privées, patio ombragé, douche pluie et connexion fibre haut débit.',
  165000, 'XAF', 2, 4, 2, 'queen', 2, 95, 'garden',
  '["Private Patio", "2 Private Bedrooms", "Garden Views", "Rain Shower", "High-Speed Wi-Fi", "Dining Area"]'::jsonb,
  '/assets/general/image15.jpeg',
  '[{"url":"/assets/general/image15.jpeg","caption_en":"Garden lounge terrace","caption_fr":"Terrasse jardin","is_cover":true,"display_order":0}]'::jsonb,
  3, 'available', true, true, 2
),
(
  'atlantic-horizon-two-bedroom-suite',
  '2-bedroom',
  '2-Bedroom Atlantic Horizon Suite',
  'Suite Horizon Atlantique 2 Chambres',
  'Panoramic Gulf of Guinea coastal residence with sunlit executive lounge.',
  'Résidence côtière panoramique sur le Golfe de Guinée avec salon exécutif.',
  'Wake up to sweeping Atlantic vistas from two spacious ocean-facing suites, complete with conference-ready dining room, deep soak bathtub, and private entrance.',
  'Réveillez-vous face à l''Atlantique dans deux suites spacieuses avec salle à manger de réunion, baignoire profonde et entrée privée.',
  210000, 'XAF', 2, 4, 2, 'king', 2, 120, 'sea',
  '["Panoramic Sea View", "2 King Bedrooms", "Private Terrace", "Deep Soak Bathtub", "Smart TV", "24/7 Power & Starlink"]'::jsonb,
  '/assets/general/image11.jpeg',
  '[{"url":"/assets/general/image11.jpeg","caption_en":"Atlantic horizon view","caption_fr":"Vue Horizon Atlantique","is_cover":true,"display_order":0}]'::jsonb,
  2, 'available', true, true, 3
),
(
  'executive-founders-three-bedroom-suite',
  '3-bedroom',
  '3-Bedroom Executive Founders Suite',
  'Suite des Fondateurs 3 Chambres',
  'Flagship multi-bedroom residency for delegations, summits, and VIP retreats.',
  'Résidence phare 3 chambres pour délégations, sommets et retraites VIP.',
  'Our premier 180sqm waterfront residence engineered for leadership delegations and families. Features three private bedrooms, executive board dining table, gourmet kitchen, and personalized concierge.',
  'Notre résidence phare de 180 m² en bord de mer conçue pour délégations et familles. Trois chambres privées, table exécutive, cuisine gastronomique et conciergerie dédiée.',
  350000, 'XAF', 3, 6, 2, 'super_king', 3, 180, 'sea',
  '["3 En-Suite Bedrooms", "Ocean View Terrace", "Executive Lounge", "Gourmet Kitchen", "Concierge Service", "Private Entrance"]'::jsonb,
  '/assets/general/image3.jpeg',
  '[{"url":"/assets/general/image3.jpeg","caption_en":"Executive residence exterior","caption_fr":"Extérieur résidence","is_cover":true,"display_order":0}]'::jsonb,
  1, 'available', true, true, 4
)
ON CONFLICT (slug) DO NOTHING;

-- Starter Culinary Master Catalog
INSERT INTO public.menu_items (
  slug, name_en, name_fr, description_en, description_fr,
  category, price_xaf, dietary_tags, allergens, preparation_minutes,
  image_url, is_signature, is_active
) VALUES
(
  'plantain-crisps-kati-kati',
  'Plantain Crisps with Spicy Kati-Kati',
  'Chips de Plantain au Kati-Kati Épicé',
  'Thinly sliced organic plantains served with fiery roasted kati-kati pepper reduction.',
  'Plantains biologiques finement tranchés servis avec une sauce pimentée kati-kati.',
  'appetizer', 3500, ARRAY['vegan', 'gluten_free', 'organic', 'spicy'], ARRAY[]::text[], 12,
  'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&q=80&w=800',
  true, true
),
(
  'mbongo-tchobi-prawns',
  'Mbongo Tchobi Atlantic Prawns',
  'Crevettes Atlantiques au Mbongo Tchobi',
  'Wild Gulf of Guinea prawns simmered in a rich aromatic black spice broth with crayfish and herbs.',
  'Crevettes sauvages du Golfe de Guinée mijotées dans un bouillon aromatique aux épices noires.',
  'appetizer', 6500, ARRAY['gluten_free', 'organic'], ARRAY['crustaceans'], 20,
  'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=800',
  true, true
),
(
  'chargrilled-atlantic-lobster',
  'Atlantic Chargrilled Lobster',
  'Homard Grillé de l''Atlantique',
  'Caught daily off the Limbe coast, basted with volcanic-soil herb butter and grilled plantain.',
  'Pêché chaque matin au large de Limbe, nappé de beurre aux herbes volcaniques.',
  'main', 18500, ARRAY['gluten_free', 'organic'], ARRAY['crustaceans', 'milk'], 30,
  'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&q=80&w=800',
  true, true
),
(
  'volcanic-stone-sea-bream',
  'Traditional Limbe Sea Bream',
  'Dorade Traditionnelle de Limbe',
  'Whole sea bream slow-roasted over volcanic stone heat with ginger, turmeric, and local greens.',
  'Dorade entière rôtie lentement sur pierre volcanique au gingembre, curcuma et légumes locaux.',
  'main', 12000, ARRAY['gluten_free', 'organic'], ARRAY['fish'], 25,
  'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800',
  true, true
),
(
  'ndole-vegetarian-heritage',
  'Heritage Ndolé Vegetarian',
  'Ndolé Végétarien Traditionnel',
  'Creamy organic bitterleaf stew simmered with roasted groundnuts, served with boiled plantains or bobolo.',
  'Feuilles amères biologiques mijotées aux arachides grillées, servies avec plantains ou bobolo.',
  'main', 8500, ARRAY['vegan', 'vegetarian', 'gluten_free', 'organic'], ARRAY['peanuts'], 25,
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
  false, true
),
(
  'grass-fed-beef-kati-kati',
  'Grass-Fed Beef Fillet & Honey Glaze',
  'Filet de Bœuf Nourri à l''Herbe & Miel Local',
  'Tender grass-fed beef grilled over volcanic coals and glazed with Fako wildflower honey and pepper.',
  'Filet tendre grillé sur braises volcaniques, glacé au miel sauvage du Fako et poivre local.',
  'main', 14500, ARRAY['gluten_free'], ARRAY[]::text[], 25,
  'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800',
  false, true
),
(
  'mt-cameroon-garden-salad',
  'Mt. Cameroon Volcanic Garden Salad',
  'Salade du Jardin Volcanique du Mont Cameroun',
  'Crisp organic greens, avocado, roasted papaya seeds, and citrus vinaigrette from mountain foothills.',
  'Jeunes pousses biologiques, avocat, graines de papaye torréfiées et vinaigrette aux agrumes.',
  'side', 5500, ARRAY['vegan', 'vegetarian', 'gluten_free', 'organic'], ARRAY[]::text[], 10,
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
  false, true
),
(
  'hibiscus-ginger-sunrise-elixir',
  'Foléré & Volcanic Ginger Elixir',
  'Élixir Foléré & Gingembre Volcanique',
  'Chilled organic hibiscus infusion steeped with fresh Fako ginger, mint, and raw cane nectar.',
  'Infusion glacée d''hibiscus biologique au gingembre frais du Fako, menthe et nectar de canne.',
  'beverage', 2500, ARRAY['vegan', 'gluten_free', 'organic'], ARRAY[]::text[], 5,
  'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=800',
  false, true
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Today's Sample Published Daily Menu (in Africa/Douala local date)
DO $$
DECLARE
  v_today date := (now() AT TIME ZONE 'Africa/Douala')::date;
  v_menu_id uuid;
BEGIN
  INSERT INTO public.daily_menus (
    service_date, title_en, title_fr, chef_note_en, chef_note_fr, status, published_at
  ) VALUES (
    v_today,
    'Fresh from the Gulf of Guinea & Fako Farms',
    'Fraîcheur du Golfe de Guinée & Fermes du Fako',
    'Today our fishermen landed Atlantic lobster and sea bream at dawn, paired with strictly organic mountain greens.',
    'Nos pêcheurs ont ramené ce matin homard et dorade de l''Atlantique, accompagnés de légumes biologiques du Mont Cameroun.',
    'published',
    now()
  )
  ON CONFLICT (service_date) DO NOTHING
  RETURNING id INTO v_menu_id;

  IF v_menu_id IS NOT NULL THEN
    INSERT INTO public.daily_menu_entries (daily_menu_id, menu_item_id, meal_period, display_order, highlight_badge)
    SELECT v_menu_id, id,
      CASE
        WHEN slug IN ('hibiscus-ginger-sunrise-elixir', 'mt-cameroon-garden-salad') THEN 'all_day'
        WHEN slug IN ('plantain-crisps-kati-kati', 'ndole-vegetarian-heritage') THEN 'lunch'
        ELSE 'dinner'
      END,
      row_number() OVER (ORDER BY is_signature DESC, name_en ASC),
      CASE WHEN is_signature THEN 'chef_pick' ELSE '' END
    FROM public.menu_items
    WHERE is_active = true
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- Seed Starter Gallery Media (Photos + YouTube References)
INSERT INTO public.gallery_media (
  media_type, title_en, title_fr, description_en, description_fr,
  category, image_url, youtube_video_id, youtube_url, youtube_duration,
  is_featured_home, is_published, display_order
)
SELECT * FROM (
  VALUES
    ('image', 'Atlantic Vista', 'Vue Atlantique', 'The main resort facade facing the Gulf of Guinea.', 'Façade principale face au Golfe de Guinée.', 'architecture', '/assets/general/image3.jpeg', '', '', '', true, true, 1),
    ('image', 'Executive Nomad Suite', 'Suite Nomade Exécutive', 'Equipped with ergonomic workstations and Atlantic views.', 'Équipée de postes de travail ergonomiques avec vue océan.', 'interiors', '/assets/general/image11.jpeg', '', '', '', true, true, 2),
    ('image', 'The Infinity Edge', 'Piscine à Débordement', 'Limbe''s premier ocean-front volcanic-view pool.', 'La piscine panoramique face à l''océan à Limbe.', 'leisure', '/assets/general/image15.jpeg', '', '', '', true, true, 3),
    ('image', 'Coastal Culinary Terrace', 'Terrasse Culinaire Côtière', 'Fresh seafood served overlooking the volcanic shoreline.', 'Fruits de mer frais servis face au littoral volcanique.', 'dining', '/assets/general/image1.jpeg', '', '', '', true, true, 4),
    ('image', 'Starlit Serenity', 'Sérénité Étoilée', 'Evening illumination across the Ngeme sanctuary.', 'Illuminations du soir au sanctuaire de Ngeme.', 'architecture', '/assets/general/image5.jpeg', '', '', '', true, true, 5),
    ('image', 'The Dialogue Lounge', 'Salon des Dialogues', 'Where global leaders and thinkers convene.', 'Espace de rencontre des leaders et penseurs.', 'professional', '/assets/general/image2.jpeg', '', '', '', true, true, 6),
    ('youtube', 'Ocean-Side Intellectual Talks Highlight', 'Temps Fort des Dialogues Océaniques', 'Conversations on African governance, digital innovation, and sustainable heritage.', 'Échanges sur la gouvernance africaine, l''innovation et le patrimoine durable.', 'talks', '', '5Aa9Mc1VqKE', 'https://www.youtube.com/watch?v=5Aa9Mc1VqKE', '54:32', true, true, 7)
) AS v(media_type, title_en, title_fr, description_en, description_fr, category, image_url, youtube_video_id, youtube_url, youtube_duration, is_featured_home, is_published, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.gallery_media);
