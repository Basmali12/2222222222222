import React from 'react';
import { NewsItem } from '../data/clubData';
import { X, Clock, Share2, Bookmark } from 'lucide-react';
import { LionLogo } from './LionLogo';

interface NewsDetailModalProps {
  news: NewsItem;
  onClose: () => void;
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ news, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#0a1120] border border-white/10 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto text-white animate-in slide-in-from-bottom duration-300">
        
        {/* Hero image header */}
        <div className={`h-48 bg-gradient-to-br ${news.imageBg} relative flex items-center justify-center`}>
          <LionLogo size={80} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1120] via-black/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="absolute bottom-4 right-4 bg-[#e30613] text-white text-xs font-bold px-3 py-1 rounded-full">
            {news.category}
          </span>
        </div>

        {/* Content body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-[#8c96aa] mb-2 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>نُشر {news.date}</span>
            <span>·</span>
            <span>وقت القراءة: {news.readTime}</span>
          </div>

          <h2 className="text-lg font-black text-white leading-snug mb-4">
            {news.title}
          </h2>

          <div className="text-sm text-slate-300 leading-relaxed space-y-3 font-normal border-t border-white/10 pt-4">
            <p>{news.content}</p>
            <p>
              ودعت إدارة النادي المشجعين إلى مؤازرة أصحاب السعادة في التحديات المقبلة والتواجد الكثيف في مدرجات استاد آل نهيان لمواصلة المسيرة نحو منصات التتويج.
            </p>
          </div>

          {/* Social share */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => alert('تم نسخ رابط المقال')}
              className="flex items-center gap-2 text-xs font-semibold text-[#8c96aa] hover:text-white"
            >
              <Share2 className="w-4 h-4 text-[#e30613]" />
              <span>مشاركة الخبر</span>
            </button>

            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/15 px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
