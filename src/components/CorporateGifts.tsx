import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Phone, 
  Truck, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight,
  Clock,
  Layers,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CATALOG_PRODUCTS } from '../data/catalog';

interface CorporateGiftsProps {
  onSelectProduct: (productId: string) => void;
  phonePrimary: string;
  phoneSecondary: string;
  deliveryTimeline: string;
}

export const CorporateGifts: React.FC<CorporateGiftsProps> = ({
  onSelectProduct,
  phonePrimary,
  phoneSecondary,
  deliveryTimeline
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [quantity, setQuantity] = useState('25');
  const [budgetPerHamper, setBudgetPerHamper] = useState('2500');
  const [selectedHamperStyle, setSelectedHamperStyle] = useState('Executive Gourmet Crate');
  const [specialRequirements, setSpecialRequirements] = useState('Custom laser-engraved company logo on wooden box & invoice receipt required.');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const corporateTiers = [
    {
      tier: 'Tier 1: Silver Guild',
      range: '10 – 25 Hampers',
      discount: '10% Corporate Credit',
      delivery: '2-3 Days Scheduled Delivery in Raipur',
      customization: 'Personalized Printed Message & Gold Seal'
    },
    {
      tier: 'Tier 2: Gold Executive',
      range: '26 – 50 Hampers',
      discount: '15% Corporate Credit',
      delivery: '2-3 Days Staggered or Batch Van Delivery',
      customization: 'Custom Color Satin Ribbon + Metal Monogram'
    },
    {
      tier: 'Tier 3: Royal Platinum',
      range: '50+ Hampers',
      discount: '20% Corporate Privilege',
      delivery: 'Direct White-Glove Van Delivery to Clients/Offices',
      customization: 'Full Custom Laser-Engraved Wooden Logo + Custom Scent'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !contactPhone) return;

    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F7E6A7', '#064E3B']
    });
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Nazrana Luxury Gifting, I would like to inquire about Corporate Hampers for ${companyName || 'our company'}. Estimated quantity: ${quantity} units. Please connect with me.`
    );
    window.open(`https://wa.me/91${phonePrimary}?text=${text}`, '_blank');
  };

  return (
    <section className="py-12 bg-[#061D15] text-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 border-b border-[#D4AF37]/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B & Executive Gifting</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
              Corporate Luxury Gifting Solutions
            </h2>
            <p className="text-sm text-[#E8DECB]/80 mt-1 max-w-2xl font-light">
              Elevate corporate relationships, festive client distributions, and executive milestones across Raipur, Chhattisgarh.
            </p>
          </div>

          {/* Quick Helplines Callout */}
          <div className="p-3.5 rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 flex items-center gap-3 text-xs">
            <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[#E8DECB]/70 text-[10px] uppercase tracking-wider block">Direct Corporate Desk:</span>
              <div className="flex items-center gap-2 font-mono font-bold text-[#F7E6A7] text-sm">
                <a href={`tel:${phonePrimary}`} className="hover:underline">{phonePrimary}</a>
                <span>/</span>
                <a href={`tel:${phoneSecondary}`} className="hover:underline">{phoneSecondary}</a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Nazrana Corporate Gifting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-[#092B21] border border-[#D4AF37]/25 space-y-2">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h4 className="font-display font-bold text-base text-[#FDFBF7]">
              Delivery in 2-3 Days
            </h4>
            <p className="text-xs text-[#E8DECB]/70 font-light">
              Automated logistics dispatch from Purani Basti, Shivaji Nagar to Civil Lines, Shankar Nagar, Devendra Nagar, and Naya Raipur.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#092B21] border border-[#D4AF37]/25 space-y-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h4 className="font-display font-bold text-base text-[#FDFBF7]">
              Custom Brand Engraving
            </h4>
            <p className="text-xs text-[#E8DECB]/70 font-light">
              Laser-etched wooden lids, corporate color satin ribbons, and bespoke CEO calligraphy greeting letters.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#092B21] border border-[#D4AF37]/25 space-y-2">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <h4 className="font-display font-bold text-base text-[#FDFBF7]">
              Corporate Invoicing
            </h4>
            <p className="text-xs text-[#E8DECB]/70 font-light">
              Official B2B invoices generated instantly with company details for clean financial accounting.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#092B21] border border-[#D4AF37]/25 space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h4 className="font-display font-bold text-base text-[#FDFBF7]">
              Luxury Quality Guarantee
            </h4>
            <p className="text-xs text-[#E8DECB]/70 font-light">
              Hand-sorted premium dry fruits, Swiss & Belgian chocolates, and fresh gourmet festive treats.
            </p>
          </div>
        </div>

        {/* Corporate Pricing Tiers */}
        <div className="mb-12">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#FDFBF7] mb-4">
            Tiered Volume Pricing & Benefits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corporateTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  idx === 1
                    ? 'bg-gradient-to-b from-[#0E4233] to-[#092B21] border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-xl'
                    : 'bg-[#092B21] border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                    {tier.tier}
                  </span>
                  <h4 className="font-display font-bold text-xl text-[#FDFBF7]">
                    {tier.range}
                  </h4>
                  <div className="mt-2 text-sm font-bold text-[#F7E6A7] font-mono">
                    {tier.discount}
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-[#E8DECB]/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{tier.delivery}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{tier.customization}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>Complimentary Sample Hamper Prior to Production</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D4AF37]/15">
                  <button
                    onClick={() => {
                      setQuantity(idx === 0 ? '20' : idx === 1 ? '35' : '75');
                      const formEl = document.getElementById('corporate-form');
                      formEl?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#061D15] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] border border-[#D4AF37]/30 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Select this Tier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Inquiry Form & Live Desk */}
        <div id="corporate-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#092B21] border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                <div>
                  <h3 className="font-display font-bold text-2xl text-[#FDFBF7]">
                    Request Corporate Proposal & Sample
                  </h3>
                  <p className="text-xs text-[#E8DECB]/70 font-light mt-0.5">
                    Our Raipur corporate manager will prepare a customized quote within 2 hours.
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-[#D4AF37]" />
              </div>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#0E4233] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-2xl text-[#FDFBF7]">
                    Proposal Request Received!
                  </h4>
                  <p className="text-xs text-[#E8DECB]/80 max-w-md mx-auto">
                    Thank you, <strong>{contactPerson}</strong>. Our Raipur Corporate Desk will call you at <strong>{contactPhone}</strong> with sample mockups and tiered pricing.
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={handleWhatsAppInquiry}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat on WhatsApp Directly</span>
                    </button>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2.5 rounded-xl bg-[#061D15] text-[#E8DECB] border border-[#D4AF37]/30 text-xs font-semibold cursor-pointer"
                    >
                      New Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#E8DECB]/80 block mb-1">Company / Organization Name: *</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Jindal Steel, Hira Group, Raipur Tech"
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[#E8DECB]/80 block mb-1">Contact Person Name: *</label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Alok Singhania (HR / Admin Lead)"
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#E8DECB]/80 block mb-1">Contact Phone: *</label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. +91 98261 XXXXX"
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[#E8DECB]/80 block mb-1">Work Email (for Official Quote):</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="e.g. admin@company.com"
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[#E8DECB]/80 block mb-1">Required Quantity:</label>
                      <input
                        type="number"
                        min="5"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-[#F7E6A7] font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[#E8DECB]/80 block mb-1">Target Budget / Hamper (₹):</label>
                      <input
                        type="number"
                        step="100"
                        value={budgetPerHamper}
                        onChange={(e) => setBudgetPerHamper(e.target.value)}
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-[#F7E6A7] font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="text-[#E8DECB]/80 block mb-1">Preferred Style:</label>
                      <select
                        value={selectedHamperStyle}
                        onChange={(e) => setSelectedHamperStyle(e.target.value)}
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3 py-2.5 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Executive Gourmet Crate">Executive Gourmet Crate</option>
                        <option value="Nazrana Classic Hamper">Nazrana Classic Hamper</option>
                        <option value="Nazrana Luxury Hamper">Nazrana Luxury Hamper</option>
                        <option value="Royal Brass Heritage Tray">Royal Brass Heritage Tray</option>
                        <option value="Bespoke Custom Hamper">Bespoke Custom Hamper</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[#E8DECB]/80 block mb-1">Special Requirements & Delivery Timeline:</label>
                    <textarea
                      rows={2}
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      placeholder="e.g. Need delivery in 2-3 days at Shivaji Nagar office, include company letterhead."
                      className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl p-3 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Corporate Inquiry</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppInquiry}
                      className="py-3.5 px-4 rounded-xl bg-[#0B3427] hover:bg-[#0E4233] text-[#25D366] border border-[#25D366]/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Instant WhatsApp Quote</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Contact & Sample Box Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Helpline Card with user's phone numbers */}
            <div className="rounded-3xl bg-[#092B21] border border-[#D4AF37]/30 p-6 shadow-xl space-y-4">
              <h4 className="font-display font-bold text-lg text-[#FDFBF7] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Nazrana Corporate Leads</span>
              </h4>
              <p className="text-xs text-[#E8DECB]/80 font-light">
                Speak directly with our Raipur atelier directors for immediate sample inspection or bulk order confirmation:
              </p>

              <div className="space-y-2.5">
                <a
                  href={`tel:${phonePrimary}`}
                  className="p-3 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 hover:border-[#D4AF37] flex items-center justify-between text-xs transition-colors cursor-pointer block"
                >
                  <div>
                    <span className="text-[10px] text-[#E8DECB]/60 block uppercase">Primary Corporate Line:</span>
                    <span className="text-sm font-mono font-bold text-[#F7E6A7]">+91 {phonePrimary}</span>
                  </div>
                  <span className="text-xs bg-[#D4AF37] text-[#061D15] px-2.5 py-1 rounded-lg font-bold">
                    Call Now
                  </span>
                </a>

                <a
                  href={`tel:${phoneSecondary}`}
                  className="p-3 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 hover:border-[#D4AF37] flex items-center justify-between text-xs transition-colors cursor-pointer block"
                >
                  <div>
                    <span className="text-[10px] text-[#E8DECB]/60 block uppercase">Secondary Atelier Line:</span>
                    <span className="text-sm font-mono font-bold text-[#F7E6A7]">+91 {phoneSecondary}</span>
                  </div>
                  <span className="text-xs bg-[#D4AF37] text-[#061D15] px-2.5 py-1 rounded-lg font-bold">
                    Call Now
                  </span>
                </a>
              </div>

              <div className="p-3 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 text-[11px] text-[#E8DECB]/80 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{deliveryTimeline} with insured transit across Raipur.</span>
              </div>
            </div>

            {/* Featured Corporate Hamper */}
            <div className="rounded-3xl bg-[#092B21] border border-[#D4AF37]/30 p-5 shadow-xl space-y-3">
              <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                Recommended Corporate Hamper
              </span>
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl bg-black/40 overflow-hidden shrink-0 border border-[#D4AF37]/30">
                  <img
                    src="/assets/aistudio/file_0000000025808211a7ecd7fb6cb102b9_0984d255.png"
                    alt="Corporate Hamper"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-display font-bold text-sm text-[#FDFBF7]">
                    Raipur Executive Gourmet Crate
                  </h5>
                  <p className="text-[11px] text-[#E8DECB]/70 mt-0.5 line-clamp-2">
                    Darjeeling second flush tea, roasted macadamia nuts, Lindt dark bar, and brass bookmark.
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs font-mono font-bold text-[#F7E6A7]">₹3,200</span>
                    <button
                      onClick={() => onSelectProduct('nazrana-corporate-executive')}
                      className="text-[11px] text-[#D4AF37] hover:underline font-semibold cursor-pointer"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
