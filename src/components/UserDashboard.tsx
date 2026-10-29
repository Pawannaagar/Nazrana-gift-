import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Award, 
  Repeat, 
  Download, 
  Printer, 
  Clock, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Order, CartItem } from '../types';

interface UserDashboardProps {
  orders: Order[];
  onReorder: (items: CartItem[]) => void;
  onTrackOrder: (orderId: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  orders,
  onReorder,
  onTrackOrder
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'rewards'>('orders');
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      title: 'Home (VIP Road)',
      recipient: 'Nazrana Patron & Family',
      phone: '+91 95897 73455',
      address: 'Bungalow 14, Royal Greens Enclave, VIP Road',
      locality: 'VIP Road (Near Airport / Hotels)',
      pincode: '492015',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Family Residence (Shankar Nagar)',
      recipient: 'Dr. Rajeshwari Agrawal',
      phone: '+91 92435 15692',
      address: 'Plot 42, Sector 2, Shankar Nagar',
      locality: 'Shankar Nagar',
      pincode: '492007',
      isDefault: false
    }
  ]);

  const [newAddrModal, setNewAddrModal] = useState(false);
  const [newTitle, setNewTitle] = useState('Office');
  const [newRecipient, setNewRecipient] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newLocality, setNewLocality] = useState('Pandri (Cloth Market & Malls)');
  const [newPincode, setNewPincode] = useState('492004');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipient || !newPhone || !newAddress) return;
    setSavedAddresses(prev => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        title: newTitle,
        recipient: newRecipient,
        phone: newPhone,
        address: newAddress,
        locality: newLocality,
        pincode: newPincode,
        isDefault: false
      }
    ]);
    setNewAddrModal(false);
    setNewRecipient('');
    setNewPhone('');
    setNewAddress('');
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <section className="py-10 bg-[#061D15] text-[#F7F1E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B3427] via-[#092B21] to-[#061D15] border border-[#D4AF37]/30 p-6 shadow-2xl mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B98E26] p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-[#061D15] flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-[#F7E6A7]">N</span>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                <Award className="w-3 h-3" />
                <span>Nazrana Gold Circle Patron</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FDFBF7]">
                Nazrana Luxury Account
              </h2>
              <p className="text-xs text-[#E8DECB]/70 font-light mt-0.5">
                VIP Gifting Patron · Raipur, Chhattisgarh · Helplines: +91 95897 73455 / 92435 15692
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-6 text-center border-t sm:border-t-0 sm:border-l border-[#D4AF37]/20 pt-4 sm:pt-0 sm:pl-8">
            <div>
              <span className="text-xl sm:text-2xl font-bold font-mono text-[#F7E6A7]">
                {orders.length}
              </span>
              <span className="text-[11px] text-[#E8DECB]/70 block">Total Orders</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold font-mono text-[#F7E6A7]">
                840
              </span>
              <span className="text-[11px] text-[#E8DECB]/70 block">Royalty Points</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#D4AF37]/20 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#D4AF37] text-[#061D15] shadow'
                : 'text-[#E8DECB] hover:bg-[#092B21] hover:text-[#F7E6A7]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History & Invoices</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'addresses'
                ? 'bg-[#D4AF37] text-[#061D15] shadow'
                : 'text-[#E8DECB] hover:bg-[#092B21] hover:text-[#F7E6A7]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Raipur Addresses ({savedAddresses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'rewards'
                ? 'bg-[#D4AF37] text-[#061D15] shadow'
                : 'text-[#E8DECB] hover:bg-[#092B21] hover:text-[#F7E6A7]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Gold Circle Privileges</span>
          </button>
        </div>

        {/* TAB 1: ORDERS & INVOICES */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-[#092B21] border border-[#D4AF37]/20 p-8">
                <Package className="w-12 h-12 text-[#D4AF37]/50 mx-auto mb-3" />
                <h3 className="font-display text-xl text-[#FDFBF7]">No Orders Yet</h3>
                <p className="text-xs text-[#E8DECB]/70 mt-1 max-w-sm mx-auto">
                  Start building your first bespoke hamper or browse our ready-to-gift catalog.
                </p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-5 sm:p-6 shadow-xl space-y-4"
                >
                  {/* Order header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D4AF37]/15">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm sm:text-base font-bold text-[#F7E6A7]">
                          #{order.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          order.courier.status === 'Delivered'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            : 'bg-[#D4AF37]/20 text-[#F7E6A7] border border-[#D4AF37]/30'
                        }`}>
                          {order.courier.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#E8DECB]/60 block mt-0.5">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.print()}
                        className="px-3 py-1.5 rounded-lg bg-[#061D15] hover:bg-[#0B3427] text-[#F7E6A7] border border-[#D4AF37]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Download GST Invoice"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>GST Invoice</span>
                      </button>

                      <button
                        onClick={() => onTrackOrder(order.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#F5DF9A] text-[#061D15] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>Track Live</span>
                      </button>
                    </div>
                  </div>

                  {/* Shipment details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#061D15] p-3.5 rounded-xl border border-[#D4AF37]/15">
                    <div>
                      <span className="text-[#E8DECB]/60 block text-[10px] uppercase">Destination (Raipur):</span>
                      <strong className="text-[#FDFBF7]">{order.deliverySchedule.locality}</strong>
                      <span className="text-[11px] text-[#E8DECB]/70 block truncate">{order.deliverySchedule.addressLine}</span>
                    </div>

                    <div>
                      <span className="text-[#E8DECB]/60 block text-[10px] uppercase">Recipient:</span>
                      <strong className="text-[#FDFBF7]">{order.deliverySchedule.recipientName}</strong>
                      <span className="text-[11px] text-[#E8DECB]/70 block">{order.deliverySchedule.recipientPhone}</span>
                    </div>

                    <div>
                      <span className="text-[#E8DECB]/60 block text-[10px] uppercase">Logistics Partner:</span>
                      <strong className="text-[#F7E6A7]">{order.courier.partner}</strong>
                      <span className="text-[11px] text-[#E8DECB]/70 block font-mono">AWB: {order.courier.awbNumber}</span>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#D4AF37] font-semibold">{item.quantity}×</span>
                          <span className="text-[#FDFBF7]">
                            {item.type === 'catalog' ? item.product?.name : 'Custom Bespoke Hamper'}
                          </span>
                        </div>
                        <span className="font-mono text-[#F7E6A7]">
                          ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Total & 1-Click Reorder */}
                  <div className="pt-3 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[#E8DECB]/70">Total Paid: </span>
                      <strong className="text-[#F7E6A7] font-mono text-sm ml-1">
                        ₹{Math.round(order.grandTotal).toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <button
                      onClick={() => onReorder(order.items)}
                      className="px-4 py-2 rounded-xl bg-[#0E4233] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] border border-[#D4AF37]/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Repeat className="w-3.5 h-3.5" />
                      <span>Re-Order This Hamper</span>
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SAVED RAIPUR ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-[#FDFBF7]">
                  Your Raipur Delivery Addresses
                </h3>
                <p className="text-xs text-[#E8DECB]/70">
                  Pre-saved destinations for 1-click delivery scheduling.
                </p>
              </div>

              <button
                onClick={() => setNewAddrModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#D4AF37] text-[#061D15] text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Raipur Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-4 rounded-2xl bg-[#092B21] border border-[#D4AF37]/25 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F7E6A7] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{addr.title}</span>
                    </span>
                    {addr.isDefault ? (
                      <span className="text-[10px] bg-[#0E4233] text-emerald-300 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                        Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-[#E8DECB]/40 hover:text-red-400 p-1 cursor-pointer"
                        title="Delete Address"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="text-xs text-[#E8DECB]/90 font-light space-y-0.5">
                    <strong className="text-[#FDFBF7] block">{addr.recipient} ({addr.phone})</strong>
                    <p>{addr.address}</p>
                    <p className="text-[#D4AF37] font-medium">{addr.locality}, PIN {addr.pincode}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal to add address */}
            {newAddrModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <form
                  onSubmit={handleAddAddress}
                  className="w-full max-w-md rounded-2xl bg-[#092B21] border border-[#D4AF37] p-5 space-y-3.5 text-xs text-[#F7F1E5]"
                >
                  <h3 className="font-display font-bold text-lg text-[#FDFBF7]">Add Raipur Address</h3>

                  <div>
                    <label className="text-[10px] text-[#E8DECB]/70 block mb-1">Label (e.g. Home, Office):</label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#E8DECB]/70 block mb-1">Recipient Name:</label>
                    <input
                      type="text"
                      required
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#E8DECB]/70 block mb-1">Phone Number:</label>
                    <input
                      type="tel"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-[#E8DECB]/70 block mb-1">Street Address:</label>
                    <textarea
                      rows={2}
                      required
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg p-2 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#E8DECB]/70 block mb-1">Locality:</label>
                      <input
                        type="text"
                        value={newLocality}
                        onChange={(e) => setNewLocality(e.target.value)}
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg p-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#E8DECB]/70 block mb-1">PIN Code:</label>
                      <input
                        type="text"
                        value={newPincode}
                        onChange={(e) => setNewPincode(e.target.value)}
                        className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-lg p-2 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setNewAddrModal(false)}
                      className="px-3 py-1.5 rounded-lg bg-[#061D15] text-[#E8DECB] text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-[#D4AF37] text-[#061D15] font-bold text-xs cursor-pointer"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: GOLD CIRCLE REWARDS */}
        {activeTab === 'rewards' && (
          <div className="rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#061D15] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[#FDFBF7]">
                  Nazrana Gold Circle Privileges
                </h3>
                <p className="text-xs text-[#E8DECB]/70">
                  Exclusive perks for our connoisseur patrons in Raipur.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 text-xs space-y-1">
                <span className="text-[#D4AF37] font-semibold block">Same-Day Priority Slot</span>
                <p className="text-[#E8DECB]/70">Guaranteed 2-hour rush dispatch for urgent celebrations.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 text-xs space-y-1">
                <span className="text-[#D4AF37] font-semibold block">Complimentary Silk Calligraphy</span>
                <p className="text-[#E8DECB]/70">Hand-inked gold foil cards with every custom hamper.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#061D15] border border-[#D4AF37]/20 text-xs space-y-1">
                <span className="text-[#D4AF37] font-semibold block">Corporate Bulk Pricing</span>
                <p className="text-[#E8DECB]/70">Direct GST invoice credits & tiered discounts above 10 hampers.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
