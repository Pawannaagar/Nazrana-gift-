import React from 'react';
import { MapPin, Phone, Mail, Sparkles, ShieldCheck, Clock, Truck, BookOpen, Building2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'catalog' | 'builder' | 'corporate' | 'blog' | 'tracking' | 'logistics' | 'account') => void;
  phonePrimary: string;
  phoneSecondary: string;
  deliveryTimeline: string;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  phonePrimary,
  phoneSecondary,
  deliveryTimeline
}) => {
  return (
    <footer className="bg-[#04150F] text-[#E8DECB] border-t border-[#D4AF37]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF37]/15">
          
          {/* Brand & Atelier Intro (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B98E26] p-0.5">
                <div className="w-full h-full rounded-full bg-[#04150F] flex items-center justify-center">
                  <span className="font-display font-bold text-base text-[#F7E6A7]">N</span>
                </div>
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-[#F7E6A7]">
                NAZRANA
              </span>
            </div>

            <p className="text-xs text-[#E8DECB]/80 font-light leading-relaxed max-w-sm">
              Raipur&apos;s premier luxury gifting house. Handcrafting bespoke festive baskets, imperial golden wire hampers, and gourmet dry fruit trunks. Every creation is assembled fresh upon order with customized calligraphy notes and delivered across Raipur, Chhattisgarh.
            </p>

            <div className="space-y-2 text-xs text-[#E8DECB]/90 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Nazrana Atelier, Purani Basti, Shivaji Nagar, Raipur, Chhattisgarh 492001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <div className="font-mono">
                  <a href={`tel:${phonePrimary}`} className="text-[#F7E6A7] hover:underline font-bold">+91 {phonePrimary}</a>
                  <span className="mx-1.5 text-[#D4AF37]">/</span>
                  <a href={`tel:${phoneSecondary}`} className="text-[#F7E6A7] hover:underline font-bold">+91 {phoneSecondary}</a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>concierge@nazranagifts.in</span>
              </div>
            </div>
          </div>

          {/* Quick Gifting Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#F7E6A7] uppercase tracking-wider">
              Luxury Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#F7E6A7] transition-colors cursor-pointer text-left"
                >
                  Nazrana Classic Hamper
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#F7E6A7] transition-colors cursor-pointer text-left"
                >
                  Nazrana Luxury Hamper
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('corporate')}
                  className="hover:text-[#F7E6A7] text-[#D4AF37] font-semibold transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <Building2 className="w-3 h-3" />
                  <span>Corporate Gifts</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('blog')}
                  className="hover:text-[#F7E6A7] transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Gifting Journal & Blog</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('builder')}
                  className="hover:text-[#F7E6A7] text-[#F7E6A7] font-semibold transition-colors cursor-pointer text-left"
                >
                  Custom Hamper Builder
                </button>
              </li>
            </ul>
          </div>

          {/* Raipur Delivery Hubs (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold text-[#F7E6A7] uppercase tracking-wider">
              Raipur Localities
            </h4>
            <ul className="space-y-1.5 text-xs text-[#E8DECB]/70 font-light">
              <li>Shankar Nagar (492007)</li>
              <li>VIP Road & Airport (492015)</li>
              <li>Civil Lines (492001)</li>
              <li>Pandri & Devendra Nagar (492004)</li>
              <li>Telibandha Marine Drive (492006)</li>
              <li>Samta Colony (492001)</li>
              <li>Naya Raipur / Atal Nagar (492018)</li>
              <li>Tatibandh / AIIMS (492099)</li>
            </ul>
          </div>

          {/* Logistics & Trust Badges (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-[#F7E6A7] uppercase tracking-wider">
              Logistics & Assurances
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{deliveryTimeline}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Handcrafted Luxury & Pristine Freshness</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>24/7 Gifting Concierge Helpline</span>
              </div>
            </div>

            <p className="text-[10px] text-[#E8DECB]/50 pt-1">
              Nazrana Luxury Gifting Atelier · Purani Basti, Shivaji Nagar, Raipur, Chhattisgarh
            </p>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DECB]/60">
          <p>© {new Date().getFullYear()} Nazrana Luxury Gift. Handcrafted with reverence in Raipur, Chhattisgarh.</p>
          <div className="flex items-center gap-4">
            <span>Helpline: +91 {phonePrimary} / {phoneSecondary}</span>
            <span>·</span>
            <span>UPI & Cards Secured</span>
            <span>·</span>
            <span>FSSAI Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
