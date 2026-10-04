import React, { useState } from 'react';
import { LionLogo } from './LionLogo';
import { Match, NewsItem } from '../data/clubData';

interface HomeTabProps {
  onOpenTickets: (match?: Match) => void;
  onOpenStore: () => void;
  onOpenNews?: () => void;
  onOpenMedia?: () => void;
  onOpenAnthem: () => void;
  onOpenProfile: () => void;
  onSelectNews: (news: NewsItem) => void;
  onNavigateTab: (tab: 'matches' | 'team' | 'community' | 'more') => void;
  onOpenMenu: () => void;
  onOpenLiveStream: () => void;
  onOpenAcademy: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onOpenTickets,
  onOpenStore,
  onOpenNews,
  onOpenMedia,
  onOpenAnthem,
  onOpenProfile,
  onSelectNews,
  onNavigateTab,
  onOpenMenu,
  onOpenLiveStream,
  onOpenAcademy,
}) => {
  const [matchDetailsOpen, setMatchDetailsOpen] = useState(false);

  // Match details for "الرجاء العراقي vs الشاوي"
  const currentMatch = {
    teamA: 'الشاوي',
    teamB: 'الرجاء العراقي',
    time: 'الجمعة 25 أيلول\nالساعة 4:00 مساءً',
    stadium: 'ملعب بابل',
    tournament: 'دوري المحترفين · الجولة 5',
    referee: 'طاقم تحكيم دولي',
    capacity: '32,000 متفرج',
  };

  return (
    <div id="home-screen" className="screen active fade-in-screen">
      {/* الترويسة (Header) */}
      <div className="home-header">
        <div className="header-logo-side">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#121c2e] border border-white/10 flex items-center justify-center overflow-hidden">
              <LionLogo size={32} />
            </div>
          </div>
          <div>
            <h3>نادي الرجاء العراقي</h3>
            <span>2026 - 2025</span>
          </div>
        </div>
        <i
          className="fa-solid fa-bars menu-icon"
          onClick={onOpenMenu}
          title="القائمة الجانبية"
          role="button"
          tabIndex={0}
        ></i>
      </div>

      {/* محتوى الصفحة الرئيسية (Content) */}
      <div className="home-content">
        {/* البانر الرئيسي (Main Banner) */}
        <div className="main-banner">
          {/* Subtle lion watermark in the banner */}
          <div className="absolute top-2 left-3 opacity-15 pointer-events-none">
            <LionLogo size={130} />
          </div>
          
          <div className="banner-text z-10">
            <h2>الرجاء العراقي</h2>
            <p>أكثر من مجرد نادي</p>
          </div>
        </div>

        {/* الأيقونات السريعة (Quick Links Grid) */}
        <div className="quick-links-grid">
          <div
            className="link-item"
            onClick={() => onNavigateTab('team')}
            role="button"
            tabIndex={0}
          >
            <i className="fa-solid fa-users"></i>
            <span>اللاعبين</span>
          </div>

          <div
            className="link-item"
            onClick={() => onNavigateTab('team')}
            role="button"
            tabIndex={0}
          >
            <i className="fa-solid fa-shirt"></i>
            <span>الفريق</span>
          </div>

          <div
            className="link-item"
            onClick={() => onNavigateTab('matches')}
            role="button"
            tabIndex={0}
          >
            <i className="fa-regular fa-calendar-days"></i>
            <span>المباريات</span>
          </div>

          <div
            className="link-item"
            onClick={() => (onOpenNews ? onOpenNews() : onNavigateTab('more'))}
            role="button"
            tabIndex={0}
          >
            <i className="fa-regular fa-newspaper"></i>
            <span>الأخبار</span>
          </div>

          <div
            className="link-item"
            onClick={onOpenAcademy}
            role="button"
            tabIndex={0}
          >
            <i className="fa-solid fa-graduation-cap"></i>
            <span>أكاديمية</span>
          </div>

          <div
            className="link-item"
            onClick={onOpenStore}
            role="button"
            tabIndex={0}
          >
            <i className="fa-solid fa-store"></i>
            <span>المتجر</span>
          </div>

          <div
            className="link-item"
            onClick={() => onOpenTickets()}
            role="button"
            tabIndex={0}
          >
            <i className="fa-solid fa-ticket"></i>
            <span>التذاكر</span>
          </div>

          <div
            className="link-item"
            onClick={onOpenLiveStream}
            role="button"
            tabIndex={0}
          >
            <i className="fa-solid fa-tv"></i>
            <span>البث المباشر</span>
          </div>

          <div
            className="link-item"
            onClick={onOpenMedia}
            role="button"
            tabIndex={0}
          >
            <i className="fa-solid fa-photo-film"></i>
            <span>الميديا</span>
          </div>
        </div>

        {/* قسم المباراة القادمة (Upcoming Match) */}
        <div className="section-title">المباراة القادمة</div>
        <div className="match-card">
          <div className="teams-row">
            {/* فريق الشاوي */}
            <div className="team-info">
              <div className="w-[55px] h-[55px] rounded-full bg-[#1b273d] border-2 border-white/10 flex items-center justify-center text-white shadow-inner">
                {/* Athletic Shield Emblem for Al-Shawi */}
                <svg viewBox="0 0 48 48" className="w-8 h-8 text-[#d4af37]" fill="currentColor">
                  <path d="M24 4L8 10v14c0 10.5 6.8 20.3 16 23 9.2-2.7 16-12.5 16-23V10L24 4zm0 6l10 3.7v10.3c0 7.2-4.5 13.8-10 16-5.5-2.2-10-8.8-10-16V13.7L24 10z"/>
                  <circle cx="24" cy="22" r="4" fill="#e30613"/>
                </svg>
              </div>
              <span>الشاوي</span>
            </div>

            {/* تفاصيل المباراة */}
            <div className="match-details">
              <div className="vs">VS</div>
              <div className="match-time">
                الجمعة 25 أيلول
                <br />
                الساعة 4:00 مساءً
              </div>
              <div className="match-stadium">ملعب بابل</div>
            </div>

            {/* نادي الرجاء العراقي */}
            <div className="team-info">
              <div className="w-[55px] h-[55px] flex items-center justify-center">
                <LionLogo size={52} />
              </div>
              <span>الرجاء العراقي</span>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => onNavigateTab('matches')}
          >
            تفاصيل المباراة
          </button>
        </div>
      </div>

      {/* Match Details Modal (نافذة تفاصيل المباراة) */}
      {matchDetailsOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-3 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121c2e] border border-white/10 rounded-3xl p-5 max-w-sm w-full text-right shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-[#e30613] bg-[#e30613]/10 px-2.5 py-1 rounded-full">
                بطاقة اللقاء
              </span>
              <button
                onClick={() => setMatchDetailsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#8c96aa] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-center">
              <div className="flex items-center justify-around mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#1b273d] flex items-center justify-center mb-1">
                    <span className="font-bold text-base text-[#d4af37]">S</span>
                  </div>
                  <div className="font-bold text-sm text-white">الشاوي</div>
                </div>

                <div className="text-xl font-black text-[#e30613]">VS</div>

                <div className="text-center">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center mb-1">
                    <LionLogo size={46} />
                  </div>
                  <div className="font-bold text-sm text-white">الرجاء العراقي</div>
                </div>
              </div>

              <div className="space-y-2 bg-[#070d1a] p-3 rounded-2xl text-xs text-right border border-white/5 mb-4">
                <div className="flex justify-between text-[#8c96aa]">
                  <span>الموعد:</span>
                  <span className="text-white font-semibold">الجمعة 25 أيلول 2026 - 4:00 م</span>
                </div>
                <div className="flex justify-between text-[#8c96aa]">
                  <span>الملعب:</span>
                  <span className="text-white font-semibold">ملعب بابل الدولي</span>
                </div>
                <div className="flex justify-between text-[#8c96aa]">
                  <span>البث الناقل:</span>
                  <span className="text-white font-semibold">قناة النادي الرسمية / تطبيق نادي الرجاء العراقي</span>
                </div>
                <div className="flex justify-between text-[#8c96aa]">
                  <span>حالة التذاكر:</span>
                  <span className="text-emerald-400 font-semibold">متاحة للحجز الفوري</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMatchDetailsOpen(false);
                    onOpenTickets();
                  }}
                  className="flex-1 py-3 bg-[#e30613] hover:bg-[#c40510] text-white rounded-xl font-bold text-xs shadow-lg cursor-pointer"
                >
                  <i className="fa-solid fa-ticket ml-1"></i>
                  حجز التذاكر الآن
                </button>
                <button
                  onClick={() => setMatchDetailsOpen(false)}
                  className="py-3 px-4 bg-white/5 hover:bg-white/10 text-[#8c96aa] hover:text-white rounded-xl font-semibold text-xs"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
