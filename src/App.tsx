/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGallery } from './components/ProductGallery';
import { HamperBuilder } from './components/HamperBuilder';
import { DeliveryScheduler } from './components/DeliveryScheduler';
import { OrderTracking } from './components/OrderTracking';
import { UserDashboard } from './components/UserDashboard';
import { CorporateGifts } from './components/CorporateGifts';
import { BlogSection } from './components/BlogSection';
import { ProductManagerModal } from './components/ProductManagerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LiveChat } from './components/LiveChat';
import { Footer } from './components/Footer';

import { 
  HamperProduct, 
  CustomHamper, 
  CartItem, 
  DeliveryScheduleDetails, 
  Order,
  StoreSettings,
  Coupon
} from './types';
import { 
  CATALOG_PRODUCTS, 
  INITIAL_ORDERS, 
  RAIPUR_LOCALITIES,
  DEFAULT_STORE_SETTINGS,
  DEFAULT_COUPONS
} from './data/catalog';

export default function App() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'builder' | 'corporate' | 'blog' | 'tracking' | 'logistics' | 'account'>('catalog');
  
  // Store Settings (phone numbers: 9589773455, 9243515692, delivery: 2-3 days, location: Purani Basti, Shivaji Nagar)
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('nazrana_store_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_STORE_SETTINGS;
  });

  // Dynamic products list (can be managed, prices edited, added, removed)
  const [products, setProducts] = useState<HamperProduct[]>(() => {
    try {
      const saved = localStorage.getItem('nazrana_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure the newly added Nazrana Premium Hamper is merged in if not yet present
        let result = parsed;
        const hasPremium = parsed.some((p: HamperProduct) => p.id === 'nazrana-premium-hamper');
        if (!hasPremium) {
          const premium = CATALOG_PRODUCTS.find(p => p.id === 'nazrana-premium-hamper');
          if (premium) {
            result = [parsed[0], parsed[1], premium, ...parsed.slice(2)];
          }
        } else {
          result = result.map((p: HamperProduct) => {
            if (p.id === 'nazrana-premium-hamper') {
              return {
                ...p,
                price: 1299,
                image: '/assets/aistudio/file_00000000f2f08211a9126fdc06952e91_662cd374.png'
              };
            }
            return p;
          });
        }
        return result;
      }
    } catch (e) {
      console.error(e);
    }
    return CATALOG_PRODUCTS;
  });

  // Dynamic coupons list
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('nazrana_coupons');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_COUPONS;
  });

  // Applied coupon in cart & checkout
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => DEFAULT_COUPONS[0]); // Auto-apply DIWALI2026 for festive delight

  const [isManagerOpen, setIsManagerOpen] = useState(false);

  // Selected product from hero or external link
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  
  // Builder preset from a catalog item customization
  const [builderCustomization, setBuilderCustomization] = useState<{ basketId?: string; items?: string[] } | null>(null);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nazrana_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default starter items: Classic & Premium Hampers
    return [
      {
        cartId: 'default-cart-item-1',
        type: 'catalog',
        product: CATALOG_PRODUCTS[0], // Classic Hamper ₹1,299
        quantity: 1,
        unitPrice: CATALOG_PRODUCTS[0].price
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Delivery schedule configuration
  const [deliverySchedule, setDeliverySchedule] = useState<DeliveryScheduleDetails>(() => {
    const loc = RAIPUR_LOCALITIES[0]; // Shankar Nagar
    return {
      city: 'Raipur, Chhattisgarh',
      locality: loc.name,
      pincode: loc.pincode,
      addressLine: 'Bungalow 14, Lotus Greens, Shankar Nagar',
      landmark: 'Near Ashoka Millenium',
      recipientName: 'Shalini Dewangan',
      recipientPhone: '+91 95897 73455',
      deliveryDate: new Date().toISOString().split('T')[0],
      timeSlot: 'Evening Prime (05:00 PM - 08:30 PM)',
      deliveryType: 'Standard Scheduled (2-3 Days)',
      courierPartner: 'Raipur Standard Delivery',
      courierFee: loc.distanceKm * 15,
      distanceKm: loc.distanceKm,
      hasFreeGift: false,
      isGiftSurprise: true,
      specialInstructions: 'Ring bell softly. 2-3 Days standard dispatch.'
    };
  });

  // Orders list (with initial historical orders)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('nazrana_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>(undefined);

  // Sync settings
  const handleSaveStoreSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
    try {
      localStorage.setItem('nazrana_store_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.error(e);
    }
  };

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nazrana_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync coupons to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nazrana_coupons', JSON.stringify(coupons));
    } catch (e) {
      console.error(e);
    }
  }, [coupons]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nazrana_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nazrana_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Cart operations
  const handleAddToCart = (product: HamperProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.type === 'catalog' && item.product?.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.cartId === existing.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          cartId: `cart-prod-${Date.now()}`,
          type: 'catalog',
          product,
          quantity: 1,
          unitPrice: product.price
        }
      ];
    });
  };

  const handleAddCustomHamperToCart = (customHamper: CustomHamper) => {
    setCart(prev => [
      ...prev,
      {
        cartId: `cart-custom-${Date.now()}`,
        type: 'custom',
        customHamper,
        quantity: 1,
        unitPrice: customHamper.totalPrice
      }
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleCustomizeProduct = (product: HamperProduct) => {
    setBuilderCustomization({
      basketId: product.category === 'Luxury' ? 'royal-golden-filigree' : 'burlap-classic-tray',
      items: product.itemsIncluded
    });
    setActiveTab('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  const handleTrackSpecificOrder = (orderId: string) => {
    setTrackingOrderId(orderId);
    setActiveTab('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReorder = (items: CartItem[]) => {
    setCart(prev => [...prev, ...items.map(it => ({ ...it, cartId: `cart-reorder-${Date.now()}-${Math.random()}` }))]);
    setIsCartOpen(true);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#061D15] text-[#F7F1E5] flex flex-col selection:bg-[#D4AF37] selection:text-[#061D15]">
      
      {/* Universal Top Navigation conforming to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        phonePrimary={storeSettings.phonePrimary}
        phoneSecondary={storeSettings.phoneSecondary}
        announcementText={storeSettings.announcementText}
        onOpenSettings={() => setIsManagerOpen(true)}
      />

      {/* Main App Body */}
      <main className="flex-1">
        {activeTab === 'catalog' && (
          <>
            <Hero
              onOpenBuilder={() => setActiveTab('builder')}
              onExploreCatalog={() => {
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectProduct={(productId) => {
                setSelectedProductId(productId);
              }}
              deliveryTimeline={storeSettings.deliveryTimeline}
            />

            <ProductGallery
              products={products}
              onAddToCart={handleAddToCart}
              onCustomizeProduct={handleCustomizeProduct}
              selectedProductId={selectedProductId}
              onClearSelectedProduct={() => setSelectedProductId(undefined)}
            />
          </>
        )}

        {activeTab === 'builder' && (
          <HamperBuilder
            onAddCustomHamperToCart={handleAddCustomHamperToCart}
            initialBasketId={builderCustomization?.basketId}
            initialItems={builderCustomization?.items}
          />
        )}

        {activeTab === 'corporate' && (
          <CorporateGifts
            onSelectProduct={(productId) => {
              setSelectedProductId(productId);
              setActiveTab('catalog');
            }}
            phonePrimary={storeSettings.phonePrimary}
            phoneSecondary={storeSettings.phoneSecondary}
            deliveryTimeline={storeSettings.deliveryTimeline}
          />
        )}

        {activeTab === 'blog' && (
          <BlogSection
            onOpenBuilder={() => setActiveTab('builder')}
            onExploreCatalog={() => setActiveTab('catalog')}
            phonePrimary={storeSettings.phonePrimary}
            phoneSecondary={storeSettings.phoneSecondary}
          />
        )}

        {activeTab === 'logistics' && (
          <DeliveryScheduler
            initialSchedule={deliverySchedule}
            onSaveSchedule={(saved) => {
              setDeliverySchedule(saved);
              alert('✓ Raipur delivery schedule and logistics preferences saved successfully!');
            }}
            subtotal={cartSubtotal}
          />
        )}

        {activeTab === 'tracking' && (
          <OrderTracking
            orders={orders}
            initialTrackingOrderId={trackingOrderId}
            onClearInitialOrderId={() => setTrackingOrderId(undefined)}
          />
        )}

        {activeTab === 'account' && (
          <UserDashboard
            orders={orders}
            onReorder={handleReorder}
            onTrackOrder={handleTrackSpecificOrder}
          />
        )}
      </main>

      {/* Slide-Over Cart Drawer with Offer Coupon support */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        availableCoupons={coupons}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Secure Checkout & Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        deliverySchedule={deliverySchedule}
        onOrderSuccess={handleOrderSuccess}
        onViewTracking={handleTrackSpecificOrder}
        appliedCoupon={appliedCoupon}
      />

      {/* Store & Product Manager Modal: Prices, New Products, Offer Coupons, Helplines */}
      <ProductManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        products={products}
        onUpdateProducts={setProducts}
        coupons={coupons}
        onUpdateCoupons={setCoupons}
        storeSettings={storeSettings}
        onUpdateSettings={handleSaveStoreSettings}
      />

      {/* 24/7 Live Chat Concierge */}
      <LiveChat
        onOpenBuilder={() => setActiveTab('builder')}
        onExploreCatalog={() => setActiveTab('catalog')}
        onTrackOrder={() => setActiveTab('tracking')}
        onOpenCorporate={() => setActiveTab('corporate')}
        phonePrimary={storeSettings.phonePrimary}
        phoneSecondary={storeSettings.phoneSecondary}
      />

      {/* Footer */}
      <Footer 
        onNavigate={setActiveTab}
        phonePrimary={storeSettings.phonePrimary}
        phoneSecondary={storeSettings.phoneSecondary}
        deliveryTimeline={storeSettings.deliveryTimeline}
      />

    </div>
  );
}
