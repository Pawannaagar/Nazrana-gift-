import React, { useState } from 'react';
import { Sparkles, ArrowRight, Clock, MapPin, CheckCircle2, Tag } from 'lucide-react';
import { RAIPUR_LOCALITIES } from '../data/catalog';

interface HeroProps {
  onOpenBuilder: () => void;
  onExploreCatalog: () => void;
  onSelectProduct: (productId: string) => void;
  deliveryTimeline: string;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBuilder,
  onExploreCatalog,
  onSelectProduct,
  deliveryTimeline
}) => {
  const [pincodeQuery, setPincodeQuery] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ matched: boolean; locality?: string; message: string } | null>(null);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeQuery.trim()) return;
    const clean = pincodeQuery.trim().toLowerCase();
    const found = RAIPUR_LOCALITIES.find(
      loc => loc.pincode === clean || loc.name.toLowerCase().includes(clean)
    );
    if (found) {
      setPincodeResult({
        matched: true,
        locality: found.name,
        message: `✓ Yes! Delivery available in ${found.name} (${found.pincode}) within ${deliveryTimeline}.`
      });
    } else if (clean.startsWith('492')) {
      setPincodeResult({
        matched: true,
        message: `✓ Yes! Raipur postal sector ${clean} is serviced by our local delivery fleet.`
      });
    } else {
      setPincodeResult({
        matched: false,
        message: `Notice: Nazrana exclusively provides premium direct delivery within Raipur, Chhattisgarh (PIN 492001 - 492099).`
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#061D15] via-[#092B21] to-[#061D15] border-b border-[#D4AF37]/25 pt-6 pb-16 lg:py-16">
      
      {/* Background Diwali Palace Imagery with warm lighting */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <img
          src="/src/assets/images/diwali_hero_banner_1793258962956.jpg"
          alt="Diwali Palace Illumination"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061D15]/90 via-[#061D15]/80 to-[#061D15]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Festive Diwali Coupon Ribbon */}
        <div className="mb-6 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-[#D4AF37]/25 via-[#B98E26]/40 to-[#D4AF37]/25 border border-[#D4AF37]/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-center gap-2 text-[#F7E6A7]">
            <span className="text-base">🪔</span>
            <strong className="font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
              Diwali Special Festive Offer:
            </strong>
            <span className="hidden sm:inline text-[#E8DECB]/90">
              Celebrate with royal hampers & brass diyas across Raipur!
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#E8DECB]/80 text-[11px]">Use Code:</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-[#061D15] text-[#F7E6A7] font-mono font-bold text-xs border border-[#D4AF37]/60 tracking-wider">
              DIWALI2026
            </span>
            <span className="text-emerald-400 font-semibold text-[11px]">Flat ₹300 OFF</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Call-to-Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B3427] border border-[#D4AF37]/40 text-xs font-semibold text-[#F7E6A7]">
              <span>🪔</span>
              <span>Shubh Deepavali Collection · Exclusively Serving Raipur, CG</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FDFBF7] leading-[1.12]">
              Celebrate the Warmth of <br />
              <span className="gold-gradient-text italic font-serif">Diwali Luxury</span>, Handcrafted for Raipur.
            </h1>

            <p className="text-[#E8DECB]/90 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
              Illuminate relationships with bespoke festive hampers. Featuring our signature <strong className="text-[#F7E6A7] font-medium">Diwali Classic Hamper (₹1,299)</strong> and the royal <strong className="text-[#F7E6A7] font-medium">Shubh Deepavali Luxury Hamper (₹2,499)</strong>, along with handcrafted brass diyas, California dry fruits, and custom calligraphy cards delivered across Raipur.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                onClick={onOpenBuilder}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C59D3F] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] font-bold text-sm sm:text-base shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Design Custom Hamper</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 rounded-xl bg-[#0B3427]/80 hover:bg-[#0E4233] text-[#F7E6A7] border border-[#D4AF37]/40 font-semibold text-sm sm:text-base transition-all cursor-pointer text-center"
              >
                Browse Diwali Catalog
              </button>
            </div>

            {/* Raipur Locality / Pincode Quick Checker */}
            <div className="pt-4 border-t border-[#D4AF37]/15">
              <p className="text-xs text-[#E8DECB]/80 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Check Delivery Slot in Your Raipur Locality</span>
              </p>
              <form onSubmit={handleCheckPincode} className="flex max-w-md gap-2">
                <input
                  type="text"
                  placeholder="Enter Raipur locality or PIN (e.g. Shankar Nagar, 492001)"
                  value={pincodeQuery}
                  onChange={(e) => setPincodeQuery(e.target.value)}
                  className="flex-1 bg-[#061D15] border border-[#D4AF37]/30 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-[#F7F1E5] placeholder-[#E8DECB]/40 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#F7E6A7] border border-[#D4AF37]/50 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {pincodeResult && (
                <div className={`mt-2.5 text-xs p-2.5 rounded-lg border flex items-start gap-2 ${
                  pincodeResult.matched 
                    ? 'bg-[#0E4233]/70 border-[#D4AF37]/40 text-[#F7E6A7]' 
                    : 'bg-red-950/40 border-red-800/40 text-amber-200'
                }`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#D4AF37] mt-0.5" />
                  <span>{pincodeResult.message}</span>
                </div>
              )}
            </div>

            {/* Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#E8DECB]/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>₹15/km Delivery (Purani Basti Hub)</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Buy ₹7,999+ Get Free Delivery & 4-Pack Ferrero Rocher</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Tag className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>DIWALI2026: ₹300 OFF at Checkout</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visuals displaying Signature Hampers */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            
            {/* Hamper Card 1: Nazrana Premium Hamper (New Featured) */}
            <div 
              onClick={() => onSelectProduct('nazrana-premium-hamper')}
              className="group cursor-pointer rounded-2xl bg-gradient-to-b from-[#144435] to-[#072017] p-2.5 border-2 border-[#D4AF37] shadow-2xl hover:border-[#F7E6A7] transition-all hover:-translate-y-1 relative"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40">
                <img
                  src="/public/assets/aistudio/file_00000000f2f08211a9126fdc06952e91_662cd374.png"
                  alt="Nazrana Premium Hamper - Thoughtful Gifts"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-[#D4AF37] text-[#061D15] text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow">
                  PREMIUM DIWALI
                </div>
                <div className="absolute bottom-2 right-2 bg-[#D4AF37] text-[#061D15] text-xs font-bold px-2 py-0.5 rounded shadow">
                  ₹1,299
                </div>
              </div>
              <div className="p-2 text-left">
                <h3 className="font-display font-bold text-sm text-[#FDFBF7] truncate group-hover:text-[#F7E6A7]">
                  Nazrana Premium Hamper
                </h3>
                <p className="text-[11px] text-[#E8DECB]/70 truncate mt-0.5">
                  Silk, Cashew, Badam, Cookies, Roseberry & Coke
                </p>
              </div>
            </div>

            {/* Hamper Card 2: Nazrana Luxury Hamper */}
            <div 
              onClick={() => onSelectProduct('nazrana-luxury-hamper')}
              className="group cursor-pointer rounded-2xl bg-gradient-to-b from-[#0F392B] to-[#072017] p-2.5 border border-[#D4AF37]/50 shadow-xl hover:border-[#D4AF37] transition-all hover:-translate-y-1 relative"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/40">
                <img
                  src="/assets/aistudio/file_0000000025808211a7ecd7fb6cb102b9_0984d255.png"
                  alt="Nazrana Luxury Hamper - Royal Golden Wire Basket"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-[#D4AF37] text-[#061D15] text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  SHUBH DEEPAVALI LUXE
                </div>
                <div className="absolute bottom-2 right-2 bg-[#D4AF37] text-[#061D15] text-xs font-bold px-2 py-0.5 rounded shadow">
                  ₹2,499
                </div>
              </div>
              <div className="p-2 text-left">
                <h3 className="font-display font-bold text-sm text-[#FDFBF7] truncate group-hover:text-[#F7E6A7]">
                  Nazrana Luxury Hamper
                </h3>
                <p className="text-[11px] text-[#E8DECB]/70 truncate mt-0.5">
                  10 Imperial Items · Gold Wire Basket
                </p>
              </div>
            </div>

            {/* Diwali Promo Banner Card below */}
            <div className="sm:col-span-2 rounded-2xl bg-gradient-to-r from-[#0B2E23] via-[#0E4233] to-[#0B2E23] p-3 border border-[#D4AF37]/45 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-base">🪔</span>
                <div>
                  <span className="text-[#F7E6A7] font-bold block text-xs">Diwali Delivery: ₹15 / km across Raipur</span>
                  <span className="text-[#E8DECB]/80 text-[10px]">Purani Basti, Shivaji Nagar Hub · 2-3 Days Doorstep</span>
                </div>
              </div>
              <span className="text-[#061D15] font-bold text-[11px] bg-gradient-to-r from-[#D4AF37] to-[#F5DF9A] px-3 py-1 rounded-lg shadow whitespace-nowrap">
                Orders ₹7,999+: FREE Delivery + 4-Pack Ferrero Rocher
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
