import React, { useState } from 'react';
import { 
  Sparkles, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Gift, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  BasketBase, 
  BuilderItem, 
  RibbonOption, 
  FragranceOption, 
  CustomHamper 
} from '../types';
import { 
  BASKET_BASES, 
  BUILDER_ITEMS, 
  RIBBON_OPTIONS, 
  FRAGRANCE_OPTIONS 
} from '../data/catalog';

interface HamperBuilderProps {
  onAddCustomHamperToCart: (customHamper: CustomHamper) => void;
  initialBasketId?: string;
  initialItems?: string[];
}

export const HamperBuilder: React.FC<HamperBuilderProps> = ({
  onAddCustomHamperToCart,
  initialBasketId,
  initialItems
}) => {
  const [selectedBasket, setSelectedBasket] = useState<BasketBase>(() => {
    if (initialBasketId) {
      const found = BASKET_BASES.find(b => b.id === initialBasketId);
      if (found) return found;
    }
    return BASKET_BASES[1]; // Royal golden wire hamper
  });

  const [basketItems, setBasketItems] = useState<{ item: BuilderItem; count: number }[]>(() => {
    if (initialItems && initialItems.length > 0) {
      const list: { item: BuilderItem; count: number }[] = [];
      initialItems.forEach(name => {
        const found = BUILDER_ITEMS.find(bi => bi.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(bi.name.toLowerCase()));
        if (found) {
          list.push({ item: found, count: 1 });
        }
      });
      if (list.length > 0) return list;
    }
    return [
      { item: BUILDER_ITEMS[4], count: 1 }, // Jumbo cashews
      { item: BUILDER_ITEMS[8], count: 1 }, // Dairy Milk Silk
      { item: BUILDER_ITEMS[9], count: 1 }, // Ferrero Rocher
      { item: BUILDER_ITEMS[1], count: 1 }  // Date Bites
    ];
  });

  const [selectedRibbon, setSelectedRibbon] = useState<RibbonOption>(RIBBON_OPTIONS[1]); // Gold zari
  const [selectedFragrance, setSelectedFragrance] = useState<FragranceOption>(FRAGRANCE_OPTIONS[0]);
  const [recipientName, setRecipientName] = useState('Priya & Aman Sharma');
  const [senderName, setSenderName] = useState('Vikram & Family');
  const [giftCardMessage, setGiftCardMessage] = useState(
    'Shubh Deepavali! May the auspicious festival of lights bring boundless joy, prosperity, and golden blessings to your family.'
  );
  const [calligraphyStyle, setCalligraphyStyle] = useState<'Royal Script' | 'Modern Serif' | 'Traditional Hindi/English'>('Royal Script');

  const [itemCategoryFilter, setItemCategoryFilter] = useState<'all' | 'sweets' | 'dryfruits' | 'chocolates' | 'savories' | 'beverages' | 'keepsakes'>('all');
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeStep, setActiveStep] = useState<'items' | 'basket' | 'finishing'>('items');

  const totalUnitsUsed = basketItems.reduce((acc, curr) => acc + (curr.item.units * curr.count), 0);
  const isOverCapacity = totalUnitsUsed > selectedBasket.maxUnits;
  const itemsSubtotal = basketItems.reduce((acc, curr) => acc + (curr.item.price * curr.count), 0);
  const totalWeightGrams = basketItems.reduce((acc, curr) => acc + (curr.item.weightGrams * curr.count), 0) + 400;
  const hamperTotalPrice = selectedBasket.price + itemsSubtotal;

  const handleDragStart = (e: React.DragEvent, item: BuilderItem) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    try {
      const data = e.dataTransfer.getData('text/plain');
      if (data) {
        const droppedItem: BuilderItem = JSON.parse(data);
        addItemToBasket(droppedItem);
      }
    } catch (err) {
      console.error('Drop parse error', err);
    }
  };

  const addItemToBasket = (item: BuilderItem) => {
    setBasketItems(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p => p.item.id === item.id ? { ...p, count: p.count + 1 } : p);
      }
      return [...prev, { item, count: 1 }];
    });
  };

  const removeItemFromBasket = (itemId: string) => {
    setBasketItems(prev => prev.filter(p => p.item.id !== itemId));
  };

  const updateItemCount = (itemId: string, delta: number) => {
    setBasketItems(prev => {
      return prev.map(p => {
        if (p.item.id === itemId) {
          const newCount = p.count + delta;
          return newCount > 0 ? { ...p, count: newCount } : null;
        }
        return p;
      }).filter(Boolean) as { item: BuilderItem; count: number }[];
    });
  };

  const handleClearBasket = () => {
    setBasketItems([]);
  };

  const handleSaveAndAddToCart = () => {
    if (basketItems.length === 0) {
      alert('Please add at least 1 delicacy to your hamper basket before proceeding.');
      return;
    }

    const customHamper: CustomHamper = {
      id: `custom-hamper-${Date.now()}`,
      basket: selectedBasket,
      items: basketItems,
      ribbon: selectedRibbon,
      fragrance: selectedFragrance,
      giftCardMessage,
      recipientName,
      senderName,
      calligraphyStyle,
      totalPrice: hamperTotalPrice,
      totalWeightGrams
    };

    onAddCustomHamperToCart(customHamper);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#F7E6A7', '#B98E26', '#FFD700']
    });
  };

  const filteredCatalogItems = BUILDER_ITEMS.filter(item => {
    if (itemCategoryFilter === 'all') return true;
    return item.category === itemCategoryFilter;
  });

  return (
    <section className="py-10 bg-[#061D15] text-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 border-b border-[#D4AF37]/20 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-2">
                <span>🪔</span>
                <span>Diwali Atelier Interactive Experience</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
                Drag-and-Drop Luxury Hamper Builder
              </h2>
              <p className="text-sm text-[#E8DECB]/80 mt-1 max-w-2xl font-light">
                Handpick your festive basket base, drag Diwali sweets, dry fruits, chocolates, and brass diyas directly into the hamper, customize satin ribbons, and write your calligraphy card.
              </p>
            </div>

            {/* Quick step tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#092B21] rounded-xl border border-[#D4AF37]/30 self-start md:self-auto">
              <button
                onClick={() => setActiveStep('items')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeStep === 'items'
                    ? 'bg-[#D4AF37] text-[#061D15] font-semibold shadow'
                    : 'text-[#E8DECB] hover:text-[#F7E6A7]'
                }`}
              >
                1. Select Treats & Diyas
              </button>
              <button
                onClick={() => setActiveStep('basket')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeStep === 'basket'
                    ? 'bg-[#D4AF37] text-[#061D15] font-semibold shadow'
                    : 'text-[#E8DECB] hover:text-[#F7E6A7]'
                }`}
              >
                2. Basket Base ({selectedBasket.name.split(' ')[0]})
              </button>
              <button
                onClick={() => setActiveStep('finishing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeStep === 'finishing'
                    ? 'bg-[#D4AF37] text-[#061D15] font-semibold shadow'
                    : 'text-[#E8DECB] hover:text-[#F7E6A7]'
                }`}
              >
                3. Ribbon & Card
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Catalog + Center Interactive Hamper Canvas + Right Live Price Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Gourmet Treats Pantry (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Step 1: Ingredient Catalog */}
            {activeStep === 'items' && (
              <div className="rounded-2xl bg-[#092B21]/90 border border-[#D4AF37]/25 p-4 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-bold text-lg text-[#FDFBF7] flex items-center gap-2">
                    <span>Festive Inclusions</span>
                    <span className="text-[11px] text-[#E8DECB]/60 font-sans font-normal">
                      (Drag or tap &apos;+&apos; to pack)
                    </span>
                  </h3>
                  <span className="text-[11px] text-[#D4AF37] font-medium">Diwali Collection</span>
                </div>

                {/* Subcategory tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-3 scrollbar-none">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'dryfruits', label: 'Dry Fruits' },
                    { id: 'chocolates', label: 'Chocolates' },
                    { id: 'sweets', label: 'Mithai' },
                    { id: 'savories', label: 'Savories' },
                    { id: 'beverages', label: 'Beverages' },
                    { id: 'keepsakes', label: 'Diyas & Decor' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setItemCategoryFilter(tab.id as any)}
                      className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                        itemCategoryFilter === tab.id
                          ? 'bg-[#D4AF37] text-[#061D15] font-bold'
                          : 'bg-[#061D15] text-[#E8DECB]/80 hover:text-[#F7E6A7]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Grid of builder items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {filteredCatalogItems.map(item => {
                    const inBasket = basketItems.find(p => p.item.id === item.id);
                    return (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        className="group relative p-2.5 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all cursor-grab active:cursor-grabbing hover:bg-[#0B3427] flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">
                            {item.iconEmoji}
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-xs font-medium text-[#FDFBF7] truncate">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-1.5 text-[11px] text-[#E8DECB]/70 font-mono mt-0.5">
                              <span className="text-[#F7E6A7] font-semibold">₹{item.price}</span>
                              <span>·</span>
                              <span>{item.weightGrams}g</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => addItemToBasket(item)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                            inBasket 
                              ? 'bg-[#D4AF37] text-[#061D15]' 
                              : 'bg-[#0E4233] hover:bg-[#D4AF37] text-[#F7E6A7] hover:text-[#061D15]'
                          }`}
                          title="Add to basket"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Basket Bases */}
            {activeStep === 'basket' && (
              <div className="rounded-2xl bg-[#092B21]/90 border border-[#D4AF37]/25 p-4 shadow-xl space-y-3">
                <h3 className="font-display font-bold text-lg text-[#FDFBF7]">
                  Choose Hamper Base
                </h3>
                <p className="text-xs text-[#E8DECB]/70 font-light">
                  Select the structural base for your gift hamper.
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {BASKET_BASES.map(basket => (
                    <div
                      key={basket.id}
                      onClick={() => setSelectedBasket(basket)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                        selectedBasket.id === basket.id
                          ? 'bg-[#0E4233] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                          : 'bg-[#061D15] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-lg bg-black/40 overflow-hidden shrink-0 border border-[#D4AF37]/30">
                        <img 
                          src={basket.image} 
                          alt={basket.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#FDFBF7] truncate">
                            {basket.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-[#F7E6A7]">
                            ₹{basket.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#E8DECB]/70 mt-0.5 line-clamp-1">
                          {basket.material} · {basket.dimensions}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-[#D4AF37]">
                          <span>Max Capacity: {basket.maxUnits} units</span>
                          {selectedBasket.id === basket.id && (
                            <span className="ml-auto font-bold flex items-center gap-1 text-emerald-400">
                              <Check className="w-3 h-3" /> Selected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Ribbon & Calligraphy Card */}
            {activeStep === 'finishing' && (
              <div className="rounded-2xl bg-[#092B21]/90 border border-[#D4AF37]/25 p-4 shadow-xl space-y-4">
                <h3 className="font-display font-bold text-lg text-[#FDFBF7]">
                  Ribbon, Fragrance & Calligraphy Card
                </h3>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2">
                    Satin Ribbon Color:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RIBBON_OPTIONS.map(ribbon => (
                      <button
                        key={ribbon.id}
                        onClick={() => setSelectedRibbon(ribbon)}
                        className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          selectedRibbon.id === ribbon.id
                            ? 'bg-[#0E4233] border-[#D4AF37]'
                            : 'bg-[#061D15] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <span 
                          className="w-4 h-4 rounded-full border border-white/40 shrink-0 shadow-sm"
                          style={{ backgroundColor: ribbon.colorHex }}
                        />
                        <span className="text-[11px] text-[#E8DECB] truncate font-medium">
                          {ribbon.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2">
                    Auspicious Fragrance Mist:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FRAGRANCE_OPTIONS.map(scent => (
                      <button
                        key={scent.id}
                        onClick={() => setSelectedFragrance(scent)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          selectedFragrance.id === scent.id
                            ? 'bg-[#0E4233] border-[#D4AF37]'
                            : 'bg-[#061D15] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <div className="text-[11px] font-medium text-[#FDFBF7] truncate">
                          {scent.name}
                        </div>
                        <div className="text-[10px] text-[#E8DECB]/60 truncate">
                          {scent.notes}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calligraphy Card Inputs */}
                <div className="pt-2 border-t border-[#D4AF37]/15 space-y-2.5">
                  <label className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Diwali Greeting Calligraphy Note:
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-[#E8DECB]/70 block mb-1">To (Recipient):</span>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#E8DECB]/70 block mb-1">From (Sender):</span>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#E8DECB]/70 block mb-1">Message:</span>
                    <textarea
                      rows={3}
                      value={giftCardMessage}
                      onChange={(e) => setGiftCardMessage(e.target.value)}
                      className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg p-2.5 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* CENTER COLUMN: Interactive 3D-styled Hamper Basket Canvas (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-3xl p-5 border-2 transition-all flex flex-col justify-between min-h-[480px] shadow-2xl ${
                isDragOver
                  ? 'bg-[#0F4B39] border-[#D4AF37] scale-[1.01]'
                  : 'bg-gradient-to-b from-[#0B3427] to-[#061D15] border-[#D4AF37]/40'
              }`}
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none opacity-20">
                <img
                  src={selectedBasket.image}
                  alt={selectedBasket.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter blur-[2px]"
                />
              </div>

              {/* Basket Top Bar */}
              <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[#D4AF37]/25">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                    Diwali Basket Canvas
                  </span>
                  <h3 className="font-display font-bold text-base text-[#FDFBF7]">
                    {selectedBasket.name}
                  </h3>
                </div>

                {basketItems.length > 0 && (
                  <button
                    onClick={handleClearBasket}
                    className="p-1.5 rounded-lg text-[#E8DECB]/60 hover:text-red-400 hover:bg-black/30 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                    title="Empty Basket"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              {/* Capacity & Weight Meters */}
              <div className="relative z-10 my-3 p-3 rounded-xl bg-[#061D15]/80 border border-[#D4AF37]/20 backdrop-blur-sm">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#E8DECB]/80">Capacity Used:</span>
                  <span className={`font-mono font-bold ${isOverCapacity ? 'text-red-400' : 'text-[#F7E6A7]'}`}>
                    {totalUnitsUsed} / {selectedBasket.maxUnits} units
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isOverCapacity
                        ? 'bg-red-500'
                        : 'bg-gradient-to-r from-[#D4AF37] to-[#B98E26]'
                    }`}
                    style={{ width: `${Math.min(100, (totalUnitsUsed / selectedBasket.maxUnits) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#E8DECB]/70 mt-2">
                  <span>Gross Weight: <strong className="text-[#F7E6A7] font-mono">{(totalWeightGrams / 1000).toFixed(2)} kg</strong></span>
                  <span>Ribbon: <strong className="text-[#F7E6A7]">{selectedRibbon.accent}</strong></span>
                </div>
              </div>

              {/* Drop Area / Packed Items List */}
              <div className="relative z-10 flex-1 overflow-y-auto space-y-2 py-2 max-h-[260px] pr-1">
                {basketItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#D4AF37]/30 rounded-2xl bg-black/20">
                    <Gift className="w-10 h-10 text-[#D4AF37]/50 mb-2 animate-bounce" />
                    <p className="text-xs sm:text-sm text-[#F7E6A7] font-medium">
                      Your Hamper is Currently Empty
                    </p>
                    <p className="text-[11px] text-[#E8DECB]/60 mt-1 max-w-[200px]">
                      Drag treats from the pantry or tap the &apos;+&apos; button to place items inside.
                    </p>
                  </div>
                ) : (
                  basketItems.map(({ item, count }) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-xl bg-[#061D15]/90 border border-[#D4AF37]/25 flex items-center justify-between gap-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xl">{item.iconEmoji}</span>
                        <div className="min-w-0">
                          <h5 className="text-xs text-[#FDFBF7] truncate font-medium">{item.name}</h5>
                          <span className="text-[10px] text-[#F7E6A7] font-mono">₹{item.price * count}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => updateItemCount(item.id, -1)}
                          className="w-5 h-5 rounded bg-[#092B21] hover:bg-[#D4AF37] hover:text-[#061D15] flex items-center justify-center text-xs cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-xs font-mono font-bold w-4 text-center">{count}</span>
                        <button
                          onClick={() => updateItemCount(item.id, 1)}
                          className="w-5 h-5 rounded bg-[#092B21] hover:bg-[#D4AF37] hover:text-[#061D15] flex items-center justify-center text-xs cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                        <button
                          onClick={() => removeItemFromBasket(item.id)}
                          className="text-[#E8DECB]/40 hover:text-red-400 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Live Handwritten Card Miniature Preview */}
              <div className="relative z-10 mt-3 p-3 rounded-xl bg-[#F7F1E5] text-[#061D15] shadow-md border border-[#D4AF37]">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#876511] tracking-wider mb-1">
                  <span>🪔 Shubh Deepavali Greeting</span>
                  <span>Calligraphy</span>
                </div>
                <div className="font-display italic text-xs leading-snug">
                  &ldquo;{giftCardMessage.slice(0, 95)}...&rdquo;
                </div>
                <div className="flex items-center justify-between text-[10px] mt-1.5 font-sans font-semibold text-[#876511]">
                  <span>To: {recipientName}</span>
                  <span>From: {senderName}</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Real-Time Pricing (No GST line items) & Add to Cart (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-2xl bg-[#092B21]/90 border border-[#D4AF37]/30 p-5 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-lg text-[#FDFBF7] border-b border-[#D4AF37]/20 pb-3">
                Live Hamper Tally
              </h3>

              <div className="space-y-2 text-xs text-[#E8DECB]/90">
                <div className="flex justify-between">
                  <span>Hamper Base ({selectedBasket.name.split(' ')[0]}):</span>
                  <span className="font-mono text-[#F7E6A7]">₹{selectedBasket.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Delicacies ({basketItems.reduce((acc, c) => acc + c.count, 0)} items):</span>
                  <span className="font-mono text-[#F7E6A7]">₹{itemsSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Satin Zari Ribbon & Seals:</span>
                  <span className="text-emerald-400 font-medium">Included</span>
                </div>
                <div className="flex justify-between">
                  <span>Diwali Calligraphy Card:</span>
                  <span className="text-emerald-400 font-medium">Included</span>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/30 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-[#FDFBF7] block">Total Price:</span>
                    <span className="text-[10px] text-[#E8DECB]/60">Net Price · No Added Taxes</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-[#F7E6A7]">
                      ₹{hamperTotalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSaveAndAddToCart}
                disabled={basketItems.length === 0}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pack & Add to Hamper Bag</span>
              </button>

              <div className="p-3 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 text-[11px] text-[#E8DECB]/80 space-y-1">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Raipur Delivery Promise</span>
                </div>
                <p>
                  Handcrafted fresh upon order in our Pandri studio. Delivered in temperature-controlled packaging across Raipur.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
