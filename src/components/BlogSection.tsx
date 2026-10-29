import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Tag, 
  Share2, 
  Check, 
  X,
  Phone,
  Gift
} from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/catalog';

interface BlogSectionProps {
  onOpenBuilder: () => void;
  onExploreCatalog: () => void;
  phonePrimary: string;
  phoneSecondary: string;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenBuilder,
  onExploreCatalog,
  phonePrimary,
  phoneSecondary
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const categories = ['All', 'Corporate Insights', 'Hamper Styling', 'Festive Guide', 'Gifting Etiquette'];

  const filteredPosts = BLOG_POSTS.filter(post => {
    if (selectedCategory === 'All') return true;
    return post.category === selectedCategory;
  });

  const handleShare = (post: BlogPost) => {
    navigator.clipboard.writeText(`${window.location.origin}/#blog-${post.slug}`);
    setCopiedSlug(post.slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  return (
    <section className="py-12 bg-[#061D15] text-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 border-b border-[#D4AF37]/20 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Nazrana Gifting Journal</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
              The Art of Gifting & Celebration
            </h2>
            <p className="text-sm text-[#E8DECB]/80 mt-1 max-w-2xl font-light">
              Insights, styling guides, and festive traditions curated by our master gifting connoisseurs in Raipur.
            </p>
          </div>

          {/* Quick Helplines Callout */}
          <div className="p-3 rounded-2xl bg-[#092B21] border border-[#D4AF37]/30 flex items-center gap-3 text-xs">
            <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <div>
              <span className="text-[#E8DECB]/70 text-[10px] uppercase tracking-wider block">Gifting Editorial Desk:</span>
              <div className="flex items-center gap-2 font-mono font-bold text-[#F7E6A7]">
                <a href={`tel:${phonePrimary}`} className="hover:underline">{phonePrimary}</a>
                <span>·</span>
                <a href={`tel:${phoneSecondary}`} className="hover:underline">{phoneSecondary}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-[#061D15] font-semibold shadow'
                  : 'bg-[#092B21] text-[#E8DECB] hover:text-[#F7E6A7] border border-[#D4AF37]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl bg-gradient-to-b from-[#092B21] to-[#061D15] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div 
                  onClick={() => setActiveArticle(post)}
                  className="relative aspect-[16/9] bg-black/40 overflow-hidden cursor-pointer"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#092B21] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-3 left-3 bg-[#061D15]/90 border border-[#D4AF37]/30 text-[#F7E6A7] text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    {post.category}
                  </div>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[11px] text-[#E8DECB]/90">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 
                    onClick={() => setActiveArticle(post)}
                    className="font-display font-bold text-xl sm:text-2xl text-[#FDFBF7] group-hover:text-[#F7E6A7] transition-colors cursor-pointer leading-snug"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#E8DECB]/80 font-light mt-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {post.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="text-[10px] bg-[#061D15] text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/15"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#D4AF37]/15 mt-4 pt-4">
                <button
                  onClick={() => setActiveArticle(post)}
                  className="text-xs font-semibold text-[#D4AF37] hover:text-[#F7E6A7] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleShare(post)}
                  className="text-xs text-[#E8DECB]/60 hover:text-[#F7E6A7] flex items-center gap-1 cursor-pointer"
                  title="Share Article Link"
                >
                  {copiedSlug === post.slug ? (
                    <span className="text-emerald-400 font-medium text-[11px]">Copied!</span>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Share</span>
                    </>
                  )}
                </button>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#092B21] border border-[#D4AF37] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#F7F1E5]">
            
            {/* Header */}
            <div className="p-5 bg-[#061D15] border-b border-[#D4AF37]/20 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                {activeArticle.category} · Nazrana Journal
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full bg-[#0B3427] hover:bg-[#D4AF37] hover:text-[#061D15] text-[#F7E6A7] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FDFBF7] leading-snug">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-[#E8DECB]/70 mt-2">
                  <span>By {activeArticle.author}</span>
                  <span>·</span>
                  <span>{activeArticle.date}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Cover image */}
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-black/40 border border-[#D4AF37]/20">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-[#E8DECB]/90 font-light leading-relaxed">
                {activeArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Atelier Callout Box */}
              <div className="p-4 rounded-2xl bg-[#061D15] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-base text-[#FDFBF7]">
                    Ready to curate your bespoke hamper in Raipur?
                  </h4>
                  <p className="text-xs text-[#E8DECB]/70 mt-0.5">
                    Standard 2-3 Days delivery or Same-Day urgent dispatch.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      onOpenBuilder();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#061D15] text-xs font-bold cursor-pointer hover:bg-[#F5DF9A]"
                  >
                    Open Builder
                  </button>
                  <button
                    onClick={() => {
                      setActiveArticle(null);
                      onExploreCatalog();
                    }}
                    className="px-4 py-2 rounded-xl bg-[#092B21] text-[#F7E6A7] border border-[#D4AF37]/30 text-xs font-semibold cursor-pointer"
                  >
                    View Catalog
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
