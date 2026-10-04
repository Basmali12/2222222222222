import React, { useState, useEffect } from 'react';
import { LionLogo } from './LionLogo';
import { Match, UPCOMING_MATCH } from '../data/clubData';
import { Trophy, Users, MapPin, Calendar, Clock, Shirt } from 'lucide-react';

interface MatchesTabProps {
  onOpenTickets: (match: Match) => void;
  onBack?: () => void;
  onOpenMenu?: () => void;
}

export const MatchesTab: React.FC<MatchesTabProps> = ({
  onOpenTickets,
  onBack,
  onOpenMenu,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'standings' | 'past'>('upcoming');
  const [showMatchDetailsModal, setShowMatchDetailsModal] = useState(false);

  // Live countdown timer state (3 days, 5 hours, 12 mins, 30 secs)
  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 5,
    minutes: 12,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const standingsData = [
    { rank: 1, team: 'نادي الرجاء العراقي', p: 3, w: 2, d: 0, l: 1, pts: 6, isWahda: true },
    { rank: 2, team: 'الشاوي', p: 3, w: 2, d: 0, l: 1, pts: 6, isWahda: false },
    { rank: 3, team: 'النجوم', p: 3, w: 1, d: 1, l: 1, pts: 4, isWahda: false },
    { rank: 4, team: 'الأهلي', p: 3, w: 1, d: 1, l: 1, pts: 4, isWahda: false },
    { rank: 5, team: 'الكرخ', p: 3, w: 1, d: 0, l: 2, pts: 3, isWahda: false },
    { rank: 6, team: 'الرمادي', p: 3, w: 0, d: 2, l: 1, pts: 2, isWahda: false },
  ];

  return (
    <div id="matches-screen" className="screen active">
      {/* الترويسة العلوية (الكليشة 5) */}
      <div className="screen-header">
        <i
          className="fa-solid fa-chevron-right back-icon"
          onClick={onBack}
          title="الرجوع"
        ></i>
        <h2 className="header-title">المباريات</h2>
        <i
          className="fa-solid fa-bars menu-icon"
          onClick={onOpenMenu}
          title="القائمة"
        ></i>
      </div>

      {/* شريط التبويبات (الكليشة 5) */}
      <div className="matches-tabs">
        <button
          type="button"
          onClick={() => setActiveTab('upcoming')}
          className={`match-tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
        >
          القادمة
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('standings')}
          className={`match-tab-btn ${activeTab === 'standings' ? 'active' : ''}`}
        >
          جدول البطولات
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('past')}
          className={`match-tab-btn ${activeTab === 'past' ? 'active' : ''}`}
        >
          السابقة
        </button>
      </div>

      <div className="matches-content">
        {/* TAB 1: القادمة (الكليشة 5 الأساسية) */}
        {activeTab === 'upcoming' && (
          <>
            {/* معلومات الجولة */}
            <div className="league-info">
              <h4>دوري الدرجة الثالثة</h4>
              <p>الجولة 3</p>
            </div>

            {/* بطاقة المباراة القادمة البيضاء */}
            <div className="main-match-card">
              <div className="teams-row">
                <div className="team-info">
                  <div className="w-[55px] h-[55px] rounded-full bg-[#e30613]/10 border border-[#e30613]/20 flex items-center justify-center overflow-hidden">
                    <LionLogo size={42} />
                  </div>
                  <span>الرجاء العراقي</span>
                </div>
                <div className="match-details">
                  <div className="vs">VS</div>
                </div>
                <div className="team-info">
                  <div className="w-[55px] h-[55px] rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-black text-lg text-slate-700 shadow-inner">
                    ش
                  </div>
                  <span>الشاوي</span>
                </div>
              </div>

              <div className="match-time-loc">
                <p>الجمعة 25 أيلول 2026</p>
                <p>الساعة 4:00 مساءً</p>
                <p className="stadium">ملعب بابل</p>
              </div>

              {/* العداد التنازلي التفاعلي */}
              <div className="countdown">
                <div className="count-box">
                  <span className="number">{countdown.days}</span>
                  <span className="label">أيام</span>
                </div>
                <div className="count-box">
                  <span className="number">{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="label">ساعات</span>
                </div>
                <div className="count-box">
                  <span className="number">{String(countdown.minutes).padStart(2, '0')}</span>
                  <span className="label">دقيقة</span>
                </div>
                <div className="count-box">
                  <span className="number">{String(countdown.seconds).padStart(2, '0')}</span>
                  <span className="label">ثانية</span>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="match-actions">
                <button
                  type="button"
                  onClick={() => setShowMatchDetailsModal(true)}
                  className="action-btn outline-btn"
                >
                  تفاصيل المباراة
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenTickets({
                      id: 'm-shawi-upcoming',
                      opponent: 'الشاوي',
                      opponentLogoText: 'الشاوي',
                      date: 'الجمعة 25 أيلول 2026',
                      time: '4:00 مساءً',
                      stadium: 'ملعب بابل',
                      competition: 'دوري الدرجة الثالثة · الجولة 3',
                      status: 'upcoming',
                      isHome: true,
                      ticketPrice: 35,
                    })
                  }
                  className="action-btn red-btn"
                >
                  شراء التذاكر
                </button>
              </div>
            </div>

            {/* قسم آخر المباريات */}
            <div className="section-title">آخر المباريات</div>

            <div className="recent-matches-list">
              {/* مباراة سابقة 1 (فوز) */}
              <div
                className="recent-match-item cursor-pointer"
                onClick={() => setShowMatchDetailsModal(true)}
              >
                <span className="result-badge win">فوز</span>
                <div className="recent-teams">
                  <span>النجوم</span>
                  <div className="recent-score-col">
                    <span className="recent-score">2 - 0</span>
                    <span className="recent-date">2026/09/10</span>
                  </div>
                  <span className="text-[#e30613]">الرجاء العراقي</span>
                </div>
              </div>

              {/* مباراة سابقة 2 (تعادل) */}
              <div
                className="recent-match-item cursor-pointer"
                onClick={() => setShowMatchDetailsModal(true)}
              >
                <span className="result-badge draw">تعادل</span>
                <div className="recent-teams">
                  <span>الأهلي</span>
                  <div className="recent-score-col">
                    <span className="recent-score">1 - 1</span>
                    <span className="recent-date">2026/09/05</span>
                  </div>
                  <span className="text-[#e30613]">الرجاء العراقي</span>
                </div>
              </div>

              {/* مباراة سابقة 3 (خسارة) */}
              <div
                className="recent-match-item cursor-pointer"
                onClick={() => setShowMatchDetailsModal(true)}
              >
                <span className="result-badge loss">خسارة</span>
                <div className="recent-teams">
                  <span>الكرخ</span>
                  <div className="recent-score-col">
                    <span className="recent-score">0 - 3</span>
                    <span className="recent-date">2026/08/28</span>
                  </div>
                  <span className="text-[#e30613]">الرجاء العراقي</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: جدول البطولات */}
        {activeTab === 'standings' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="league-info">
              <h4>جدول ترتيب دوري الدرجة الثالثة</h4>
              <p>الموسم الرياضي 2026 / 2027</p>
            </div>

            <div className="bg-[#121c2e] border border-white/5 rounded-2xl overflow-hidden shadow-lg">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-white/5 text-[#8c96aa] border-b border-white/5">
                    <th className="py-3 px-3">#</th>
                    <th className="py-3 px-2">النادي</th>
                    <th className="py-3 px-2 text-center">لعب</th>
                    <th className="py-3 px-2 text-center">فوز</th>
                    <th className="py-3 px-2 text-center">تعادل</th>
                    <th className="py-3 px-2 text-center">خسارة</th>
                    <th className="py-3 px-3 text-center font-bold text-white">النقاط</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {standingsData.map((row) => (
                    <tr
                      key={row.rank}
                      className={`transition-colors ${
                        row.isWahda
                          ? 'bg-[#e30613]/15 font-bold text-white'
                          : 'hover:bg-white/[0.02] text-slate-300'
                      }`}
                    >
                      <td className="py-3 px-3 text-center font-mono">
                        <span
                          className={`inline-block w-5 h-5 rounded-full text-center leading-5 text-[11px] ${
                            row.rank === 1
                              ? 'bg-[#d4af37] text-black font-extrabold'
                              : 'text-[#8c96aa]'
                          }`}
                        >
                          {row.rank}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          {row.isWahda && <LionLogo size={18} />}
                          <span className={row.isWahda ? 'text-white font-extrabold' : ''}>
                            {row.team}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center font-mono">{row.p}</td>
                      <td className="py-3 px-2 text-center font-mono text-emerald-400">{row.w}</td>
                      <td className="py-3 px-2 text-center font-mono text-slate-400">{row.d}</td>
                      <td className="py-3 px-2 text-center font-mono text-rose-400">{row.l}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-white">
                        {row.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#121c2e] p-3 rounded-xl border border-white/5 text-[11px] text-[#8c96aa] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
              <span>المركز الأول يتأهل مباشرةً إلى دوري الدرجة الثانية.</span>
            </div>
          </div>
        )}

        {/* TAB 3: السابقة */}
        {activeTab === 'past' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="league-info">
              <h4>نتائج مباريات نادي الرجاء العراقي السابقة</h4>
              <p>دوري الدرجة الثالثة وكأس الاتحاد</p>
            </div>

            <div className="recent-matches-list">
              <div className="recent-match-item">
                <span className="result-badge win">فوز</span>
                <div className="recent-teams">
                  <span>النجوم</span>
                  <div className="recent-score-col">
                    <span className="recent-score">2 - 0</span>
                    <span className="recent-date">2026/09/10</span>
                  </div>
                  <span className="text-[#e30613]">الرجاء العراقي</span>
                </div>
              </div>

              <div className="recent-match-item">
                <span className="result-badge draw">تعادل</span>
                <div className="recent-teams">
                  <span>الأهلي</span>
                  <div className="recent-score-col">
                    <span className="recent-score">1 - 1</span>
                    <span className="recent-date">2026/09/05</span>
                  </div>
                  <span className="text-[#e30613]">الرجاء العراقي</span>
                </div>
              </div>

              <div className="recent-match-item">
                <span className="result-badge loss">خسارة</span>
                <div className="recent-teams">
                  <span>الكرخ</span>
                  <div className="recent-score-col">
                    <span className="recent-score">0 - 3</span>
                    <span className="recent-date">2026/08/28</span>
                  </div>
                  <span className="text-[#e30613]">الرجاء العراقي</span>
                </div>
              </div>

              <div className="recent-match-item">
                <span className="result-badge win">فوز</span>
                <div className="recent-teams">
                  <span>الرمادي</span>
                  <div className="recent-score-col">
                    <span className="recent-score">3 - 1</span>
                    <span className="recent-date">2026/08/15</span>
                  </div>
                  <span className="text-[#e30613]">الرجاء العراقي</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Match Details Interactive Modal */}
      {showMatchDetailsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#121c2e] border border-white/10 rounded-2xl p-6 max-w-sm w-full text-right">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
              <h3 className="font-extrabold text-base text-white">تفاصيل لقاء القمة</h3>
              <button
                type="button"
                onClick={() => setShowMatchDetailsModal(false)}
                className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[#8c96aa] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-white">
              <div className="bg-[#070d1a] p-3 rounded-xl flex items-center justify-between">
                <span className="text-[#8c96aa]">البطولة:</span>
                <span className="font-bold">دوري الدرجة الثالثة · الجولة 3</span>
              </div>
              <div className="bg-[#070d1a] p-3 rounded-xl flex items-center justify-between">
                <span className="text-[#8c96aa]">المكان:</span>
                <span className="font-bold">ملعب بابل</span>
              </div>
              <div className="bg-[#070d1a] p-3 rounded-xl flex items-center justify-between">
                <span className="text-[#8c96aa]">الموعد:</span>
                <span className="font-bold">الجمعة 25 أيلول 2026 · 4:00 م</span>
              </div>
              <div className="bg-[#070d1a] p-3 rounded-xl flex items-center justify-between">
                <span className="text-[#8c96aa]">حكم المباراة:</span>
                <span className="font-bold">طاقم تحكيم دولي اتحادي</span>
              </div>
              <div className="bg-[#070d1a] p-3 rounded-xl flex items-center justify-between">
                <span className="text-[#8c96aa]">القناة الناقلة:</span>
                <span className="font-bold text-[#d4af37]">قناة الاتحاد الرياضية + تطبيق نادي الرجاء العراقي</span>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                type="button"
                onClick={() => {
                  setShowMatchDetailsModal(false);
                  onOpenTickets({
                    id: 'm-shawi-upcoming',
                    opponent: 'الشاوي',
                    opponentLogoText: 'الشاوي',
                    date: 'الجمعة 25 أيلول 2026',
                    time: '4:00 مساءً',
                    stadium: 'ملعب بابل',
                    competition: 'دوري الدرجة الثالثة · الجولة 3',
                    status: 'upcoming',
                    isHome: true,
                    ticketPrice: 35,
                  });
                }}
                className="flex-1 py-3 rounded-xl bg-[#e30613] hover:bg-[#c40510] text-white font-bold text-xs"
              >
                شراء التذاكر الآن
              </button>
              <button
                type="button"
                onClick={() => setShowMatchDetailsModal(false)}
                className="py-3 px-4 rounded-xl bg-white/5 text-[#8c96aa] hover:text-white font-semibold text-xs"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
