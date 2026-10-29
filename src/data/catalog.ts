import {
  HamperProduct,
  BuilderItem,
  BasketBase,
  RibbonOption,
  FragranceOption,
  RaipurLocality,
  Order,
  BlogPost,
  StoreSettings,
  Coupon
} from '../types';

export const CATALOG_PRODUCTS: HamperProduct[] = [
  {
    id: 'nazrana-classic-hamper',
    name: 'Nazrana Classic Hamper (Diwali Special)',
    category: 'Classic',
    price: 1299,
    originalPrice: 1699,
    description: 'Shubh Deepavali Special! Handcrafted rustic jute basket adorned with an artisanal burlap blossom brooch and luminous organza veil. Packed with Cadbury Celebrations, gourmet Dark Fantasy cookies, traditional savoury Lite Chuda, premium Namkeen mixture, handcrafted Rose Truffles, wholesome Date Bites, and refreshing Fruiti.',
    image: '/assets/aistudio/file_000000006f348211a8a7b1ccebdc5cb3_40916a6e.png',
    itemsIncluded: [
      'Cadbury Celebration Pack',
      'Sunfeast Dark Fantasy Choco Fills',
      'Fruiti Mango Nectar Drink',
      'Artisanal Lite Chuda',
      'Royal Spicy Mixture Namkeen',
      'Artisan Rose Truffles (Box of 4)',
      'Oman Date Bites with Dryfruit Filling'
    ],
    packaging: 'Handwoven Jute Basket with Floral Brooch, Organza Wrap & Satin Bow',
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 182,
    deliveryTime: '2-3 Days (Express Available)',
    weight: '1.4 kg'
  },
  {
    id: 'nazrana-luxury-hamper',
    name: 'Nazrana Luxury Hamper (Shubh Deepavali)',
    category: 'Luxury',
    price: 2499,
    originalPrice: 3299,
    description: 'Imperial Diwali Grandeur! Arched royal golden wire hamper with delicate filigree lattice work, crowned with a rich scarlet rose and shimmering golden netting. Curated with Dairy Milk Silk, hand-selected Jumbo Cashews, Californian Badam, Afghan Salted Pistas, Ferrero Rocher chocolates, Gulab Jamun tin, chilled Coke gold can, gourmet Cookies, Date Bites, and Roseberry Truffle Chocolates.',
    image: '/assets/aistudio/file_0000000025808211a7ecd7fb6cb102b9_0984d255.png',
    itemsIncluded: [
      'Cadbury Dairy Milk Silk (150g)',
      'Jumbo Roasted & Salted Cashews (200g Jar)',
      'Premium California Badam / Almonds (200g Jar)',
      'Peshawari Pistachios (150g Potli Bag)',
      'Ferrero Rocher Hazelnut Chocolates (8 pcs)',
      'Traditional Gulab Jamun Heritage Tin',
      'Nutty Date Bites (Box of 6)',
      'Coca-Cola Can (Chilled Gold Edition)',
      'Roseberry Truffle Chocolate Confection',
      'Butter Almond Crunch Artisan Cookies'
    ],
    packaging: 'Arched Royal Golden Wire Hamper with Scarlet Rose & Shimmer Gold Netting',
    isPopular: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 240,
    deliveryTime: '2-3 Days (Express Available)',
    weight: '2.8 kg'
  },
  {
    id: 'nazrana-premium-hamper',
    name: 'Nazrana Premium Hamper (Diwali Special)',
    category: 'Diwali Special',
    price: 1299,
    originalPrice: 1799,
    description: 'Thoughtful Gifts | Lasting Impressions! Shubh Deepavali Special at ₹1,299. Handcrafted in our Purani Basti, Shivaji Nagar atelier. Features a royal rectangular lustrous golden wire basket wrapped in golden honeycomb netting with our signature crimson velvet rose brooch. Packed with Cadbury Dairy Milk Silk, roasted cashews, California badam, artisan butter cookies, chilled Coke, handmade roseberry truffles, Dark Fantasy, and date bites.',
    image: '/assets/aistudio/file_00000000f2f08211a9126fdc06952e91_662cd374.png',
    itemsIncluded: [
      'Cadbury Dairy Milk Silk (150g)',
      'Roasted Cashews in Glass Jar (200g)',
      'California Badam / Almonds (200g)',
      'Artisan Butter Cookies (Box of 6)',
      'Coca-Cola Refreshing Can (250ml)',
      'Handmade Roseberry Truffle Chocolates',
      'Sunfeast Dark Fantasy Choco Fills',
      'Sweet Nutty Date Bites'
    ],
    packaging: 'Rectangular Golden Wire Basket with Golden Honeycomb Netting & Crimson Velvet Rose Brooch',
    isPopular: true,
    isBestSeller: true,
    rating: 4.96,
    reviewCount: 215,
    deliveryTime: '2-3 Days (Express Available)',
    weight: '2.4 kg'
  },
  {
    id: 'nazrana-diwali-grand-feast-basket',
    name: 'Shubh Deepavali Grand Feast Basket',
    category: 'Diwali Special',
    price: 2199,
    originalPrice: 2899,
    description: 'Special Diwali edition! An opulent festive hamper overflowing with glass jars of California roasted almonds, jumbo salted cashews, gourmet pistachio baklava, handcrafted clay diyas, and imported chocolates.',
    image: '/src/assets/images/diwali_hamper_showcase_1793258963327.jpg',
    itemsIncluded: [
      'California Almonds in Airtight Glass Jar (200g)',
      'Roasted Salted Jumbo Cashews (200g)',
      'Pistachio Baklava Confection (6 pcs)',
      'Handcrafted Terracotta Diya Pair with Ghee Wicks',
      'Belgian Dark Cocoa Truffles',
      'Golden Zari Festive Gift Box'
    ],
    packaging: 'Woven Golden Willow Hamper with Zari Bow & Marigold Floral Trim',
    isPopular: true,
    isBestSeller: true,
    rating: 4.95,
    reviewCount: 164,
    deliveryTime: '2-3 Days (Express Available)',
    weight: '2.5 kg'
  },
  {
    id: 'nazrana-diwali-royal-diya-chest',
    name: 'Imperial Diwali Diya & Delights Chest',
    category: 'Diwali Special',
    price: 1799,
    originalPrice: 2299,
    description: 'Enchanting Diwali festival keepsake box featuring hand-carved brass oil lamps, pure Kaju Katli with silver foil, Afghan kishmish, and royal incense cone sachet.',
    image: '/src/assets/images/diwali_diyas_lanterns_1793258961379.jpg',
    itemsIncluded: [
      'Carved Antique Brass Peacock Diya',
      'Pure Silver Vark Kaju Katli (250g)',
      'Golden Afghan Raisins / Kishmish (200g)',
      'Roasted Salted Badam (150g)',
      'Handcrafted Scented Soy Candle in Brass Pot'
    ],
    packaging: 'Forest Green Velvet Keepsake Trunk with Golden Brass Clasp',
    isPopular: true,
    isBestSeller: false,
    rating: 4.89,
    reviewCount: 92,
    deliveryTime: '2-3 Days (Express Available)',
    weight: '2.0 kg'
  },
  {
    id: 'nazrana-rajwada-wedding',
    name: 'Shahi Rajwada Festive Chest',
    category: 'Royal Festive',
    price: 3499,
    originalPrice: 4200,
    description: 'Designed exclusively for royal bridal welcomes and grand celebrations across Raipur. Includes silver-embossed dry fruit canisters, Kashmiri saffron threads, organic forest honey, gourmet Baklava, and Belgian dark truffles.',
    image: '/assets/aistudio/file_0000000025808211a7ecd7fb6cb102b9_0984d255.png',
    itemsIncluded: [
      'Kashmiri Mongra Saffron (1g Velvet Vial)',
      'Silver Plated Dryfruit Canister (Cashew & Almonds 400g)',
      'Authentic Turkish Pistachio Baklava (8 pcs)',
      'Handcrafted Brass Diya with Carved Base',
      'Belgian Dark Cocoa Truffles',
      'Sundarban Organic Honey (250g Jar)'
    ],
    packaging: 'Antique Brass & Gold Tiered Tray with Zardozi Embroidery Trim',
    isPopular: false,
    isBestSeller: false,
    rating: 4.95,
    reviewCount: 84,
    deliveryTime: '2-3 Days (Express Available)',
    weight: '3.2 kg'
  },
  {
    id: 'nazrana-corporate-executive',
    name: 'Raipur Executive Gourmet Crate',
    category: 'Corporate',
    price: 2800,
    originalPrice: 3500,
    description: 'Tailored for Raipur business leaders, corporate gifting, and VIP client appreciations. Features single-origin Darjeeling second flush tea, imported Lindt chocolate bar, roasted macadamia nuts, and Italian hazelnut wafers.',
    image: '/assets/aistudio/file_0000000025808211a7ecd7fb6cb102b9_0984d255.png',
    itemsIncluded: [
      'Single-Estate Darjeeling Muscatel Tea (100g Tin)',
      'Lindt Excellence 70% Dark Chocolate Bar (100g)',
      'Roasted Salted Macadamia Nuts (150g Jar)',
      'Loacker Italian Hazelnut Crispy Wafers',
      'Artisan Fig & Nut Health Bites (Box of 6)',
      'Brass Metallic Monogram Bookmark'
    ],
    packaging: 'Matte Forest-Green Wooden Pine Crate with Laser Etched Monogram',
    isPopular: false,
    isBestSeller: false,
    rating: 4.92,
    reviewCount: 63,
    deliveryTime: '2-3 Days (Express Available)',
    weight: '2.4 kg'
  }
];

export const BASKET_BASES: BasketBase[] = [
  {
    id: 'burlap-classic-tray',
    name: 'Rustic Jute Basket with Floral Brooch',
    material: 'Natural Woven Burlap & Gold Thread',
    maxUnits: 8,
    price: 350,
    image: '/assets/aistudio/file_000000006f348211a8a7b1ccebdc5cb3_40916a6e.png',
    description: 'Sturdy structured rectangular jute weave highlighted with handcrafted burlap flower brooch and gold piping. Perfect for earthy, warm festive gifting.',
    dimensions: '12" × 9" × 5"',
    textureClass: 'from-amber-950/40 to-emerald-950/40'
  },
  {
    id: 'royal-golden-filigree',
    name: 'Imperial Golden Arched Wire Hamper',
    material: 'Handcrafted Polished Brass-Gold Wire',
    maxUnits: 12,
    price: 650,
    image: '/assets/aistudio/file_0000000025808211a7ecd7fb6cb102b9_0984d255.png',
    description: 'Majestic arched brass basket featuring intricate woven lattice, decorative beaded pearls and scarlet rose centerpiece. The pinnacle of royal gifting.',
    dimensions: '15" × 11" × 8"',
    textureClass: 'from-amber-500/20 to-yellow-600/30'
  },
  {
    id: 'emerald-velvet-trunk',
    name: 'Royal Emerald Velvet Keepsake Chest',
    material: 'Plush Forest Green Velvet with Gold Clasp',
    maxUnits: 10,
    price: 750,
    image: '/src/assets/images/diwali_diyas_lanterns_1793258961379.jpg',
    description: 'Opulent wooden trunk upholstered in rich dark green velvet with polished brass corner guards and vintage lock latch.',
    dimensions: '14" × 10" × 6"',
    textureClass: 'from-emerald-900/60 to-emerald-950/80'
  },
  {
    id: 'diwali-willow-basket',
    name: 'Handcrafted Golden Willow Festive Tray',
    material: 'Polished Willow Cane & Zari Ribbons',
    maxUnits: 10,
    price: 550,
    image: '/src/assets/images/diwali_hamper_showcase_1793258963327.jpg',
    description: 'Festive Diwali willow basket adorned with golden lace, tassels, and marigold flower brooches.',
    dimensions: '14" Round Basket',
    textureClass: 'from-yellow-700/30 to-amber-900/40'
  }
];

export const BUILDER_ITEMS: BuilderItem[] = [
  // Sweets & Mithai
  {
    id: 'item-gulab-jamun',
    name: 'Heritage Gulab Jamun Tin',
    category: 'sweets',
    price: 220,
    weightGrams: 500,
    units: 2,
    iconEmoji: '🍯',
    description: 'Soft melt-in-mouth cottage cheese dumplings infused with rose and cardamom syrup.'
  },
  {
    id: 'item-date-bites',
    name: 'Nutty Date Bites (Box of 6)',
    category: 'sweets',
    price: 260,
    weightGrams: 200,
    units: 1,
    iconEmoji: '🌴',
    description: 'Arabian dates stuffed with pistachios and crushed almonds, natural sweetener.'
  },
  {
    id: 'item-kaju-katli',
    name: 'Silver Vark Kaju Katli (250g)',
    category: 'sweets',
    price: 340,
    weightGrams: 250,
    units: 1,
    iconEmoji: '✨',
    description: 'Traditional diamond-cut pure cashew sweet topped with edible silver leaf.'
  },
  {
    id: 'item-turkish-baklava',
    name: 'Gourmet Pistachio Baklava (6 pcs)',
    category: 'sweets',
    price: 420,
    weightGrams: 220,
    units: 1,
    iconEmoji: '🥮',
    description: 'Delicate crispy filo pastry layered with Antep pistachios and wild honey syrup.'
  },

  // Dry Fruits & Nuts
  {
    id: 'item-jumbo-cashew',
    name: 'Jumbo W240 Roasted Cashews (200g Jar)',
    category: 'dryfruits',
    price: 320,
    weightGrams: 200,
    units: 1,
    iconEmoji: '🥜',
    description: 'Crunchy slow-roasted cashews seasoned with pink crystal salt in a sealed glass jar.'
  },
  {
    id: 'item-california-almonds',
    name: 'California Badam / Almonds (200g Jar)',
    category: 'dryfruits',
    price: 280,
    weightGrams: 200,
    units: 1,
    iconEmoji: '🌰',
    description: 'Grade-A whole Californian almonds packed with natural crunch.'
  },
  {
    id: 'item-pista-potli',
    name: 'Salted Afghan Pistachios in Silk Potli (150g)',
    category: 'dryfruits',
    price: 310,
    weightGrams: 150,
    units: 1,
    iconEmoji: '🟢',
    description: 'Naturally opened roasted pistachios tucked inside a golden zari drawstring pouch.'
  },
  {
    id: 'item-afghan-raisins',
    name: 'Golden Kishmish / Raisins (200g)',
    category: 'dryfruits',
    price: 180,
    weightGrams: 200,
    units: 1,
    iconEmoji: '🍇',
    description: 'Sweet elongated seedless Afghani green raisins in airtight packaging.'
  },

  // Chocolates
  {
    id: 'item-dairy-milk-silk',
    name: 'Cadbury Dairy Milk Silk (150g)',
    category: 'chocolates',
    price: 195,
    weightGrams: 150,
    units: 1,
    iconEmoji: '🍫',
    description: 'Classic velvety smooth chocolate bar loved across generations.'
  },
  {
    id: 'item-ferrero-rocher',
    name: 'Ferrero Rocher Hazelnut (8 pcs)',
    category: 'chocolates',
    price: 380,
    weightGrams: 100,
    units: 1,
    iconEmoji: '🍬',
    description: 'Whole hazelnut surrounded by praline, wafer, and smooth cocoa cream.'
  },
  {
    id: 'item-rose-truffles',
    name: 'Artisan Rose Truffles (Box of 4)',
    category: 'chocolates',
    price: 240,
    weightGrams: 120,
    units: 1,
    iconEmoji: '🌹',
    description: 'White chocolate ganache infused with damask rose essence and dried rose petals.'
  },
  {
    id: 'item-roseberry-chocolate',
    name: 'Roseberry Truffle Chocolate Confection',
    category: 'chocolates',
    price: 290,
    weightGrams: 140,
    units: 1,
    iconEmoji: '🍓',
    description: 'Dark Belgian chocolate shell bursting with wild raspberry compote.'
  },
  {
    id: 'item-dark-fantasy',
    name: 'Sunfeast Dark Fantasy Choco Fills (Box)',
    category: 'chocolates',
    price: 150,
    weightGrams: 300,
    units: 1,
    iconEmoji: '🍪',
    description: 'Crisp cocoa cookies baked to perfection with rich flowing molten chocolate core.'
  },
  {
    id: 'item-celebration-pack',
    name: 'Cadbury Celebrations Gift Pack',
    category: 'chocolates',
    price: 250,
    weightGrams: 140,
    units: 1,
    iconEmoji: '🎁',
    description: 'Festive assortment of Dairy Milk, Perk, 5 Star and Gems treats.'
  },

  // Savories
  {
    id: 'item-lite-chuda',
    name: 'Artisanal Lite Chuda (200g)',
    category: 'savories',
    price: 140,
    weightGrams: 200,
    units: 1,
    iconEmoji: '🌾',
    description: 'Crunchy flattened rice flakes roasted with peanuts, curry leaves, and mild seasoning.'
  },
  {
    id: 'item-royal-mixture',
    name: 'Royal Spicy Namkeen Mixture (200g)',
    category: 'savories',
    price: 160,
    weightGrams: 200,
    units: 1,
    iconEmoji: '🌶️',
    description: 'Crispy gram flour noodles, cashews, lentils, and aromatic spices.'
  },
  {
    id: 'item-butter-cookies',
    name: 'Butter Almond Crunch Cookies (Jar)',
    category: 'savories',
    price: 220,
    weightGrams: 250,
    units: 1,
    iconEmoji: '🧈',
    description: 'Rich Danish style butter cookies with sliced roasted almonds.'
  },

  // Beverages
  {
    id: 'item-coke-gold',
    name: 'Coca-Cola Sleek Gold Can (330ml)',
    category: 'beverages',
    price: 60,
    weightGrams: 350,
    units: 1,
    iconEmoji: '🥤',
    description: 'Chilled refreshing classic soda in commemorative golden can packaging.'
  },
  {
    id: 'item-fruiti-nectar',
    name: 'Fruiti Mango Nectar Drink',
    category: 'beverages',
    price: 50,
    weightGrams: 300,
    units: 1,
    iconEmoji: '🥭',
    description: 'Sweet Alphonso mango pulp juice beverage in protective slim pack.'
  },
  {
    id: 'item-darjeeling-tea',
    name: 'Single Estate Darjeeling Tea Tin (100g)',
    category: 'beverages',
    price: 380,
    weightGrams: 150,
    units: 1,
    iconEmoji: '🫖',
    description: 'High-altitude Darjeeling tea harvested with floral muscatel notes.'
  },

  // Diwali Keepsakes & Decor
  {
    id: 'item-brass-diya',
    name: 'Handcrafted Auspicious Brass Diya',
    category: 'keepsakes',
    price: 320,
    weightGrams: 200,
    units: 1,
    iconEmoji: '🪔',
    description: 'Traditional handcrafted brass oil lamp with peacock carved handle for Diwali blessings.'
  },
  {
    id: 'item-clay-diya-set',
    name: 'Set of 4 Gold-Painted Terracotta Diyas',
    category: 'keepsakes',
    price: 180,
    weightGrams: 180,
    units: 1,
    iconEmoji: '🪔',
    description: 'Artisanal earthen diyas hand-dipped in royal gold paint, pre-filled with organic wax.'
  },
  {
    id: 'item-scented-candle',
    name: 'Royal Oudh & Amber Soy Wax Candle',
    category: 'keepsakes',
    price: 350,
    weightGrams: 220,
    units: 1,
    iconEmoji: '🕯️',
    description: 'Eco soy wax candle hand-poured in hammered brass pot with 25-hour clean burn time.'
  }
];

export const RIBBON_OPTIONS: RibbonOption[] = [
  { id: 'ribbon-scarlet', name: 'Royal Crimson Velvet Ribbon', colorHex: '#991B1B', accent: 'Deep Red Silk' },
  { id: 'ribbon-gold', name: 'Metallic Golden Zari Ribbon', colorHex: '#D4AF37', accent: 'Lustrous Gold' },
  { id: 'ribbon-emerald', name: 'Imperial Emerald Satin Ribbon', colorHex: '#064E3B', accent: 'Dark Forest Green' },
  { id: 'ribbon-ivory', name: 'Ivory Organza with Gold Edge', colorHex: '#FEF3C7', accent: 'Champagne Cream' }
];

export const FRAGRANCE_OPTIONS: FragranceOption[] = [
  { id: 'scent-rose', name: 'Kashmiri Gulab (Damask Rose)', notes: 'Romantic, royal, soothing' },
  { id: 'scent-oudh', name: 'Royal Oudh & Sandalwood', notes: 'Opulent, grounding, woody warmth' },
  { id: 'scent-mogra', name: 'Varanasi Jasmine & Mogra', notes: 'Fresh floral, blissful, uplifting' },
  { id: 'scent-none', name: 'No Fragrance Pouch', notes: 'Pure natural packaging without mist' }
];

export const RAIPUR_LOCALITIES: RaipurLocality[] = [
  { name: 'Purani Basti & Shivaji Nagar', pincode: '492001', zone: 'Central Raipur', estimatedMinutes: 15, distanceKm: 1 },
  { name: 'Sadar Bazar & Gol Bazar', pincode: '492001', zone: 'Central Raipur', estimatedMinutes: 20, distanceKm: 2 },
  { name: 'Byron Bazar & Katora Talab', pincode: '492001', zone: 'Central Raipur', estimatedMinutes: 25, distanceKm: 2.5 },
  { name: 'Civil Lines', pincode: '492001', zone: 'Central Raipur', estimatedMinutes: 30, distanceKm: 3.5 },
  { name: 'Samta Colony', pincode: '492001', zone: 'Central Raipur', estimatedMinutes: 30, distanceKm: 3 },
  { name: 'Pachpedi Naka', pincode: '492001', zone: 'South Raipur', estimatedMinutes: 35, distanceKm: 4 },
  { name: 'Devendra Nagar', pincode: '492004', zone: 'Central Raipur', estimatedMinutes: 35, distanceKm: 4.5 },
  { name: 'Pandri', pincode: '492004', zone: 'Central Raipur', estimatedMinutes: 40, distanceKm: 5 },
  { name: 'Telibandha & Marine Drive', pincode: '492006', zone: 'East Raipur', estimatedMinutes: 40, distanceKm: 5.5 },
  { name: 'Shankar Nagar', pincode: '492007', zone: 'East Raipur', estimatedMinutes: 45, distanceKm: 6 },
  { name: 'Gudhiyari & Station Road', pincode: '492009', zone: 'West Raipur', estimatedMinutes: 40, distanceKm: 4 },
  { name: 'Mowa & Saddu', pincode: '492014', zone: 'North Raipur', estimatedMinutes: 50, distanceKm: 8 },
  { name: 'Khamtarai & Bhanpuri', pincode: '492003', zone: 'North Raipur', estimatedMinutes: 55, distanceKm: 9 },
  { name: 'VIP Road (Near Airport / Hotels)', pincode: '492015', zone: 'East Raipur', estimatedMinutes: 50, distanceKm: 10 },
  { name: 'Tatibandh (Near AIIMS Raipur)', pincode: '492099', zone: 'West Raipur', estimatedMinutes: 60, distanceKm: 9 },
  { name: 'Naya Raipur (Atal Nagar)', pincode: '492018', zone: 'Naya Raipur', estimatedMinutes: 75, distanceKm: 20 }
];

export const COURIER_SERVICES = [
  {
    id: 'raipur-standard',
    name: 'Raipur Standard Delivery',
    description: 'Distance-based automated dispatch (₹15/km from Purani Basti). Delivery in 2-3 days.',
    sla: 'Delivery in 2-3 Days',
    baseFee: 15,
    rating: 4.9,
    tag: 'Standard ₹15/km'
  },
  {
    id: 'raipur-express-priority',
    name: 'Raipur Express Priority Fleet',
    description: 'Priority air-conditioned van dispatch (₹15/km + ₹60 priority slot).',
    sla: 'Guaranteed Priority Slot',
    baseFee: 75,
    rating: 4.95,
    tag: 'Priority Slot'
  },
  {
    id: 'same-day-raipur-dispatch',
    name: 'Same-Day Raipur Dispatch',
    description: 'Rush handover from Purani Basti, Shivaji Nagar Atelier directly to recipient in 3-4 hours.',
    sla: 'Same-Day (3-4 Hours)',
    baseFee: 150,
    rating: 4.98,
    tag: 'Urgent Same-Day'
  }
];

export const DEFAULT_COUPONS: Coupon[] = [
  {
    code: 'DIWALI2026',
    discountType: 'flat',
    discountValue: 300,
    minOrder: 1299,
    description: 'Flat ₹300 OFF on festive orders above ₹1,299',
    isActive: true
  },
  {
    code: 'SHUBH15',
    discountType: 'percentage',
    discountValue: 15,
    minOrder: 2000,
    description: '15% OFF on orders above ₹2,000',
    isActive: true
  },
  {
    code: 'FESTIVE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrder: 999,
    description: '10% OFF on all festive hampers',
    isActive: true
  },
  {
    code: 'DIWALI500',
    discountType: 'flat',
    discountValue: 500,
    minOrder: 3000,
    description: 'Flat ₹500 OFF on luxury hampers above ₹3,000',
    isActive: true
  }
];

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  businessName: 'Nazrana Luxury Gift',
  phonePrimary: '9589773455',
  phoneSecondary: '9243515692',
  deliveryTimeline: 'Delivery in 2-3 Days (Express Available)',
  announcementText: '🪔 Shubh Deepavali Celebration · ₹15/km Delivery across Raipur · Buy ₹7,999+ for FREE Delivery & 4-Pack Ferrero Rocher Chocolates! · Helpline: 9589773455 / 9243515692',
  email: 'concierge@nazranagifts.in',
  address: 'Nazrana Atelier, Purani Basti, Shivaji Nagar, Raipur, Chhattisgarh 492001'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'NZR-RP-7492',
    createdAt: '2026-10-27T09:30:00Z',
    items: [
      {
        cartId: 'cart-1',
        type: 'catalog',
        product: CATALOG_PRODUCTS[1], // Luxury hamper
        quantity: 1,
        unitPrice: 2499
      }
    ],
    subtotal: 2499,
    couponCode: 'FESTIVE10',
    couponDiscount: 249.9,
    deliveryFee: 0,
    grandTotal: 2249.1,
    deliverySchedule: {
      city: 'Raipur, Chhattisgarh',
      locality: 'VIP Road (Near Airport / Hotels)',
      pincode: '492015',
      addressLine: 'Bungalow 14, Royal Greens Enclave, VIP Road',
      recipientName: 'Vikram & Ananya Singhania',
      recipientPhone: '+91 95897 73455',
      deliveryDate: 'Today',
      timeSlot: 'Evening Prime (05:00 PM - 08:30 PM)',
      deliveryType: 'Standard Scheduled (2-3 Days)',
      courierPartner: 'Raipur Express Priority Fleet',
      courierFee: 0,
      isGiftSurprise: true,
      specialInstructions: 'Ring bell gently. Diwali family surprise!'
    },
    payment: {
      method: 'upi',
      status: 'Paid',
      transactionId: 'UPI-RAIPUR-99238491823',
      upiId: 'vikram.s@okhdfcbank'
    },
    courier: {
      partner: 'Raipur Express Priority Fleet',
      awbNumber: 'NZR-RP-EXP-99214',
      status: 'Out for Delivery',
      riderName: 'Rameshwar Verma (Raipur Delivery Lead)',
      riderContact: '+91 95897 73455',
      vehiclePlate: 'CG 04 MH 8891',
      estimatedDelivery: 'Today, 06:15 PM',
      trackingSteps: [
        {
          title: 'Order Placed & Payment Authorized via UPI',
          time: '09:30 AM',
          location: 'Raipur Digital Gateway',
          status: 'completed',
          detail: 'Payment verified. Order receipt generated.'
        },
        {
          title: 'Hamper Basket Handcrafted & Curated',
          time: '11:15 AM',
          location: 'Nazrana Atelier, Purani Basti, Shivaji Nagar, Raipur',
          status: 'completed',
          detail: 'Dry fruits weighed in sealed jars. Chocolates & sweets arranged in royal gold wire basket.'
        },
        {
          title: 'Scarlet Rose Ornamented & Fragrance Mist Applied',
          time: '01:45 PM',
          location: 'Finishing Studio, Shivaji Nagar, Raipur',
          status: 'completed',
          detail: 'Shimmer gold netting hand-tied with scarlet rose brooch. Festive mist infused.'
        },
        {
          title: 'Handed Over to Delivery Fleet',
          time: '03:30 PM',
          location: 'Central Raipur Dispatch Hub',
          status: 'completed',
          detail: 'Loaded into air-conditioned delivery van #CG-04-MH-8891.'
        },
        {
          title: 'Out for Delivery in Raipur',
          time: '04:45 PM',
          location: 'Enroute VIP Road / Telibandha Junction',
          status: 'current',
          detail: 'Rameshwar Verma is on the way. Estimated arrival: 06:15 PM.'
        },
        {
          title: 'Delivery Handover & Digital Proof',
          time: 'Pending',
          location: 'Recipient Address, VIP Road',
          status: 'pending',
          detail: 'Recipient will provide OTP verification upon personal handover.'
        }
      ]
    }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Art of Diwali Gifting: Curating Auspicious Hampers with Diyas, Dry Fruits & Gourmet Treats in Raipur',
    slug: 'diwali-gifting-raipur-auspicious-hampers',
    category: 'Festive Guide',
    readTime: '4 min read',
    date: 'Oct 28, 2026',
    author: 'Nazrana Atelier Curator',
    excerpt: 'Explore how handcrafted brass diyas, California almonds, and Belgian chocolates bring festive prosperity and warmth to homes across Chhattisgarh.',
    image: '/src/assets/images/diwali_hero_banner_1793258962956.jpg',
    tags: ['Diwali Special', 'Raipur Celebrations', 'Brass Diyas', 'Dry Fruits'],
    content: [
      'Diwali is the pinnacle of warmth, illumination, and heartfelt gifting in Raipur. From family gatherings in Shankar Nagar to grand celebrations on VIP Road, presenting a beautifully adorned festive hamper symbolizes abundance and reverence.',
      'Our Shubh Deepavali hampers bring together the quintessential elements of Diwali: pure terracotta and brass diyas, rich roasted cashews, California badam, and celebratory sweets nestled in royal golden filigree.',
      'Enjoy delivery in 2-3 days across all sectors in Raipur, with express same-day courier dispatch available for last-minute celebrations.'
    ]
  },
  {
    id: 'blog-2',
    title: 'Corporate Diwali Hampers: How Raipur Businesses Are Celebrating VIP Clients and Teams',
    slug: 'corporate-diwali-hampers-raipur',
    category: 'Corporate Insights',
    readTime: '3 min read',
    date: 'Oct 26, 2026',
    author: 'Nazrana B2B Desk',
    excerpt: 'Custom logo laser-engraved crates, volume discounts, and seamless scheduled batch delivery across Raipur commercial hubs.',
    image: '/src/assets/images/diwali_hamper_showcase_1793258963327.jpg',
    tags: ['Corporate Gifting', 'Diwali 2026', 'Raipur Business', 'Bulk Orders'],
    content: [
      'Corporate gifting for Diwali in Raipur has set a new benchmark of elegance. Instead of generic sweet boxes, organizations are choosing customized wooden hampers engraved with their company monogram.',
      'Our dedicated B2B corporate desk coordinates scheduled batch deliveries across Purani Basti, Shivaji Nagar, Devendra Nagar, Civil Lines, and Naya Raipur.',
      'Use coupon codes or contact our corporate leads directly at 9589773455 and 9243515692 for tiered quotes.'
    ]
  },
  {
    id: 'blog-3',
    title: 'Classic vs. Luxury: Inside the Making of Nazrana’s Signature Festive Baskets',
    slug: 'classic-vs-luxury-hamper-craftsmanship',
    category: 'Hamper Styling',
    readTime: '3 min read',
    date: 'Oct 22, 2026',
    author: 'Nazrana Gifting Specialist',
    excerpt: 'A behind-the-scenes look into our handwoven burlap jute baskets with brooch seals versus our imperial arched golden wire baskets.',
    image: '/assets/aistudio/file_000000006f348211a8a7b1ccebdc5cb3_40916a6e.png',
    tags: ['Hamper Making', 'Classic Hamper', 'Luxury Hamper', 'Handcrafted'],
    content: [
      'Every hamper crafted at our Purani Basti, Shivaji Nagar atelier begins with a meticulous choice of structural vessel. Our beloved Classic Hamper is anchored in a rustic handwoven jute frame, crowned with an artisan-stitched burlap floral brooch and shimmering organza wrap.',
      'For occasions demanding royal opulence, the Nazrana Luxury Hamper features a hand-welded arched golden wire basket inspired by Mughal jali architectural filigree, finished with a fresh scarlet rose ornament.',
      'Every inclusion is weighed, sealed, and inspected for freshness before dispatch.'
    ]
  }
];
