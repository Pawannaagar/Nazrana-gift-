import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  SlidersHorizontal, 
  Check, 
  X, 
  Clock, 
  Wand2, 
  Layers
} from 'lucide-react';
import { HamperProduct } from '../types';

interface ProductGalleryProps {
  products: HamperProduct[];
  onAddToCart: (product: HamperProduct) => void;
  onCustomizeProduct: (product: HamperProduct) => void;
  selectedProductId?: string;
  onClearSelectedProduct?: () => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  products,
  onAddToCart,
  onCustomizeProduct,
  selectedProductId,
  onClearSelectedProduct
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under1500' | 'mid' | 'luxury'>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<HamperProduct | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedProductId) {
      const found = products.find(p => p.id === selectedProductId);
      if (found) {
        setActiveModalProduct(found);
      }
      if (onClearSelectedProduct) onClearSelectedProduct();
    }
  }, [selectedProductId, products, onClearSelectedProduct]);

  const categories = [
    'All',
    'Diwali Special',
    'Classic',
    'Luxury',
    'Royal Festive',
    'Gourmet & Dry Fruits',
    'Corporate'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.itemsIncluded.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesPrice = true;
      if (priceFilter === 'under1500') matchesPrice = product.price <= 1500;
      else if (priceFilter === 'mid') matchesPrice = product.price > 1500 && product.price <= 2500;
      else if (priceFilter === 'luxury') matchesPrice = product.price > 2500;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, selectedCategory, searchQuery, priceFilter]);

  const handleAddWithFeedback = (product: HamperProduct) => {
    onAddToCart(product);
    setAddedNotice(product.name);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2500);
  };

  return (
    <section id="catalog-section" className="py-12 bg-[#061D15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[#D4AF37]/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-2">
              <span>🪔</span>
              <span>Shubh Deepavali Curated Hampers</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
              Diwali Ready-to-Gift Hampers
            </h2>
            <p className="text-[#E8DECB]/80 text-sm sm:text-base mt-1 max-w-xl font-light">
              Authentic festive arrangements, hand-selected gourmet delicacies, and royal presentation ready for swift dispatch in Raipur.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dry fruits, chocolates, mithai..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0B2E23] border border-[#D4AF37]/30 rounded-xl text-xs sm:text-sm text-[#F7F1E5] placeholder-[#E8DECB]/50 focus:outline-none focus:border-[#D4AF37]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E8DECB]/50 hover:text-[#F7E6A7]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls: Category tabs & Price Segmented Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-[#061D15] font-semibold shadow-sm'
                    : 'bg-[#0B2E23]/70 text-[#E8DECB] hover:bg-[#0B2E23] hover:text-[#F7E6A7] border border-[#D4AF37]/20'
                }`}
              >
                {cat === 'Diwali Special' ? '🪔 Diwali Special' : cat}
              </button>
            ))}
          </div>

          {/* Budget filter pills */}
          <div className="flex items-center gap-1.5 text-xs text-[#E8DECB] shrink-0 self-start lg:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-wider text-[#E8DECB]/70 mr-1">Budget:</span>
            <button
              onClick={() => setPriceFilter('all')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                priceFilter === 'all' ? 'bg-[#D4AF37]/30 text-[#F7E6A7] font-semibold border border-[#D4AF37]/40' : 'text-[#E8DECB]/70 hover:text-[#F7E6A7]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setPriceFilter('under1500')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                priceFilter === 'under1500' ? 'bg-[#D4AF37]/30 text-[#F7E6A7] font-semibold border border-[#D4AF37]/40' : 'text-[#E8DECB]/70 hover:text-[#F7E6A7]'
              }`}
            >
              &le; ₹1,500
            </button>
            <button
              onClick={() => setPriceFilter('mid')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                priceFilter === 'mid' ? 'bg-[#D4AF37]/30 text-[#F7E6A7] font-semibold border border-[#D4AF37]/40' : 'text-[#E8DECB]/70 hover:text-[#F7E6A7]'
              }`}
            >
              ₹1,500 - ₹2,500
            </button>
            <button
              onClick={() => setPriceFilter('luxury')}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                priceFilter === 'luxury' ? 'bg-[#D4AF37]/30 text-[#F7E6A7] font-semibold border border-[#D4AF37]/40' : 'text-[#E8DECB]/70 hover:text-[#F7E6A7]'
              }`}
            >
              &gt; ₹2,500
            </button>
          </div>
        </div>

        {/* Floating feedback alert */}
        {addedNotice && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0E4233] border border-[#D4AF37] text-[#F7E6A7] px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm animate-fade-in">
            <Check className="w-4 h-4 text-[#D4AF37]" />
            <span>Added <strong>{addedNotice}</strong> to your Hamper Bag!</span>
          </div>
        )}

        {/* Product Cards Grid: 3-column desktop, 2-column tablet */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border border-[#D4AF37]/20 rounded-2xl bg-[#092B21]/40">
            <Layers className="w-10 h-10 text-[#D4AF37]/50 mx-auto mb-3" />
            <h3 className="font-display text-xl text-[#FDFBF7]">No hampers match your filters</h3>
            <p className="text-xs text-[#E8DECB]/70 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or budget range, or design a custom hamper with your favorite ingredients!
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPriceFilter('all'); }}
              className="mt-4 px-4 py-2 text-xs bg-[#D4AF37] text-[#061D15] rounded-lg font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-gradient-to-b from-[#0F392B] to-[#082218] border border-[#D4AF37]/25 hover:border-[#D4AF37] shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                {/* Product Imagery */}
                <div className="relative aspect-[4/5] bg-black/40 overflow-hidden cursor-pointer" onClick={() => setActiveModalProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient Scrim at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#082218] via-[#082218]/40 to-transparent pointer-events-none"></div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {product.isBestSeller && (
                      <span className="bg-[#D4AF37] text-[#061D15] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        Best Seller
                      </span>
                    )}
                    <span className="bg-[#061D15]/85 border border-[#D4AF37]/30 text-[#F7E6A7] text-[10px] font-medium px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="bg-[#061D15]/80 text-[#D4AF37] text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1 border border-[#D4AF37]/20">
                      ★ {product.rating} <span className="text-[#E8DECB]/50">({product.reviewCount})</span>
                    </span>
                  </div>

                  {/* Quick View Floating Button on Hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProduct(product);
                    }}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#061D15]/90 hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] border border-[#D4AF37]/40 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                    title="Quick Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header line */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 
                        onClick={() => setActiveModalProduct(product)}
                        className="font-display font-bold text-lg sm:text-xl text-[#FDFBF7] group-hover:text-[#F7E6A7] transition-colors cursor-pointer truncate"
                      >
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#E8DECB]/70 line-clamp-2 mt-1 font-light leading-relaxed">
                      {product.description}
                    </p>

                    {/* Included items preview */}
                    <div className="mt-3.5 pt-3 border-t border-[#D4AF37]/15">
                      <p className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold mb-1.5">
                        Products Included:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.itemsIncluded.slice(0, 4).map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] text-[#E8DECB]/90 bg-[#061D15]/60 px-2 py-0.5 rounded border border-[#D4AF37]/15"
                          >
                            {item}
                          </span>
                        ))}
                        {product.itemsIncluded.length > 4 && (
                          <span className="text-[11px] text-[#F7E6A7] font-medium px-1.5 py-0.5">
                            +{product.itemsIncluded.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Pricing & Actions */}
                  <div className="pt-4 mt-4 border-t border-[#D4AF37]/15">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-2xl font-bold font-mono text-[#F7E6A7] tabular-nums">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#E8DECB]/50 line-through tabular-nums font-mono">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#E8DECB]/60 block">
                          Net Price · Free Raipur Delivery on ₹1,999+
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-[#D4AF37] font-medium flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3" />
                          <span>{product.deliveryTime}</span>
                        </span>
                        <span className="text-[10px] text-[#E8DECB]/60">
                          Weight: {product.weight}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onCustomizeProduct(product)}
                        className="py-2.5 px-3 rounded-xl bg-[#0B2E23] hover:bg-[#0E4233] text-[#F7E6A7] border border-[#D4AF37]/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Open in custom drag & drop builder with these contents"
                      >
                        <Wand2 className="w-3.5 h-3.5" />
                        <span>Customize</span>
                      </button>

                      <button
                        onClick={() => handleAddWithFeedback(product)}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer active:scale-95"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Quick View Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#092B21] border border-[#D4AF37] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
            {/* Close button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#061D15]/80 hover:bg-[#D4AF37] text-[#F7E6A7] hover:text-[#061D15] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Image */}
            <div className="md:w-1/2 aspect-square md:aspect-auto relative bg-black/50">
              <img
                src={activeModalProduct.image}
                alt={activeModalProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 bg-[#061D15]/90 border border-[#D4AF37]/30 px-2.5 py-1 rounded text-xs text-[#F7E6A7]">
                Nazrana Festive Selection
              </div>
            </div>

            {/* Right: Details & Order */}
            <div className="p-6 md:w-1/2 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                  {activeModalProduct.category} Collection · Raipur
                </div>
                <h3 className="font-display text-2xl font-bold text-[#FDFBF7] mt-0.5">
                  {activeModalProduct.name}
                </h3>

                <div className="flex items-center gap-3 my-2 text-xs text-[#E8DECB]/80">
                  <span className="text-[#D4AF37]">★ {activeModalProduct.rating} ({activeModalProduct.reviewCount} reviews)</span>
                  <span>·</span>
                  <span>Weight: {activeModalProduct.weight}</span>
                </div>

                <p className="text-xs text-[#E8DECB]/90 leading-relaxed font-light my-3">
                  {activeModalProduct.description}
                </p>

                {/* Packaging note */}
                <div className="p-2.5 rounded-lg bg-[#061D15] border border-[#D4AF37]/20 text-xs text-[#F7E6A7] my-3">
                  <strong className="block text-[#D4AF37] font-semibold text-[11px] uppercase">Packaging:</strong>
                  {activeModalProduct.packaging}
                </div>

                {/* All items list */}
                <div className="my-3">
                  <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
                    Complete Itemized Inclusions:
                  </h4>
                  <ul className="grid grid-cols-1 gap-1 text-xs text-[#E8DECB]/90">
                    {activeModalProduct.itemsIncluded.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="pt-4 mt-4 border-t border-[#D4AF37]/20">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-2xl font-bold font-mono text-[#F7E6A7] tabular-nums">
                      ₹{activeModalProduct.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-[#E8DECB]/60 block">
                      Net Price · No Added Taxes
                    </span>
                  </div>
                  <div className="text-right text-xs text-[#E8DECB]/80">
                    <span className="text-[#D4AF37] font-medium block">Raipur Delivery</span>
                    <span>{activeModalProduct.deliveryTime}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onCustomizeProduct(activeModalProduct);
                      setActiveModalProduct(null);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#061D15] hover:bg-[#0B2E23] text-[#F7E6A7] border border-[#D4AF37]/40 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Customize</span>
                  </button>

                  <button
                    onClick={() => {
                      handleAddWithFeedback(activeModalProduct);
                      setActiveModalProduct(null);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] text-xs font-bold flex items-center justify-center gap-1.5 shadow cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
