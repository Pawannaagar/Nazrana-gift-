import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Tag,
  Check
} from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  availableCoupons: Coupon[];
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  availableCoupons
}) => {
  if (!isOpen) return null;

  const [inputCouponCode, setInputCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const isFreeDelivery = subtotal >= 7999 || subtotal === 0;
  const deliveryFee = isFreeDelivery ? 0 : 75; // Standard distance ~5km from Purani Basti @ ₹15/km
  const hasFreeFerreroGift = subtotal >= 7999;
  
  // Calculate coupon discount
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'flat') {
      couponDiscount = Math.min(appliedCoupon.discountValue, subtotal);
    } else {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    }
  }

  const grandTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handleApplyInput = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = inputCouponCode.trim().toUpperCase();
    if (!code) return;

    const found = availableCoupons.find(c => c.code === code && c.isActive);
    if (!found) {
      setCouponError('Invalid coupon code. Try DIWALI2026 or SHUBH15.');
      return;
    }

    if (subtotal < found.minOrder) {
      setCouponError(`Minimum order of ₹${found.minOrder} required for ${found.code}.`);
      return;
    }

    onApplyCoupon(found);
    setInputCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#092B21] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col justify-between text-[#F7F1E5]">
          
          {/* Header */}
          <div className="p-5 border-b border-[#D4AF37]/20 flex items-center justify-between bg-[#061D15]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0E4233] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#FDFBF7]">
                  Your Hamper Bag
                </h3>
                <span className="text-[11px] text-[#E8DECB]/70">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} for Raipur Delivery
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#0B3427] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#D4AF37]/40 mx-auto" />
                <h4 className="font-display text-xl text-[#FDFBF7]">Your Hamper Bag is Empty</h4>
                <p className="text-xs text-[#E8DECB]/70 max-w-xs mx-auto">
                  Explore our Diwali special hampers or design your own bespoke hamper!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#061D15] font-semibold text-xs cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-3.5 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 flex gap-3 shadow-md"
                  >
                    <div className="w-18 h-18 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-[#D4AF37]/20">
                      <img
                        src={
                          item.type === 'catalog'
                            ? item.product?.image
                            : item.customHamper?.basket.image
                        }
                        alt="Hamper item"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#FDFBF7] truncate">
                            {item.type === 'catalog' ? item.product?.name : 'Custom Bespoke Hamper'}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartId)}
                            className="text-[#E8DECB]/50 hover:text-red-400 p-0.5 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.type === 'custom' && item.customHamper && (
                          <p className="text-[10px] text-[#D4AF37] mt-0.5 line-clamp-1">
                            {item.customHamper.basket.name.split(' ')[0]} · {item.customHamper.items.length} items
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D4AF37]/10">
                        <span className="font-mono text-xs sm:text-sm font-bold text-[#F7E6A7] tabular-nums">
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>

                        <div className="flex items-center gap-1.5 bg-[#092B21] border border-[#D4AF37]/20 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="w-5 h-5 rounded hover:bg-[#D4AF37] hover:text-[#061D15] flex items-center justify-center text-xs text-[#E8DECB] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="w-5 h-5 rounded hover:bg-[#D4AF37] hover:text-[#061D15] flex items-center justify-center text-xs text-[#E8DECB] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Offer Coupon Box */}
                <div className="p-3.5 rounded-2xl bg-[#061D15] border border-[#D4AF37]/25 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#F7E6A7] flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Apply Offer Coupon</span>
                    </span>
                    {appliedCoupon && (
                      <button
                        onClick={() => onApplyCoupon(null)}
                        className="text-[10px] text-red-400 hover:underline cursor-pointer"
                      >
                        Remove ({appliedCoupon.code})
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleApplyInput} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={inputCouponCode}
                      onChange={(e) => setInputCouponCode(e.target.value)}
                      className="flex-1 bg-[#092B21] border border-[#D4AF37]/30 rounded-lg px-2.5 py-1.5 text-xs uppercase font-mono text-[#F7E6A7] focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#061D15] text-xs font-bold cursor-pointer hover:bg-[#F5DF9A]"
                    >
                      Apply
                    </button>
                  </form>

                  {couponError && (
                    <p className="text-[10px] text-amber-300">{couponError}</p>
                  )}

                  {/* Available coupon pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {availableCoupons.slice(0, 3).map(cpn => (
                      <button
                        key={cpn.code}
                        onClick={() => onApplyCoupon(cpn)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors cursor-pointer border ${
                          appliedCoupon?.code === cpn.code
                            ? 'bg-[#D4AF37] text-[#061D15] font-bold border-[#D4AF37]'
                            : 'bg-[#092B21] text-[#F7E6A7] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                        }`}
                      >
                        {cpn.code} ({cpn.discountType === 'flat' ? `₹${cpn.discountValue} OFF` : `${cpn.discountValue}% OFF`})
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Final Net Price */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#D4AF37]/20 bg-[#061D15] space-y-3">
              {/* Ferrero Rocher & Free Delivery Alert */}
              {hasFreeFerreroGift ? (
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-[#0E4233] to-[#0A3025] border border-[#D4AF37] text-xs flex items-center gap-2 text-[#F7E6A7] animate-pulse">
                  <span className="text-base">🎁</span>
                  <div>
                    <span className="font-bold block text-xs">FREE Delivery + 4-Pack Ferrero Rocher!</span>
                    <span className="text-[10px] text-[#E8DECB]/80">Celebratory Diwali chocolates added to your parcel.</span>
                  </div>
                </div>
              ) : (
                <div className="p-2 rounded-xl bg-[#092B21] border border-[#D4AF37]/30 text-[11px] text-[#E8DECB]/90 flex items-center justify-between">
                  <span>Add ₹{(7999 - subtotal).toLocaleString('en-IN')} more for:</span>
                  <span className="text-[#F7E6A7] font-semibold">FREE Delivery + 4 Ferrero Rocher</span>
                </div>
              )}

              <div className="space-y-1.5 text-xs text-[#E8DECB]/80">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#FDFBF7]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Coupon Discount ({appliedCoupon?.code}):</span>
                    <span className="font-mono">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-[11px] text-[#E8DECB]/80">
                  <span>Raipur Delivery (₹15/km):</span>
                  <span className="font-mono text-emerald-400 font-semibold">
                    {deliveryFee === 0 ? 'FREE (Orders ₹7,999+)' : `₹${deliveryFee}`}
                  </span>
                </div>

                {hasFreeFerreroGift && (
                  <div className="flex justify-between text-[11px] text-[#F7E6A7] font-medium">
                    <span>Diwali Gift (4-Pack Ferrero Rocher):</span>
                    <span className="font-mono font-bold">FREE</span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#D4AF37]/20 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-[#FDFBF7]">Grand Total:</span>
                  <span className="text-xl font-bold font-mono text-[#F7E6A7] tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Proceed to Raipur Delivery & Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#E8DECB]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>UPI, Cards & Netbanking Accepted in Raipur</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
