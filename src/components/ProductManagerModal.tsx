import React, { useState } from 'react';
import { 
  Sliders, 
  X, 
  Plus, 
  Trash2, 
  Tag, 
  Save, 
  CheckCircle2, 
  Sparkles, 
  ShoppingBag, 
  Phone, 
  Truck, 
  Edit3,
  Percent,
  HelpCircle
} from 'lucide-react';
import { HamperProduct, Coupon, StoreSettings } from '../types';

interface ProductManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: HamperProduct[];
  onUpdateProducts: (newProducts: HamperProduct[]) => void;
  coupons: Coupon[];
  onUpdateCoupons: (newCoupons: Coupon[]) => void;
  storeSettings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
}

export const ProductManagerModal: React.FC<ProductManagerModalProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  coupons,
  onUpdateCoupons,
  storeSettings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'prices' | 'add_product' | 'coupons' | 'settings'>('prices');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'Classic' | 'Luxury' | 'Diwali Special' | 'Royal Festive' | 'Gourmet & Dry Fruits' | 'Corporate'>('Diwali Special');
  const [newProdPrice, setNewProdPrice] = useState('1499');
  const [newProdOrigPrice, setNewProdOrigPrice] = useState('1999');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('/src/assets/images/diwali_hamper_showcase_1793258963327.jpg');
  const [newProdInclusions, setNewProdInclusions] = useState('Roasted Cashews (200g), California Almonds (200g), Cadbury Celebrations, Handcrafted Diyas');
  const [newProdPackaging, setNewProdPackaging] = useState('Festive Golden Box with Zari Ribbon & Diya Seal');

  // New coupon form state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'flat'>('flat');
  const [newCouponValue, setNewCouponValue] = useState('300');
  const [newCouponMinOrder, setNewCouponMinOrder] = useState('1500');
  const [newCouponDesc, setNewCouponDesc] = useState('Diwali festive discount');

  // Store settings state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>({ ...storeSettings });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Price quick editor
  const handlePriceChange = (productId: string, newPriceStr: string) => {
    const val = parseInt(newPriceStr, 10);
    if (isNaN(val) || val <= 0) return;
    const updated = products.map(p => p.id === productId ? { ...p, price: val } : p);
    onUpdateProducts(updated);
    showToast(`Updated price to ₹${val.toLocaleString('en-IN')}`);
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    if (products.length <= 1) {
      alert('You must keep at least 1 product in the catalog.');
      return;
    }
    const updated = products.filter(p => p.id !== productId);
    onUpdateProducts(updated);
    showToast('Product removed from catalog.');
  };

  // Add product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) return;

    const items = newProdInclusions
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const newProduct: HamperProduct = {
      id: `custom-prod-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      price: parseInt(newProdPrice, 10),
      originalPrice: newProdOrigPrice ? parseInt(newProdOrigPrice, 10) : undefined,
      description: newProdDesc || 'Artisanal festive celebration hamper handcrafted for Diwali in Raipur.',
      image: newProdImage,
      itemsIncluded: items.length > 0 ? items : ['Gourmet Festive Sweets', 'Artisanal Diyas', 'Dry Fruits Box'],
      packaging: newProdPackaging,
      isPopular: true,
      rating: 5.0,
      reviewCount: 1,
      deliveryTime: '2-3 Days (Express Available)',
      weight: '1.8 kg'
    };

    onUpdateProducts([newProduct, ...products]);
    showToast(`Added "${newProdName}" to catalog!`);
    setNewProdName('');
    setNewProdDesc('');
    setActiveTab('prices');
  };

  // Add coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim() || !newCouponValue) return;

    const codeClean = newCouponCode.trim().toUpperCase().replace(/\s+/g, '');
    const newCoupon: Coupon = {
      code: codeClean,
      discountType: newCouponType,
      discountValue: parseFloat(newCouponValue),
      minOrder: parseFloat(newCouponMinOrder) || 0,
      description: newCouponDesc || `${newCouponType === 'flat' ? `₹${newCouponValue} OFF` : `${newCouponValue}% OFF`} on orders over ₹${newCouponMinOrder}`,
      isActive: true
    };

    onUpdateCoupons([newCoupon, ...coupons]);
    showToast(`Created offer coupon: ${codeClean}!`);
    setNewCouponCode('');
  };

  const handleDeleteCoupon = (code: string) => {
    const updated = coupons.filter(c => c.code !== code);
    onUpdateCoupons(updated);
    showToast(`Coupon ${code} removed.`);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    showToast('Store contact & delivery details updated!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in text-[#F7F1E5]">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#092B21] border border-[#D4AF37] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#061D15] border-b border-[#D4AF37]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#0E4233] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#FDFBF7]">
                Nazrana Atelier & Catalog Manager
              </h3>
              <p className="text-[11px] text-[#E8DECB]/70">
                Manage product prices, add new gift hampers, create offer coupons & update store settings.
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

        {/* Tab selection */}
        <div className="flex items-center gap-1.5 p-2 bg-[#061D15] border-b border-[#D4AF37]/15 overflow-x-auto">
          <button
            onClick={() => setActiveTab('prices')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prices'
                ? 'bg-[#D4AF37] text-[#061D15] shadow'
                : 'text-[#E8DECB] hover:bg-[#0B3427]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Manage Product Prices ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add_product')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'add_product'
                ? 'bg-[#D4AF37] text-[#061D15] shadow'
                : 'text-[#E8DECB] hover:bg-[#0B3427]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'coupons'
                ? 'bg-[#D4AF37] text-[#061D15] shadow'
                : 'text-[#E8DECB] hover:bg-[#0B3427]'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>Offer Coupons ({coupons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-[#D4AF37] text-[#061D15] shadow'
                : 'text-[#E8DECB] hover:bg-[#0B3427]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Helplines & Store</span>
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-[#0E4233] border-b border-[#D4AF37] p-2 text-center text-xs text-[#F7E6A7] flex items-center justify-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Content body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* TAB 1: MANAGE PRODUCT PRICES & REMOVE PRODUCTS */}
          {activeTab === 'prices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/15">
                <div>
                  <h4 className="font-display font-bold text-base text-[#FDFBF7]">
                    Live Catalog Products & Instant Price Manager
                  </h4>
                  <p className="text-xs text-[#E8DECB]/70 font-light">
                    Directly type any new price below. Changes update the storefront immediately.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('add_product')}
                  className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#061D15] font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Product</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-2xl bg-[#061D15] border border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-black/40 overflow-hidden shrink-0 border border-[#D4AF37]/30">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider block">
                          {prod.category}
                        </span>
                        <h5 className="font-display font-bold text-sm text-[#FDFBF7] truncate">
                          {prod.name}
                        </h5>
                        <p className="text-[11px] text-[#E8DECB]/60 truncate">
                          {prod.itemsIncluded.length} items · {prod.deliveryTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D4AF37]/10">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#E8DECB]/70 font-mono">Price (₹):</span>
                        <input
                          type="number"
                          defaultValue={prod.price}
                          onBlur={(e) => handlePriceChange(prod.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handlePriceChange(prod.id, (e.target as HTMLInputElement).value);
                            }
                          }}
                          className="w-24 bg-[#092B21] border border-[#D4AF37]/40 rounded-lg px-2.5 py-1 text-sm font-mono font-bold text-[#F7E6A7] focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="text-[#E8DECB]/50 hover:text-red-400 p-2 rounded-lg hover:bg-black/30 transition-colors cursor-pointer"
                        title="Remove product from catalog"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD NEW PRODUCT */}
          {activeTab === 'add_product' && (
            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="pb-2 border-b border-[#D4AF37]/15">
                <h4 className="font-display font-bold text-base text-[#FDFBF7]">
                  Add a New Gift Hamper to Catalog
                </h4>
                <p className="text-xs text-[#E8DECB]/70 font-light">
                  Define your new hamper offering with photo, price, and inclusions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#E8DECB]/80 block mb-1 font-medium">Product / Hamper Name: *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Diwali Royal Dry Fruit Chest"
                    className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[#E8DECB]/80 block mb-1 font-medium">Category:</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Diwali Special">Diwali Special</option>
                    <option value="Classic">Classic</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Royal Festive">Royal Festive</option>
                    <option value="Gourmet & Dry Fruits">Gourmet & Dry Fruits</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#E8DECB]/80 block mb-1 font-medium">Selling Price (₹): *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="1499"
                    className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-[#F7E6A7] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[#E8DECB]/80 block mb-1 font-medium">Original Strikethrough Price (₹):</label>
                  <input
                    type="number"
                    value={newProdOrigPrice}
                    onChange={(e) => setNewProdOrigPrice(e.target.value)}
                    placeholder="1999"
                    className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-[#F7F1E5] font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Photo selector */}
              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium">Choose Product Photo or Enter Image URL:</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {[
                    { label: 'Diwali Showcase', url: '/src/assets/images/diwali_hamper_showcase_1793258963327.jpg' },
                    { label: 'Diwali Lanterns', url: '/src/assets/images/diwali_diyas_lanterns_1793258961379.jpg' },
                    { label: 'Classic Jute', url: '/assets/aistudio/file_000000006f348211a8a7b1ccebdc5cb3_40916a6e.png' },
                    { label: 'Royal Wire', url: '/assets/aistudio/file_0000000025808211a7ecd7fb6cb102b9_0984d255.png' }
                  ].map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setNewProdImage(preset.url)}
                      className={`p-1.5 rounded-lg border text-[11px] truncate cursor-pointer ${
                        newProdImage === preset.url
                          ? 'bg-[#0E4233] border-[#D4AF37] text-[#F7E6A7] font-bold'
                          : 'bg-[#061D15] border-[#D4AF37]/20 text-[#E8DECB]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  placeholder="Image path or URL"
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-[#F7F1E5] font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium">Items Included (comma-separated):</label>
                <textarea
                  rows={2}
                  value={newProdInclusions}
                  onChange={(e) => setNewProdInclusions(e.target.value)}
                  placeholder="Roasted Cashews, Badam, Ferrero Rocher, Brass Diya"
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl p-3 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium">Product Description:</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Detailed description of the hamper..."
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl p-3 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('prices')}
                  className="px-4 py-2.5 rounded-xl bg-[#061D15] text-[#E8DECB] hover:bg-[#0B3427] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] text-[#061D15] font-bold shadow-lg hover:from-[#F5DF9A] cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product to Store</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: OFFER COUPONS MANAGER */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 text-xs">
              
              {/* Create new coupon form */}
              <form onSubmit={handleAddCoupon} className="p-4 rounded-2xl bg-[#061D15] border border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#F7E6A7]">
                  <Percent className="w-4 h-4 text-[#D4AF37]" />
                  <span>Create New Offer Coupon</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[#E8DECB]/80 block mb-1">Coupon Code: *</label>
                    <input
                      type="text"
                      required
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      placeholder="e.g. DIWALI20"
                      className="w-full bg-[#092B21] border border-[#D4AF37]/40 rounded-xl px-3 py-1.5 uppercase font-mono font-bold text-[#F7E6A7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[#E8DECB]/80 block mb-1">Discount Type:</label>
                    <select
                      value={newCouponType}
                      onChange={(e) => setNewCouponType(e.target.value as any)}
                      className="w-full bg-[#092B21] border border-[#D4AF37]/40 rounded-xl px-2.5 py-1.5 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="flat">Flat Amount (₹)</option>
                      <option value="percentage">Percentage (%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[#E8DECB]/80 block mb-1">Discount Value: *</label>
                    <input
                      type="number"
                      required
                      value={newCouponValue}
                      onChange={(e) => setNewCouponValue(e.target.value)}
                      placeholder="300"
                      className="w-full bg-[#092B21] border border-[#D4AF37]/40 rounded-xl px-3 py-1.5 font-mono text-[#F7E6A7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[#E8DECB]/80 block mb-1">Min Order (₹):</label>
                    <input
                      type="number"
                      value={newCouponMinOrder}
                      onChange={(e) => setNewCouponMinOrder(e.target.value)}
                      placeholder="1500"
                      className="w-full bg-[#092B21] border border-[#D4AF37]/40 rounded-xl px-3 py-1.5 font-mono text-[#F7E6A7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#E8DECB]/80 block mb-1">Description:</label>
                  <input
                    type="text"
                    value={newCouponDesc}
                    onChange={(e) => setNewCouponDesc(e.target.value)}
                    placeholder="e.g. Flat ₹300 OFF on orders above ₹1,500"
                    className="w-full bg-[#092B21] border border-[#D4AF37]/40 rounded-xl px-3 py-1.5 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] text-[#061D15] font-bold cursor-pointer shadow hover:from-[#F5DF9A]"
                  >
                    + Create Offer Coupon
                  </button>
                </div>
              </form>

              {/* List of active coupons */}
              <div>
                <h5 className="font-display font-bold text-sm text-[#FDFBF7] mb-2.5">
                  Active Coupons Available at Checkout
                </h5>
                <div className="space-y-2">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.code}
                      className="p-3 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-sm text-[#F7E6A7] bg-[#0E4233] px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                          {coupon.code}
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-[#FDFBF7]">
                            {coupon.discountType === 'flat' ? `Flat ₹${coupon.discountValue} OFF` : `${coupon.discountValue}% OFF`}
                          </p>
                          <p className="text-[11px] text-[#E8DECB]/60">
                            {coupon.description} {coupon.minOrder > 0 && `(Min. order ₹${coupon.minOrder})`}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteCoupon(coupon.code)}
                        className="text-[#E8DECB]/40 hover:text-red-400 p-1.5 cursor-pointer"
                        title="Delete coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: HELPLINES & STORE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="pb-2 border-b border-[#D4AF37]/15">
                <h4 className="font-display font-bold text-base text-[#FDFBF7]">
                  Store Helplines & Delivery Configuration
                </h4>
                <p className="text-xs text-[#E8DECB]/70 font-light">
                  Update customer helpline numbers and Raipur delivery timeframes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#E8DECB]/80 block mb-1 font-medium">Primary Phone Line: *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.phonePrimary}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phonePrimary: e.target.value })}
                    className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 font-mono text-[#F7E6A7] font-bold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[#E8DECB]/80 block mb-1 font-medium">Secondary Phone Line: *</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.phoneSecondary}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phoneSecondary: e.target.value })}
                    className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 font-mono text-[#F7E6A7] font-bold focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium">Delivery SLA / Timeline:</label>
                <input
                  type="text"
                  value={settingsForm.deliveryTimeline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, deliveryTimeline: e.target.value })}
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium">Top Announcement Banner Text:</label>
                <input
                  type="text"
                  value={settingsForm.announcementText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] text-[#061D15] font-bold cursor-pointer shadow hover:from-[#F5DF9A]"
                >
                  Save Store Settings
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
