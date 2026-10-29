import React from 'react';
import { ShoppingBag, Sparkles, MapPin, Search, User, Truck, Phone, BookOpen, Building2, Sliders } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: 'catalog' | 'builder' | 'corporate' | 'blog' | 'tracking' | 'logistics' | 'account';
  setActiveTab: (tab: 'catalog' | 'builder' | 'corporate' | 'blog' | 'tracking' | 'logistics' | 'account') => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  phonePrimary: string;
  phoneSecondary: string;
  announcementText?: string;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  phonePrimary,
  phoneSecondary,
  announcementText,
  onOpenSettings
}) => {
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#061D15]/95 backdrop-blur-md border-b border-[#D4AF37]/20 transition-all">
      {/* Top micro announcement bar with phone numbers and delivery notice */}
      <div className="bg-gradient-to-r from-[#061D15] via-[#0B2E23] to-[#061D15] py-1.5 px-4 text-center border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] sm:text-xs text-[#F7E6A7]">
          <p className="tracking-wide uppercase font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Delivery in 2-3 Days · Express Dispatch in Raipur · Diwali Festive Collection</span>
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono">
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-[10px] text-[#E8DECB]/70 uppercase">Order Helpline:</span>
              <a href={`tel:${phonePrimary}`} className="font-bold hover:underline">{phonePrimary}</a>
              <span>/</span>
              <a href={`tel:${phoneSecondary}`} className="font-bold hover:underline">{phoneSecondary}</a>
            </div>

            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="text-[10px] bg-[#0E4233] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] px-2 py-0.5 rounded border border-[#D4AF37]/30 flex items-center gap-1 cursor-pointer transition-colors"
                title="Customize phone numbers, delivery days, and site text"
              >
                <Sliders className="w-3 h-3" />
                <span>Customize Site</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (Primary action / Cart) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('catalog')}
          className="text-left group cursor-pointer shrink-0 focus:outline-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#B98E26] to-[#876511] p-[1.5px] shadow-sm flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#061D15] flex items-center justify-center">
                <span className="font-display text-lg font-bold text-[#F7E6A7]">N</span>
              </div>
            </div>
            <div>
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-[#F7E6A7] block leading-none">
                NAZRANA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A059] uppercase block font-medium mt-0.5">
                Luxury Gifting · Raipur
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'catalog'
                ? 'text-[#F7E6A7] border-b-2 border-[#D4AF37]'
                : 'text-[#E8DECB] hover:text-[#F7E6A7]'
            }`}
          >
            Gift Catalog
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'builder'
                ? 'text-[#F7E6A7] border-b-2 border-[#D4AF37]'
                : 'text-[#E8DECB] hover:text-[#F7E6A7]'
            }`}
          >
            <span>Custom Builder</span>
            <span className="text-[10px] bg-[#D4AF37]/20 text-[#F7E6A7] px-1.5 py-0.2 rounded font-semibold border border-[#D4AF37]/30">
              Drag & Drop
            </span>
          </button>
          <button
            onClick={() => setActiveTab('corporate')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'corporate'
                ? 'text-[#F7E6A7] border-b-2 border-[#D4AF37]'
                : 'text-[#E8DECB] hover:text-[#F7E6A7]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Gifts</span>
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'blog'
                ? 'text-[#F7E6A7] border-b-2 border-[#D4AF37]'
                : 'text-[#E8DECB] hover:text-[#F7E6A7]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Gifting Journal</span>
          </button>
          <button
            onClick={() => setActiveTab('logistics')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'logistics'
                ? 'text-[#F7E6A7] border-b-2 border-[#D4AF37]'
                : 'text-[#E8DECB] hover:text-[#F7E6A7]'
            }`}
          >
            Raipur Delivery
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
              activeTab === 'tracking'
                ? 'text-[#F7E6A7] border-b-2 border-[#D4AF37]'
                : 'text-[#E8DECB] hover:text-[#F7E6A7]'
            }`}
          >
            Track Order
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'account'
                ? 'text-[#F7E6A7] border-b-2 border-[#D4AF37]'
                : 'text-[#E8DECB] hover:text-[#F7E6A7]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account</span>
          </button>
        </nav>

        {/* Medium screens secondary nav condensed */}
        <div className="hidden md:flex xl:hidden items-center gap-3 text-xs font-medium">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-2 py-1 rounded ${activeTab === 'catalog' ? 'bg-[#D4AF37] text-[#061D15] font-bold' : 'text-[#E8DECB]'}`}
          >
            Catalog
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-2 py-1 rounded ${activeTab === 'builder' ? 'bg-[#D4AF37] text-[#061D15] font-bold' : 'text-[#E8DECB]'}`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab('corporate')}
            className={`px-2 py-1 rounded ${activeTab === 'corporate' ? 'bg-[#D4AF37] text-[#061D15] font-bold' : 'text-[#E8DECB]'}`}
          >
            Corporate
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-2 py-1 rounded ${activeTab === 'blog' ? 'bg-[#D4AF37] text-[#061D15] font-bold' : 'text-[#E8DECB]'}`}
          >
            Blog
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-2 py-1 rounded ${activeTab === 'tracking' ? 'bg-[#D4AF37] text-[#061D15] font-bold' : 'text-[#E8DECB]'}`}
          >
            Track
          </button>
        </div>

        {/* Zone 3: 1 Primary Action + Cart Drawer Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="px-2.5 sm:px-3 py-2 rounded-lg bg-[#0E4233] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] border border-[#D4AF37]/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
              title="Manage Products, Prices, Helplines & Offer Coupons"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Store & Coupons</span>
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#E5C365] hover:to-[#C59D3F] text-[#061D15] font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            aria-label="View Hamper Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Hamper Bag</span>
            {totalCartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#061D15] text-[#F7E6A7] text-[11px] font-bold flex items-center justify-center tabular-nums">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="md:hidden flex items-center justify-around py-2.5 px-2 bg-[#08241B] border-t border-[#D4AF37]/15 text-[11px] font-medium overflow-x-auto">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`py-1 px-2 rounded shrink-0 ${activeTab === 'catalog' ? 'text-[#F7E6A7] bg-[#061D15]' : 'text-[#E8DECB]'}`}
        >
          Catalog
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`py-1 px-2 rounded shrink-0 ${activeTab === 'builder' ? 'text-[#F7E6A7] bg-[#061D15]' : 'text-[#E8DECB]'}`}
        >
          Builder
        </button>
        <button
          onClick={() => setActiveTab('corporate')}
          className={`py-1 px-2 rounded shrink-0 ${activeTab === 'corporate' ? 'text-[#F7E6A7] bg-[#061D15]' : 'text-[#E8DECB]'}`}
        >
          Corporate
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`py-1 px-2 rounded shrink-0 ${activeTab === 'blog' ? 'text-[#F7E6A7] bg-[#061D15]' : 'text-[#E8DECB]'}`}
        >
          Blog
        </button>
        <button
          onClick={() => setActiveTab('tracking')}
          className={`py-1 px-2 rounded shrink-0 ${activeTab === 'tracking' ? 'text-[#F7E6A7] bg-[#061D15]' : 'text-[#E8DECB]'}`}
        >
          Track
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`py-1 px-2 rounded shrink-0 ${activeTab === 'account' ? 'text-[#F7E6A7] bg-[#061D15]' : 'text-[#E8DECB]'}`}
        >
          Account
        </button>
      </div>
    </header>
  );
};
