import React from 'react';
import { LionLogo } from './LionLogo';
import { Trophy, Ticket, Shield, Bell, QrCode, LogOut, ChevronLeft, Sparkles, RefreshCw } from 'lucide-react';

interface ProfileTabProps {
  user: { name: string; phone: string; role: string };
  tickets: any[];
  onReturnToSplash: () => void;
  onLogout: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  tickets,
  onReturnToSplash,
  onLogout,
}) => {
  return (
    <div id="profile-screen" className="screen active w-full pb-24 text-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#070d1a]/95 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="font-black text-base text-white text-right">ملف المشجع</h2>
          <p className="text-[11px] text-[#8c96aa]">بطاقة العضوية والخدمات الرقمية</p>
        </div>

        <button
          onClick={onReturnToSplash}
          title="عرض شاشة البداية مجدداً"
          className="bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-[#8c96aa] hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#e30613]" />
          <span>شاشة البداية</span>
        </button>
      </div>

      <div className="p-4 space-y-5">
        {/* Digital Fan Membership Card */}
        <div className="relative rounded-3xl p-5 bg-gradient-to-br from-[#1a2538] via-[#101929] to-[#080e1a] border-2 border-[#d4af37]/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Ambient red and gold glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#e30613]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d4af37]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top card bar */}
          <div className="flex items-center justify-between relative z-10 mb-6">
            <div className="flex items-center gap-2">
              <LionLogo size={34} />
              <div>
                <span className="font-black text-xs text-white tracking-wider block">
                  AL RAJAA FC
                </span>
                <span className="text-[9px] text-[#d4af37] font-bold">بطاقة مشجع معتمد</span>
              </div>
            </div>

            <span className="text-[10px] bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] px-2.5 py-0.5 rounded-full font-bold">
              عضوية ذهبية
            </span>
          </div>

          {/* Member Name and ID */}
          <div className="relative z-10 mb-4">
            <span className="text-[10px] text-[#8c96aa] block mb-0.5 font-medium">اسم المشجع</span>
            <h3 className="text-lg font-black text-white">{user.name}</h3>
            <p className="text-xs text-[#8c96aa] font-mono mt-0.5" dir="ltr">
              RAJ-82-8892-04
            </p>
          </div>

          {/* Card footer with barcode & points */}
          <div className="flex items-end justify-between relative z-10 pt-3 border-t border-white/10">
            <div>
              <span className="text-[10px] text-[#8c96aa] block">رصيد النقاط</span>
              <span className="text-base font-black text-[#d4af37] font-mono">
                1,450 <span className="text-[10px] text-[#8c96aa] font-sans">نقطة</span>
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-1 rounded">
                <QrCode className="w-8 h-8 text-black" />
              </div>
              <span className="text-[8px] text-[#8c96aa] font-mono mt-0.5">بوابة 4</span>
            </div>
          </div>
        </div>

        {/* My Booked Tickets Section */}
        <div>
          <h3 className="text-xs font-black text-white mb-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-[#e30613]" />
              <span>تذاكري المحجوزة ({tickets.length})</span>
            </span>
            <span className="text-[10px] text-[#8c96aa]">جاهزة للمسح بالملعب</span>
          </h3>

          {tickets.length === 0 ? (
            <div className="bg-[#121c2e] border border-white/5 rounded-2xl p-4 text-center text-xs text-[#8c96aa]">
              لا توجد تذاكر نشطة حالياً. يمكنك حجز تذاكر مباراة نادي الرجاء العراقي القادمة من تبويب المباريات!
            </div>
          ) : (
            <div className="space-y-2">
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#121c2e] border border-white/10 rounded-2xl p-3.5 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.matchTitle}</h4>
                    <p className="text-[11px] text-[#8c96aa] mt-0.5">{t.date}</p>
                    <p className="text-[10px] text-[#d4af37] font-medium mt-1">
                      {t.category} · {t.seats} مقاعد
                    </p>
                  </div>
                  <div className="text-left">
                    <div className="bg-white p-1 rounded inline-block">
                      <QrCode className="w-7 h-7 text-black" />
                    </div>
                    <span className="block text-[9px] text-[#8c96aa] font-mono mt-0.5">
                      {t.code}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Menu options */}
        <div className="bg-[#121c2e] border border-white/5 rounded-2xl divide-y divide-white/5 overflow-hidden">
          <div className="p-3.5 flex items-center justify-between text-xs">
            <span className="text-[#8c96aa]">رقم الهاتف المسجل</span>
            <span className="font-mono text-white font-bold" dir="ltr">{user.phone}</span>
          </div>

          <div className="p-3.5 flex items-center justify-between text-xs">
            <span className="text-[#8c96aa]">تنبيهات أهداف وبداية المباريات</span>
            <span className="text-emerald-400 font-bold">مفعلة تلقائياً ✓</span>
          </div>

          <div className="p-3.5 flex items-center justify-between text-xs">
            <span className="text-[#8c96aa]">اللغة</span>
            <span className="text-white font-bold">العربية (الافتراضية)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onReturnToSplash}
            className="w-full bg-[#121c2e] hover:bg-[#1a2942] border border-white/10 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-[#e30613]" />
            <span>عرض شاشة البداية (Splash Screen)</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </div>
  );
};
