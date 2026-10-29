import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Gift, 
  Phone, 
  User, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { 
  DeliveryScheduleDetails, 
  RaipurLocality 
} from '../types';
import { 
  RAIPUR_LOCALITIES, 
  COURIER_SERVICES 
} from '../data/catalog';

interface DeliverySchedulerProps {
  initialSchedule?: DeliveryScheduleDetails;
  onSaveSchedule: (schedule: DeliveryScheduleDetails) => void;
  subtotal: number;
}

export const DeliveryScheduler: React.FC<DeliverySchedulerProps> = ({
  initialSchedule,
  onSaveSchedule,
  subtotal
}) => {
  const [selectedLocality, setSelectedLocality] = useState<RaipurLocality>(() => {
    if (initialSchedule) {
      const found = RAIPUR_LOCALITIES.find(l => l.name === initialSchedule.locality);
      if (found) return found;
    }
    return RAIPUR_LOCALITIES[0]; // Shankar Nagar
  });

  const [addressLine, setAddressLine] = useState(initialSchedule?.addressLine || 'Flat 402, Royal Palms, Shankar Nagar');
  const [landmark, setLandmark] = useState(initialSchedule?.landmark || 'Near Ashoka Millenium');
  const [recipientName, setRecipientName] = useState(initialSchedule?.recipientName || 'Shalini Dewangan');
  const [recipientPhone, setRecipientPhone] = useState(initialSchedule?.recipientPhone || '+91 98271 63820');

  // Dates: Today, Tomorrow, Day After, or Custom
  const todayStr = new Date().toISOString().split('T')[0];
  const [deliveryDate, setDeliveryDate] = useState<string>(initialSchedule?.deliveryDate || todayStr);
  const [timeSlot, setTimeSlot] = useState<string>(
    initialSchedule?.timeSlot || 'Evening Prime (05:00 PM - 08:30 PM)'
  );
  const [deliveryType, setDeliveryType] = useState<'Standard Scheduled (2-3 Days)' | 'Express Same-Day' | 'Midnight Surprise'>(
    initialSchedule?.deliveryType || 'Standard Scheduled (2-3 Days)'
  );
  const [selectedCourier, setSelectedCourier] = useState<string>(
    initialSchedule?.courierPartner || 'Raipur Standard Delivery'
  );
  const [isGiftSurprise, setIsGiftSurprise] = useState<boolean>(
    initialSchedule?.isGiftSurprise ?? true
  );
  const [specialInstructions, setSpecialInstructions] = useState<string>(
    initialSchedule?.specialInstructions || 'Please ring the doorbell softly. Anniversary surprise!'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const timeSlots = [
    { label: 'Morning Slot', time: '09:00 AM - 01:00 PM', desc: 'Fresh morning dispatch' },
    { label: 'Afternoon Slot', time: '01:00 PM - 05:00 PM', desc: 'Convenient home delivery' },
    { label: 'Evening Prime', time: '05:00 PM - 08:30 PM', desc: 'Ideal for family gatherings' },
    { label: 'Midnight Surprise', time: '11:15 PM - 12:00 AM', desc: 'Birthday / Anniversary surprise' }
  ];

  const handleLocalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locName = e.target.value;
    const found = RAIPUR_LOCALITIES.find(l => l.name === locName);
    if (found) {
      setSelectedLocality(found);
    }
  };

  const currentCourier = COURIER_SERVICES.find(c => c.name === selectedCourier) || COURIER_SERVICES[0];
  const isFreeDelivery = subtotal >= 7999;
  const distanceFee = Math.round(selectedLocality.distanceKm * 15);
  const courierFee = isFreeDelivery ? 0 : distanceFee + (currentCourier.id === 'raipur-standard' ? 0 : currentCourier.baseFee);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !recipientPhone.trim() || !addressLine.trim()) {
      alert('Please fill all mandatory recipient and address fields.');
      return;
    }

    const scheduleData: DeliveryScheduleDetails = {
      city: 'Raipur, Chhattisgarh',
      locality: selectedLocality.name,
      pincode: selectedLocality.pincode,
      addressLine,
      landmark,
      recipientName,
      recipientPhone,
      deliveryDate,
      timeSlot,
      deliveryType,
      courierPartner: currentCourier.name as any,
      courierFee,
      distanceKm: selectedLocality.distanceKm,
      hasFreeGift: subtotal >= 7999,
      isGiftSurprise,
      specialInstructions
    };

    onSaveSchedule(scheduleData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <section className="py-10 bg-[#061D15] text-[#F7F1E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 border-b border-[#D4AF37]/20 pb-6">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Automated Logistics & Delivery Hub</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
            Raipur, Chhattisgarh Delivery Scheduling
          </h2>
          <p className="text-sm text-[#E8DECB]/80 mt-1 max-w-2xl font-light">
            Exclusively tailored for Raipur metropolitan & Naya Raipur districts. Automated courier dispatch with real-time route optimization.
          </p>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Locality, Address & Recipient (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Raipur Locality Card */}
            <div className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-[#FDFBF7] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Raipur Delivery Destination</span>
                </h3>
                <span className="text-[11px] bg-[#0E4233] text-[#F7E6A7] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  Chhattisgarh PIN Only
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#E8DECB]/80 block mb-1">
                    Select Raipur Locality:
                  </label>
                  <select
                    value={selectedLocality.name}
                    onChange={handleLocalityChange}
                    className="w-full bg-[#061D15] border border-[#D4AF37]/40 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {RAIPUR_LOCALITIES.map(loc => (
                      <option key={loc.name} value={loc.name}>
                        {loc.name} ({loc.pincode})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#E8DECB]/80 block mb-1">
                    Postal Code (Raipur Hub):
                  </label>
                  <input
                    type="text"
                    disabled
                    value={selectedLocality.pincode}
                    className="w-full bg-[#061D15]/60 border border-[#D4AF37]/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#F7E6A7] font-mono cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Locality Transit Insight with 15/km Calculation */}
              <div className="p-3 rounded-xl bg-[#061D15] border border-[#D4AF37]/30 text-xs text-[#E8DECB]/90 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Zone: <strong>{selectedLocality.zone}</strong></span>
                  </div>
                  <span className="text-[#F7E6A7] font-mono font-bold text-xs">
                    {selectedLocality.distanceKm} km from Purani Basti Atelier
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#E8DECB]/70 pt-1 border-t border-[#D4AF37]/15">
                  <span>Delivery Charge: <strong>₹{selectedLocality.distanceKm * 15}</strong> (@ ₹15/km)</span>
                  <span className="text-emerald-400 font-semibold">
                    {subtotal >= 7999 ? 'FREE (Unlocked!)' : 'Free on ₹7,999+'}
                  </span>
                </div>
              </div>

              {/* Street address */}
              <div>
                <label className="text-xs text-[#E8DECB]/80 block mb-1">
                  House / Flat No., Society / Street Address: <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="e.g. Bungalow 12, Lotus Greens, Shankar Nagar"
                  className="w-full bg-[#061D15] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="text-xs text-[#E8DECB]/80 block mb-1">
                  Notable Landmark in Raipur:
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Marine Drive, Telibandha / Magneto Mall"
                  className="w-full bg-[#061D15] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Recipient Details */}
            <div className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-5 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-lg text-[#FDFBF7] flex items-center gap-2">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>Recipient & Surprise Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#E8DECB]/80 block mb-1">
                    Recipient Full Name: <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Shalini Dewangan"
                    className="w-full bg-[#061D15] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#E8DECB]/80 block mb-1">
                    Recipient Phone (for Courier OTP): <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+91 98271 XXXXX"
                    className="w-full bg-[#061D15] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Surprise gift toggle */}
              <div className="p-3 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="text-xs font-semibold text-[#FDFBF7] block">
                      Secret Surprise Gifting
                    </span>
                    <span className="text-[11px] text-[#E8DECB]/70">
                      We will omit price tags and receipts from the parcel.
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isGiftSurprise}
                  onChange={(e) => setIsGiftSurprise(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                />
              </div>

              {/* Special instructions */}
              <div>
                <label className="text-xs text-[#E8DECB]/80 block mb-1">
                  Courier Special Instructions:
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Ring bell gently, hand over to security if unavailable"
                  className="w-full bg-[#061D15] border border-[#D4AF37]/40 rounded-xl p-2.5 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Time Slot & Major Couriers Integration (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Delivery Date & Time Slot */}
            <div className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-5 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-lg text-[#FDFBF7] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Automated Slot Scheduling</span>
              </h3>

              <div>
                <label className="text-xs text-[#E8DECB]/80 block mb-1.5">
                  Scheduled Delivery Date:
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  min={todayStr}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-[#061D15] border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#F7E6A7] font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-[#E8DECB]/80 block mb-2">
                  Select Raipur Delivery Window:
                </label>
                <div className="space-y-2">
                  {timeSlots.map(slot => (
                    <div
                      key={slot.label}
                      onClick={() => setTimeSlot(slot.time)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        timeSlot === slot.time
                          ? 'bg-[#0E4233] border-[#D4AF37] text-[#F7E6A7]'
                          : 'bg-[#061D15] border-[#D4AF37]/20 hover:border-[#D4AF37]/40 text-[#E8DECB]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold">{slot.label}</div>
                        <div className="text-[11px] text-[#E8DECB]/70 font-mono">{slot.time}</div>
                      </div>
                      {timeSlot === slot.time && (
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Raipur Logistics Fleet */}
            <div className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-lg text-[#FDFBF7] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Raipur Logistics Fleet</span>
                </h3>
                <span className="text-[10px] text-[#D4AF37] font-semibold uppercase">Raipur Dedicated</span>
              </div>
              <p className="text-xs text-[#E8DECB]/70 font-light">
                Direct dispatch from our Raipur atelier with temperature protection and live route telemetry.
              </p>

              <div className="space-y-2.5">
                {COURIER_SERVICES.map(courier => (
                  <div
                    key={courier.id}
                    onClick={() => setSelectedCourier(courier.name)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedCourier === courier.name
                        ? 'bg-[#0E4233] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                        : 'bg-[#061D15] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs sm:text-sm font-semibold text-[#FDFBF7]">
                        {courier.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#F7E6A7]">
                        {courier.baseFee === 0 ? 'FREE' : (subtotal >= 1999 ? 'FREE' : `₹${courier.baseFee}`)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#E8DECB]/70">
                      {courier.description}
                    </p>
                    <div className="flex items-center justify-between text-[10px] mt-2 text-[#D4AF37]">
                      <span>{courier.sla}</span>
                      <span className="text-emerald-400 font-medium">★ {courier.rating} rating</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit / Save action */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Raipur Delivery Schedule</span>
              </button>

              {savedSuccess && (
                <div className="p-2.5 rounded-lg bg-[#0E4233] border border-[#D4AF37] text-center text-xs text-[#F7E6A7] animate-fade-in">
                  ✓ Delivery schedule confirmed for {selectedLocality.name}, Raipur!
                </div>
              )}
            </div>

          </div>

        </form>

      </div>
    </section>
  );
};
