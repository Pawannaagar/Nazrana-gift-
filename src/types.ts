export interface HamperProduct {
  id: string;
  name: string;
  category: 'Classic' | 'Luxury' | 'Diwali Special' | 'Royal Festive' | 'Gourmet & Dry Fruits' | 'Corporate';
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  itemsIncluded: string[];
  packaging: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  weight: string;
}

export interface BuilderItem {
  id: string;
  name: string;
  category: 'chocolates' | 'dryfruits' | 'sweets' | 'savories' | 'beverages' | 'keepsakes';
  price: number;
  weightGrams: number;
  units: number; // capacity footprint (1 to 2)
  iconEmoji: string;
  description: string;
  image?: string;
}

export interface BasketBase {
  id: string;
  name: string;
  material: string;
  maxUnits: number;
  price: number;
  image: string;
  description: string;
  dimensions: string;
  textureClass: string;
}

export interface RibbonOption {
  id: string;
  name: string;
  colorHex: string;
  accent: string;
}

export interface FragranceOption {
  id: string;
  name: string;
  notes: string;
}

export interface CustomHamper {
  id: string;
  basket: BasketBase;
  items: { item: BuilderItem; count: number }[];
  ribbon: RibbonOption;
  fragrance: FragranceOption;
  giftCardMessage: string;
  recipientName: string;
  senderName: string;
  calligraphyStyle: 'Royal Script' | 'Modern Serif' | 'Traditional Hindi/English';
  totalPrice: number;
  totalWeightGrams: number;
}

export interface CartItem {
  cartId: string;
  type: 'catalog' | 'custom';
  product?: HamperProduct;
  customHamper?: CustomHamper;
  quantity: number;
  unitPrice: number;
}

export interface RaipurLocality {
  name: string;
  pincode: string;
  zone: 'Central Raipur' | 'North Raipur' | 'South Raipur' | 'East Raipur' | 'West Raipur' | 'Naya Raipur';
  estimatedMinutes: number;
  distanceKm: number;
}

export interface DeliveryScheduleDetails {
  city: 'Raipur, Chhattisgarh';
  locality: string;
  pincode: string;
  addressLine: string;
  landmark?: string;
  recipientName: string;
  recipientPhone: string;
  deliveryDate: string;
  timeSlot: string;
  deliveryType: 'Standard Scheduled (2-3 Days)' | 'Express Same-Day' | 'Midnight Surprise';
  courierPartner: 'Raipur Standard Delivery' | 'Raipur Express Priority Fleet' | 'Same-Day Raipur Dispatch';
  courierFee: number;
  distanceKm?: number;
  hasFreeGift?: boolean;
  isGiftSurprise: boolean;
  specialInstructions?: string;
}

export interface OrderTrackingStep {
  title: string;
  time: string;
  location: string;
  status: 'completed' | 'current' | 'pending';
  detail: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrder: number;
  description: string;
  isActive: boolean;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  couponCode?: string;
  couponDiscount: number;
  deliveryFee: number;
  grandTotal: number;
  deliverySchedule: DeliveryScheduleDetails;
  payment: {
    method: 'upi' | 'card' | 'netbanking';
    status: 'Paid' | 'Processing';
    transactionId: string;
    upiId?: string;
    cardLast4?: string;
  };
  courier: {
    partner: string;
    awbNumber: string;
    status: 'Order Placed' | 'Curating Hamper' | 'Packed with Diyas' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
    riderName?: string;
    riderContact?: string;
    vehiclePlate?: string;
    estimatedDelivery: string;
    trackingSteps: OrderTrackingStep[];
    digitalProofImage?: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  time: string;
  suggestions?: string[];
  actionPrompt?: {
    type: 'view_catalog' | 'start_builder' | 'check_pincode' | 'track_order' | 'open_corporate';
    label: string;
    data?: any;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Gifting Etiquette' | 'Festive Guide' | 'Corporate Insights' | 'Hamper Styling';
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string[];
  image: string;
  tags: string[];
}

export interface StoreSettings {
  businessName: string;
  phonePrimary: string;
  phoneSecondary: string;
  deliveryTimeline: string;
  announcementText: string;
  email: string;
  address: string;
}
