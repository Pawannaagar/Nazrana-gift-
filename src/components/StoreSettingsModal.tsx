import React, { useState } from 'react';
import { 
  Sliders, 
  X, 
  Save, 
  CheckCircle2, 
  Phone, 
  Truck, 
  Sparkles, 
  HelpCircle, 
  Code, 
  MessageSquare,
  Building2
} from 'lucide-react';
import { StoreSettings } from '../types';

interface StoreSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: StoreSettings;
  onSaveSettings: (newSettings: StoreSettings) => void;
}

export const StoreSettingsModal: React.FC<StoreSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in text-[#F7F1E5]">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#092B21] border border-[#D4AF37] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-[#061D15] border-b border-[#D4AF37]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0E4233] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#FDFBF7]">
                Atelier Store Customizer & Manager
              </h3>
              <p className="text-[11px] text-[#E8DECB]/70">
                Change phone numbers, delivery days, announcement banners & business details in real time.
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Guide banner explaining how the user can change anything in the website */}
          <div className="p-4 rounded-2xl bg-[#061D15] border border-[#D4AF37]/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F7E6A7]">
              <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>How You Can Change Anything in Your Website:</span>
            </div>
            <ul className="text-xs text-[#E8DECB]/80 space-y-1.5 font-light pl-6 list-disc">
              <li>
                <strong>Instant UI Updates:</strong> Use this panel anytime to change your phone numbers, delivery timeline, announcement text, or address. Changes take effect across the entire site instantly!
              </li>
              <li>
                <strong>AI Chat Updates:</strong> Simply tell me in the chat what you want to change (e.g. <em>&quot;Change the price of Classic Hamper to ₹1,850&quot;</em>, <em>&quot;Add a new festival banner for Diwali&quot;</em>, <em>&quot;Add this new product image&quot;</em>) and I will update the code for you directly!
              </li>
              <li>
                <strong>Persistent Storage:</strong> Your changes are safely saved in your browser&apos;s localStorage.
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Business Name */}
            <div>
              <label className="text-[#E8DECB]/80 block mb-1 font-medium">Business Name:</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Phone Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Primary Phone Number:</span>
                </label>
                <input
                  type="text"
                  value={formData.phonePrimary}
                  onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                  placeholder="9589773455"
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#F7E6A7] font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Secondary Phone Number:</span>
                </label>
                <input
                  type="text"
                  value={formData.phoneSecondary}
                  onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                  placeholder="9243515692"
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#F7E6A7] font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Delivery Timeline */}
            <div>
              <label className="text-[#E8DECB]/80 block mb-1 font-medium flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Delivery Days / SLA:</span>
              </label>
              <input
                type="text"
                value={formData.deliveryTimeline}
                onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })}
                placeholder="2-3 Days Standard (Same-Day Express Available)"
                className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Announcement text */}
            <div>
              <label className="text-[#E8DECB]/80 block mb-1 font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Top Header Announcement Text:</span>
              </label>
              <input
                type="text"
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Email & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium">Atelier Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-[#E8DECB]/80 block mb-1 font-medium">Physical Raipur Address:</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#061D15] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2 text-xs text-[#F7F1E5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] text-[#E8DECB]/60">
                All changes save immediately to your browser.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-[#061D15] text-[#E8DECB] text-xs cursor-pointer hover:bg-[#0B3427]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B98E26] text-[#061D15] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow hover:from-[#F5DF9A]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {showSavedToast && (
              <div className="p-2.5 rounded-xl bg-[#0E4233] border border-[#D4AF37] text-center text-xs text-[#F7E6A7] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Store settings updated successfully across website!</span>
              </div>
            )}

          </form>

        </div>
      </div>
    </div>
  );
};
