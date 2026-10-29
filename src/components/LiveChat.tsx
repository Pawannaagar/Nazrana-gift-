import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Truck, 
  Gift, 
  Phone, 
  ShieldCheck,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { ChatMessage } from '../types';

interface LiveChatProps {
  onOpenBuilder: () => void;
  onExploreCatalog: () => void;
  onTrackOrder: () => void;
  onOpenCorporate: () => void;
  phonePrimary: string;
  phoneSecondary: string;
}

export const LiveChat: React.FC<LiveChatProps> = ({
  onOpenBuilder,
  onExploreCatalog,
  onTrackOrder,
  onOpenCorporate,
  phonePrimary,
  phoneSecondary
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadPing, setUnreadPing] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'concierge',
      text: `Namaste! Welcome to Nazrana Luxury Gifting Atelier, Raipur. How may our 24/7 gifting specialist assist you today? You can also call us directly at ${phonePrimary} or ${phoneSecondary}.`,
      time: 'Just now',
      suggestions: [
        'Classic vs Luxury Hamper contents?',
        'Delivery in 2-3 days to Raipur?',
        'Corporate bulk gifting in Raipur',
        'How does Custom Builder work?'
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadPing(false);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      let suggestions: string[] | undefined = undefined;
      let actionPrompt: any = undefined;

      const lower = text.toLowerCase();

      if (lower.includes('classic') && lower.includes('luxury') || lower.includes('difference') || lower.includes('compare') || lower.includes('price')) {
        replyText = `Our Classic Hamper is ₹1,299 (artisanal woven jute basket, Celebrations, Dark Fantasy, Fruiti, Lite Chuda, Royal Mixture, Rose Truffles & Date Bites).
        Our New Premium Hamper is ₹1,899 (royal gold wire basket, Silk, Cashew, Badam, Cookies, Coke, Roseberry Truffles, Dark Fantasy & Date Bites).
        Our Luxury Hamper is ₹2,499 (arched imperial golden basket with scarlet rose, Silk, Cashews, California Badam, Pistas, Ferrero Rocher, Gulab Jamun tin, Coke, Date Bites & Roseberry Truffles). Use coupon code DIWALI2026 for ₹300 OFF!`;
        suggestions = ['View Classic (₹1,299)', 'View Premium (₹1,899)', 'View Luxury (₹2,499)'];
      } else if (lower.includes('deliver') || lower.includes('day') || lower.includes('raipur') || lower.includes('time')) {
        replyText = `We offer 2-3 Days Standard Delivery across all Raipur sectors, as well as Express Same-Day delivery in 3-4 hours directly from our Purani Basti, Shivaji Nagar atelier. Call ${phonePrimary} or ${phoneSecondary} for urgent delivery!`;
        suggestions = ['Check Pincode Slot', 'Order Classic Hamper', 'Corporate Delivery'];
      } else if (lower.includes('corporate') || lower.includes('bulk') || lower.includes('business')) {
        replyText = `For corporate orders (10+ hampers), we offer custom company logo laser-engraving on wooden lids, corporate color ribbons, tiered discounts up to 20%, and direct B2B invoices. Speak with our corporate team at ${phonePrimary} or ${phoneSecondary}!`;
        suggestions = ['View Corporate Gifts Tab', 'Call Corporate Desk'];
        actionPrompt = { type: 'open_corporate', label: 'Explore Corporate Gifts' };
      } else if (lower.includes('builder') || lower.includes('custom') || lower.includes('make my own') || lower.includes('drag')) {
        replyText = `Our Drag-and-Drop Hamper Builder lets you choose from 4 royal basket bases, fill it with your favorite sweets, dry fruits, chocolates, and savories, select a satin ribbon color, auspicious fragrance mist, and ink a personalized calligraphy card!`;
        suggestions = ['Launch Builder Now'];
        actionPrompt = { type: 'start_builder', label: 'Open Drag & Drop Builder' };
      } else if (lower.includes('phone') || lower.includes('call') || lower.includes('contact') || lower.includes('number')) {
        replyText = `You can call or WhatsApp our Nazrana Atelier leads directly at:\n• Primary: +91 ${phonePrimary}\n• Secondary: +91 ${phoneSecondary}\nWe are located at Purani Basti, Shivaji Nagar, Raipur, Chhattisgarh 492001.`;
        suggestions = ['Call Primary Now', 'Explore Catalog'];
      } else {
        replyText = `Thank you for reaching out! Our Purani Basti, Shivaji Nagar Atelier concierge is here 24/7. Standard delivery is 2-3 days across Raipur, with express same-day van options available. Direct helplines: ${phonePrimary} and ${phoneSecondary}.`;
        suggestions = ['Explore Catalog', 'Corporate Gifts', 'Custom Builder'];
      }

      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'concierge',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions,
          actionPrompt
        }
      ]);
    }, 850);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          {unreadPing && (
            <div className="hidden sm:flex items-center gap-2 bg-[#0E4233] border border-[#D4AF37] text-[#F7E6A7] px-3.5 py-2 rounded-2xl shadow-xl text-xs font-medium animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Raipur 24/7 Helpline: {phonePrimary}</span>
            </div>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C59D3F] to-[#B98E26] hover:from-[#F5DF9A] hover:to-[#C59D3F] text-[#061D15] flex items-center justify-center shadow-2xl shadow-[#D4AF37]/30 transition-all hover:scale-105 cursor-pointer relative"
            aria-label="Open 24/7 Live Chat"
          >
            <MessageSquare className="w-6 h-6" />
            {unreadPing && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#061D15]" />
            )}
          </button>
        </div>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 max-h-[580px] h-[85vh] rounded-3xl bg-[#092B21] border border-[#D4AF37] shadow-2xl flex flex-col justify-between text-[#F7F1E5] overflow-hidden animate-scale-up">
          
          {/* Header */}
          <div className="p-4 bg-[#061D15] border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B98E26] p-0.5 shadow">
                <div className="w-full h-full rounded-full bg-[#061D15] flex items-center justify-center text-[#F7E6A7]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[#FDFBF7]">
                  Nazrana 24/7 Concierge
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Raipur Atelier Support</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-[#0B3427] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-[#092B21] to-[#061D15]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B98E26] text-[#061D15] font-medium rounded-br-none'
                      : 'bg-[#0E4233] text-[#F7F1E5] border border-[#D4AF37]/25 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                <span className="text-[9px] text-[#E8DECB]/50 mt-1 px-1 font-mono">
                  {msg.time}
                </span>

                {/* Optional action prompt */}
                {msg.actionPrompt && (
                  <div className="mt-2">
                    <button
                      onClick={() => {
                        if (msg.actionPrompt?.type === 'start_builder') onOpenBuilder();
                        if (msg.actionPrompt?.type === 'view_catalog') onExploreCatalog();
                        if (msg.actionPrompt?.type === 'track_order') onTrackOrder();
                        if (msg.actionPrompt?.type === 'open_corporate') onOpenCorporate();
                        setIsOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#061D15] text-[11px] font-bold flex items-center gap-1.5 shadow cursor-pointer hover:bg-[#F5DF9A]"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{msg.actionPrompt.label}</span>
                    </button>
                  </div>
                )}

                {/* Suggestions chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[10px] bg-[#061D15] hover:bg-[#D4AF37]/20 text-[#F7E6A7] border border-[#D4AF37]/30 px-2.5 py-1 rounded-full transition-colors cursor-pointer text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-[#0E4233] p-2.5 rounded-2xl rounded-bl-none border border-[#D4AF37]/20 w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick contact strip with user's phone numbers */}
          <div className="px-4 py-2 bg-[#061D15] border-t border-[#D4AF37]/15 flex items-center justify-between text-[11px] text-[#E8DECB]/80">
            <span className="text-[10px] text-[#E8DECB]/60">Helpline:</span>
            <div className="flex items-center gap-2 font-mono font-bold text-[#F7E6A7]">
              <a href={`tel:${phonePrimary}`} className="hover:underline">{phonePrimary}</a>
              <span>·</span>
              <a href={`tel:${phoneSecondary}`} className="hover:underline">{phoneSecondary}</a>
            </div>
          </div>

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#061D15] border-t border-[#D4AF37]/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about hampers, 2-3 day delivery, corporate..."
              className="flex-1 bg-[#092B21] border border-[#D4AF37]/30 rounded-xl px-3 py-2 text-xs text-[#F7F1E5] placeholder-[#E8DECB]/40 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="w-8 h-8 rounded-xl bg-[#D4AF37] hover:bg-[#F5DF9A] text-[#061D15] flex items-center justify-center shrink-0 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
