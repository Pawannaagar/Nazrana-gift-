import React, { useState } from 'react';
import { 
  Search, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Copy, 
  Check, 
  Navigation, 
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingProps {
  orders: Order[];
  initialTrackingOrderId?: string;
  onClearInitialOrderId?: () => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  orders,
  initialTrackingOrderId,
  onClearInitialOrderId
}) => {
  const [searchOrderId, setSearchOrderId] = useState<string>(
    initialTrackingOrderId || (orders.length > 0 ? orders[0].id : 'NZR-RP-7492')
  );
  const [copiedAwb, setCopiedAwb] = useState(false);

  React.useEffect(() => {
    if (initialTrackingOrderId) {
      setSearchOrderId(initialTrackingOrderId);
      if (onClearInitialOrderId) onClearInitialOrderId();
    }
  }, [initialTrackingOrderId, onClearInitialOrderId]);

  const activeOrder = orders.find(
    o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase()
  ) || orders[0];

  const handleCopyAwb = (awb: string) => {
    navigator.clipboard.writeText(awb);
    setCopiedAwb(true);
    setTimeout(() => setCopiedAwb(false), 2000);
  };

  return (
    <section className="py-10 bg-[#061D15] text-[#F7F1E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 border-b border-[#D4AF37]/20 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Raipur Logistics Telemetry</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
            Real-Time Hamper Tracking
          </h2>
          <p className="text-sm text-[#E8DECB]/80 mt-1 max-w-2xl font-light">
            Monitor each milestone of your hamper—from fresh curation at our Purani Basti, Shivaji Nagar Atelier to real-time delivery van dispatch in Raipur.
          </p>
        </div>

        {/* Search Bar & Order quick select */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-[#092B21] p-4 rounded-2xl border border-[#D4AF37]/25">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g. NZR-RP-7492)"
              className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#E8DECB]/60 shrink-0 text-[11px] uppercase tracking-wider">Recent Orders:</span>
            {orders.map(o => (
              <button
                key={o.id}
                onClick={() => setSearchOrderId(o.id)}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer shrink-0 ${
                  activeOrder?.id === o.id
                    ? 'bg-[#D4AF37] text-[#061D15] font-bold border-[#D4AF37]'
                    : 'bg-[#061D15] text-[#E8DECB] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                }`}
              >
                #{o.id}
              </button>
            ))}
          </div>
        </div>

        {!activeOrder ? (
          <div className="py-16 text-center border border-[#D4AF37]/20 rounded-2xl bg-[#092B21]/30">
            <AlertCircle className="w-10 h-10 text-[#D4AF37] mx-auto mb-2" />
            <h3 className="font-display text-xl text-[#FDFBF7]">Order Not Found</h3>
            <p className="text-xs text-[#E8DECB]/70 mt-1">Please verify the Order ID or select from recent orders above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Courier Telemetry & Live Map Preview (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Courier Status Card */}
              <div className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#0E4233] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-[#FDFBF7]">
                        {activeOrder.courier.partner}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-[#E8DECB]/70">
                        <span>AWB: <strong className="text-[#F7E6A7] font-mono">{activeOrder.courier.awbNumber}</strong></span>
                        <button
                          onClick={() => handleCopyAwb(activeOrder.courier.awbNumber)}
                          className="hover:text-[#F7E6A7] cursor-pointer"
                          title="Copy AWB Tracking Number"
                        >
                          {copiedAwb ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    activeOrder.courier.status === 'Delivered'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-[#D4AF37]/20 text-[#F7E6A7] border border-[#D4AF37]/40'
                  }`}>
                    {activeOrder.courier.status}
                  </span>
                </div>

                {/* Rider Details if available */}
                {activeOrder.courier.riderName && (
                  <div className="p-3.5 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#E8DECB]/60 text-[10px] uppercase tracking-wider block">Assigned Raipur Courier Lead:</span>
                      <strong className="text-[#FDFBF7] text-sm">{activeOrder.courier.riderName}</strong>
                      <span className="text-[#D4AF37] text-[11px] block mt-0.5 font-mono">
                        Vehicle: {activeOrder.courier.vehiclePlate} (Climate-Controlled Van)
                      </span>
                    </div>

                    <a
                      href={`tel:${activeOrder.courier.riderContact}`}
                      className="px-3 py-1.5 rounded-lg bg-[#0E4233] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] border border-[#D4AF37]/30 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Contact Rider</span>
                    </a>
                  </div>
                )}

                {/* Simulated Raipur Route Map */}
                <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/25 bg-[#061D15] p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between text-[#E8DECB]/80">
                    <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold text-xs">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Raipur Urban Transit Telemetry</span>
                    </span>
                    <span className="font-mono text-[#F7E6A7]">
                      ETA: {activeOrder.courier.estimatedDelivery}
                    </span>
                  </div>

                  {/* Route Visualizer */}
                  <div className="relative h-24 rounded-lg bg-gradient-to-r from-[#04150F] via-[#08291F] to-[#04150F] border border-[#D4AF37]/15 p-3 flex items-center justify-between">
                    {/* Origin */}
                    <div className="flex flex-col items-center text-center z-10">
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#061D15] flex items-center justify-center font-bold text-[10px]">
                        1
                      </div>
                      <span className="text-[10px] text-[#FDFBF7] font-medium mt-1">Purani Basti Atelier</span>
                      <span className="text-[8px] text-[#E8DECB]/60">Dispatch Point</span>
                    </div>

                    {/* Connecting Route Line with pulsing van */}
                    <div className="flex-1 relative mx-3 h-1 bg-[#D4AF37]/30">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#061D15] shadow-lg animate-pulse">
                        <Truck className="w-3.5 h-3.5" />
                      </div>
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-[#F7E6A7] whitespace-nowrap font-mono">
                        Near Telibandha
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="flex flex-col items-center text-center z-10">
                      <div className="w-6 h-6 rounded-full bg-[#0E4233] border border-[#D4AF37] text-[#F7E6A7] flex items-center justify-center font-bold text-[10px]">
                        2
                      </div>
                      <span className="text-[10px] text-[#FDFBF7] font-medium mt-1 truncate max-w-[90px]">
                        {activeOrder.deliverySchedule.locality.split(' ')[0]}
                      </span>
                      <span className="text-[8px] text-[#E8DECB]/60">{activeOrder.deliverySchedule.pincode}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#E8DECB]/70 italic">
                    Recipient address: {activeOrder.deliverySchedule.addressLine}, {activeOrder.deliverySchedule.locality}, Raipur.
                  </p>
                </div>
              </div>

              {/* Items in this shipment */}
              <div className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-5 shadow-xl space-y-3">
                <h3 className="font-display font-bold text-base text-[#FDFBF7]">
                  Items in this Shipment ({activeOrder.items.length})
                </h3>
                <div className="space-y-2">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#061D15] border border-[#D4AF37]/15 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-[#D4AF37]/20">
                          <img
                            src={item.type === 'catalog' ? item.product?.image : item.customHamper?.basket.image}
                            alt="Hamper"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-[#FDFBF7]">
                            {item.type === 'catalog' ? item.product?.name : 'Custom Hamper'}
                          </h4>
                          <span className="text-[10px] text-[#E8DECB]/60">
                            Qty: {item.quantity} · Price: ₹{item.unitPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#F7E6A7]">
                        ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Step-by-Step Chronological Timeline (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/20">
                  <h3 className="font-display font-bold text-lg text-[#FDFBF7]">
                    Milestone Timeline
                  </h3>
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                    Real-Time Verified
                  </span>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-[#D4AF37]/20 pl-2">
                  {activeOrder.courier.trackingSteps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Milestone icon */}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.status === 'completed'
                          ? 'bg-[#D4AF37] text-[#061D15]'
                          : step.status === 'current'
                          ? 'bg-[#0E4233] border-2 border-[#D4AF37] text-[#F7E6A7] animate-pulse'
                          : 'bg-[#061D15] border border-[#D4AF37]/30 text-[#E8DECB]/40'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-current" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className={`text-xs font-bold ${
                            step.status === 'completed' || step.status === 'current'
                              ? 'text-[#FDFBF7]'
                              : 'text-[#E8DECB]/50'
                          }`}>
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-mono text-[#F7E6A7] shrink-0">
                            {step.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#E8DECB]/70 font-light mt-0.5">
                          {step.detail}
                        </p>
                        <span className="text-[10px] text-[#D4AF37]/80 block mt-0.5">
                          Location: {step.location}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Security Note */}
                <div className="mt-4 p-3 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 text-[11px] text-[#E8DECB]/80 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Delivery requires recipient OTP / digital photo handover.</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
