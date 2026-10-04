import React, { useState } from 'react';
import { LionLogo } from './LionLogo';

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveStreamModal: React.FC<LiveStreamModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#121c2e] border border-white/10 rounded-3xl p-5 max-w-sm w-full text-right shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e30613] animate-ping" />
            <span className="text-xs font-bold text-[#e30613]">بث مباشر · ستوديو الرجاء</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#8c96aa] hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Video Player Mock */}
        <div className="relative mt-4 mb-4 rounded-2xl bg-[#070d1a] border border-white/10 aspect-video flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-[#e30613] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-xl`}></i>
            </button>
            <span className="text-[11px] text-white font-semibold mt-2">
              {isPlaying ? 'جاري البث بجودة 1080p HD' : 'البث متوقف مؤقتاً'}
            </span>
          </div>

          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white">
            <i className="fa-solid fa-signal text-emerald-400"></i>
            <span>مباشر</span>
          </div>

          <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[10px] text-white/90">
            <span>الرجاء vs الزوراء · الأجواء الحماسية</span>
            <span className="font-mono">14.8K مشاهد</span>
          </div>
        </div>

        {/* Match commentary stream */}
        <div className="bg-[#070d1a] p-3 rounded-2xl border border-white/5 space-y-2 mb-4 text-xs">
          <div className="text-[11px] font-bold text-[#d4af37] flex items-center gap-1">
            <i className="fa-solid fa-microphone-lines"></i>
            <span>التعليق المباشر للمباراة:</span>
          </div>
          <p className="text-white/80 leading-relaxed text-[11px]">
            «أهلاً بكم من ملعب الشعب الدولي، جماهير نادي الرجاء العراقي تزين المدرجات بالأحمر والذهب قبل انطلاق اللقاء المرتقب!»
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#e30613] text-white rounded-xl text-xs font-bold hover:bg-[#c40510] transition-colors"
        >
          متابعة التصفح
        </button>
      </div>
    </div>
  );
};
