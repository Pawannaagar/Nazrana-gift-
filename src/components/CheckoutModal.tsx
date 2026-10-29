import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  Truck, 
  Printer, 
  Lock,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  CartItem, 
  DeliveryScheduleDetails, 
  Order,
  Coupon 
} from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  deliverySchedule: DeliveryScheduleDetails;
  onOrderSuccess: (order: Order) => void;
  onViewTracking: (orderId: string) => void;
  appliedCoupon: Coupon | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  deliverySchedule,
  onOrderSuccess,
  onViewTracking,
  appliedCoupon
}) => {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('customer@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('421');
  const [cardName, setCardName] = useState('NAZRANA PATRON');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  
  let couponDiscount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'flat') {
      couponDiscount = Math.min(appliedCoupon.discountValue, subtotal);
    } else {
      couponDiscount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    }
  }

  const isFreeDelivery = subtotal >= 7999;
  const deliveryFee = isFreeDelivery ? 0 : (deliverySchedule.courierFee > 0 ? deliverySchedule.courierFee : 75);
  const hasFreeFerreroGift = subtotal >= 7999;
  const grandTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);

  const handleFillTestCard = () => {
    setCardNumber('4111 2222 3333 4444');
    setCardExpiry('12/28');
    setCardCvv('789');
    setCardName('FESTIVE PATRON');
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `NZR-RP-${Math.floor(1000 + Math.random() * 9000)}`;
      const awbNumber = `NZR-EXP-RP-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        items: [...cart],
        subtotal,
        couponCode: appliedCoupon?.code,
        couponDiscount,
        deliveryFee,
        grandTotal,
        deliverySchedule: { ...deliverySchedule },
        payment: {
          method: paymentMethod,
          status: 'Paid',
          transactionId: `TXN-RP-${Date.now().toString().slice(-8)}`,
          upiId: paymentMethod === 'upi' ? upiId : undefined,
          cardLast4: paymentMethod === 'card' ? cardNumber.slice(-4) : undefined
        },
        courier: {
          partner: deliverySchedule.courierPartner,
          awbNumber,
          status: 'Packed with Diyas',
          riderName: 'Rameshwar Verma (Raipur Delivery Lead)',
          riderContact: '+91 95897 73455',
          vehiclePlate: 'CG 04 MH 8891',
          estimatedDelivery: `${deliverySchedule.deliveryDate}, ${deliverySchedule.timeSlot.split(' ')[0]}`,
          trackingSteps: [
            {
              title: 'Order Placed & Payment Authorized',
              time: 'Just now',
              location: 'Raipur Digital Desk',
              status: 'completed',
              detail: `Payment verified via ${paymentMethod.toUpperCase()}. Order receipt generated.`
            },
            {
              title: 'Atelier Hamper Curating & Diya Placement',
              time: 'In Progress',
              location: 'Nazrana Pandri Atelier, Raipur',
              status: 'current',
              detail: 'Master hampers curator is arranging fresh gourmet treats, sweets, and auspicious diyas.'
            },
            {
              title: 'Organza Wrapping & Scent Infusion',
              time: 'Scheduled',
              location: 'Finishing Studio, Pandri, Raipur',
              status: 'pending',
              detail: 'Packaging with handcrafted floral brooch and handwritten calligraphy note.'
            },
            {
              title: 'Dispatched with Delivery Fleet',
              time: 'Scheduled',
              location: 'Raipur Logistics Hub',
              status: 'pending',
              detail: `Assigned under tracking ID ${awbNumber}.`
            },
            {
              title: 'Out for Delivery to Recipient',
              time: 'Pending',
              location: deliverySchedule.locality,
              status: 'pending',
              detail: `Enroute to ${deliverySchedule.recipientName}. Handover with delivery confirmation OTP.`
            }
          ]
        }
      };

      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F7E6A7', '#0F392B', '#FFD700']
      });
    }, 1500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#092B21] border border-[#D4AF37] shadow-2xl text-[#F7F1E5] overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#D4AF37]/20 bg-[#061D15] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0E4233] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#FDFBF7]">
                {completedOrder ? 'Order Confirmed!' : 'Secure Raipur Checkout'}
              </h3>
              <p className="text-[11px] text-[#E8DECB]/70">
                {completedOrder ? `Order #${completedOrder.id}` : '256-bit Encrypted Payment Gateway · Raipur, CG'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#0B3427] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* COMPLETED ORDER STATE */}
        {completedOrder ? (
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#0E4233] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto shadow-lg shadow-[#D4AF37]/20 animate-scale-up">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                🪔 Shubh Deepavali Dispatch Confirmed
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#FDFBF7]">
                Thank You! Your Hamper is Being Curated.
              </h3>
              <p className="text-xs text-[#E8DECB]/80 max-w-md mx-auto mt-1">
                Your order <strong className="text-[#F7E6A7] font-mono">#{completedOrder.id}</strong> has been received at our Pandri Atelier for handcrafted preparation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#061D15] border border-[#D4AF37]/25 text-left text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/15">
                <span className="text-[#E8DECB]/70">Recipient:</span>
                <strong className="text-[#FDFBF7]">{completedOrder.deliverySchedule.recipientName} ({completedOrder.deliverySchedule.recipientPhone})</strong>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/15">
                <span className="text-[#E8DECB]/70">Destination:</span>
                <span className="text-[#FDFBF7] text-right">{completedOrder.deliverySchedule.addressLine}, {completedOrder.deliverySchedule.locality}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/15">
                <span className="text-[#E8DECB]/70">Delivery Service:</span>
                <span className="text-[#F7E6A7] font-semibold flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  {completedOrder.courier.partner} (Tracking ID: <span className="font-mono">{completedOrder.courier.awbNumber}</span>)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#E8DECB]/70">Scheduled Slot:</span>
                <span className="text-emerald-400 font-medium">{completedOrder.deliverySchedule.deliveryDate} · {completedOrder.deliverySchedule.timeSlot}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0B2E23] border border-[#D4AF37]/20 flex items-center justify-between text-xs">
              <span className="text-[#E8DECB]">Total Paid:</span>
              <span className="text-lg font-bold font-mono text-[#F7E6A7] tabular-nums">
                ₹{completedOrder.grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="py-3 px-4 rounded-xl bg-[#061D15] hover:bg-[#0B3427] text-[#F7E6A7] border border-[#D4AF37]/40 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print Receipt</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onViewTracking(completedOrder.id);
                }}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all active:scale-95"
              >
                <Truck className="w-4 h-4" />
                <span>Track Live Order Now</span>
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM */
          <form onSubmit={handleProcessPayment} className="p-6 space-y-6">
            
            {/* Delivery Recap Strip */}
            <div className="p-3.5 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <span className="text-[#FDFBF7] font-semibold block">
                    Delivering to {deliverySchedule.locality}, Raipur
                  </span>
                  <span className="text-[11px] text-[#E8DECB]/70 font-mono">
                    {deliverySchedule.deliveryDate} · {deliverySchedule.timeSlot}
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-[#D4AF37] font-medium bg-[#0E4233] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                {deliverySchedule.courierPartner}
              </span>
            </div>

            {/* Payment Gateway Options (UPI, Card, Netbanking - NO COD) */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-3">
                Select Secure Payment Method:
              </label>

              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'bg-[#0E4233] border-[#D4AF37] ring-1 ring-[#D4AF37] text-[#F7E6A7]'
                      : 'bg-[#061D15] border-[#D4AF37]/20 text-[#E8DECB] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xs font-semibold">UPI & QR</span>
                  <span className="text-[10px] text-[#E8DECB]/60">GPay / PhonePe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-[#0E4233] border-[#D4AF37] ring-1 ring-[#D4AF37] text-[#F7E6A7]'
                      : 'bg-[#061D15] border-[#D4AF37]/20 text-[#E8DECB] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xs font-semibold">Cards</span>
                  <span className="text-[10px] text-[#E8DECB]/60">Visa / RuPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'netbanking'
                      ? 'bg-[#0E4233] border-[#D4AF37] ring-1 ring-[#D4AF37] text-[#F7E6A7]'
                      : 'bg-[#061D15] border-[#D4AF37]/20 text-[#E8DECB] hover:border-[#D4AF37]/40'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xs font-semibold">Net Banking</span>
                  <span className="text-[10px] text-[#E8DECB]/60">All Banks</span>
                </button>
              </div>

              {/* Sub-form */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-[#061D15] border border-[#D4AF37]/30 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-white shrink-0 shadow">
                      <div className="w-28 h-28 bg-[#061D15] p-2 rounded-lg flex flex-col items-center justify-center text-center">
                        <QrCode className="w-16 h-16 text-[#D4AF37]" />
                        <span className="text-[8px] font-mono text-[#F7E6A7] mt-0.5">SCAN & PAY ₹{grandTotal}</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 text-left">
                      <span className="text-xs font-semibold text-[#FDFBF7] block">
                        Instant Dynamic UPI QR / Virtual Payment Address
                      </span>
                      <p className="text-[11px] text-[#E8DECB]/70 font-light">
                        Scan with Google Pay, PhonePe, Paytm, BHIM, or enter your UPI ID.
                      </p>

                      <div className="flex gap-2 pt-1">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@upi"
                          className="flex-1 bg-[#092B21] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                        />
                        <button
                          type="button"
                          onClick={() => alert(`UPI request sent to ${upiId}. Complete payment in your UPI app.`)}
                          className="px-3 py-1.5 bg-[#D4AF37]/20 text-[#F7E6A7] border border-[#D4AF37]/40 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-[#061D15] border border-[#D4AF37]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#FDFBF7]">
                      Credit or Debit Card (Visa, Mastercard, RuPay)
                    </span>
                    <button
                      type="button"
                      onClick={handleFillTestCard}
                      className="text-[10px] text-[#D4AF37] hover:underline cursor-pointer"
                    >
                      Use Test Demo Card
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#E8DECB]/70 block mb-1">Card Number:</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#092B21] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs font-mono text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-[#E8DECB]/70 block mb-1">Expiry (MM/YY):</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#092B21] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs font-mono text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#E8DECB]/70 block mb-1">CVV:</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-[#092B21] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs font-mono text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#E8DECB]/70 block mb-1">Cardholder Name:</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full bg-[#092B21] border border-[#D4AF37]/30 rounded-lg px-3 py-1.5 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-[#061D15] border border-[#D4AF37]/30 space-y-2">
                  <span className="text-xs font-semibold text-[#FDFBF7] block">
                    Select Your Bank:
                  </span>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-[#092B21] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India (Raipur)">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Chhattisgarh Rajya Gramin Bank">Chhattisgarh Rajya Gramin Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}
            </div>

            {/* Price Tally (NO GST) */}
            <div className="p-4 rounded-2xl bg-[#061D15] border border-[#D4AF37]/20 space-y-2 text-xs text-[#E8DECB]/90">
              <div className="flex justify-between">
                <span>Hamper Items Total:</span>
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
                <div className="flex justify-between text-[11px] text-[#F7E6A7] font-medium bg-[#0E4233]/60 px-2 py-1 rounded">
                  <span>🎁 Free Diwali Gift (4-Pack Ferrero Rocher):</span>
                  <span className="font-mono font-bold">FREE</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#D4AF37]/20 flex justify-between text-sm font-bold text-[#FDFBF7]">
                <span>Total Amount Payable:</span>
                <span className="text-xl font-mono text-[#F7E6A7] tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#061D15] border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{grandTotal.toLocaleString('en-IN')} & Book Delivery</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#E8DECB]/50">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>PCI-DSS Compliant · Nazrana Raipur Guarantee</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
