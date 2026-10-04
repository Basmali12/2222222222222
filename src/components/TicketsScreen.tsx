import React, { useState } from 'react';
import { Match, UPCOMING_MATCH } from '../data/clubData';
import { CheckCircle, QrCode, Ticket as TicketIcon } from 'lucide-react';
import { LionLogo } from './LionLogo';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  color: string;
  qty: number;
}

interface TicketsScreenProps {
  match?: Match | null;
  onBack: () => void;
  onOpenMenu: () => void;
  onSuccessBooking?: (ticket: {
    id: string;
    matchTitle: string;
    date: string;
    stadium: string;
    category: string;
    seats: number;
    total: number;
    code: string;
  }) => void;
}

export const TicketsScreen: React.FC<TicketsScreenProps> = ({
  match = UPCOMING_MATCH,
  onBack,
  onOpenMenu,
  onSuccessBooking,
}) => {
  // Ticket tiers as specified in Template 9: VIP, درجة أولى, درجة ثانية, درجة ثالثة
  const [tiers, setTiers] = useState<TicketTier[]>([
    { id: 'vip', name: 'VIP', price: 25000, color: '#ffd700', qty: 0 },
    { id: 'first', name: 'درجة أولى', price: 15000, color: '#e30613', qty: 1 },
    { id: 'second', name: 'درجة ثانية', price: 10000, color: '#10b981', qty: 1 },
    { id: 'third', name: 'درجة ثالثة', price: 5000, color: '#3b82f6', qty: 1 },
  ]);

  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  const updateQty = (id: string, delta: number) => {
    setTiers((prev) =>
      prev.map((tier) => {
        if (tier.id === id) {
          const newQty = Math.max(0, tier.qty + delta);
          return { ...tier, qty: newQty };
        }
        return tier;
      })
    );
  };

  // Calculate total price and count
  const totalAmount = tiers.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const totalSeats = tiers.reduce((acc, curr) => acc + curr.qty, 0);

  const handleCheckout = () => {
    if (totalSeats === 0) {
      alert('يرجى اختيار تذكرة واحدة على الأقل');
      return;
    }

    const selectedTiersSummary = tiers
      .filter((t) => t.qty > 0)
      .map((t) => `${t.name} (${t.qty})`)
      .join(', ');

    const randomCode = 'RAJ-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking = {
      id: 't-' + Date.now(),
      matchTitle: match ? `الرجاء العراقي vs ${match.opponent}` : 'الرجاء العراقي vs الزوراء',
      date: match?.date ? `${match.date} · ${match.time}` : 'السبت 4 تشرين الأول · الساعة 8:30 مساءً',
      stadium: match?.stadium || 'ملعب الشعب الدولي - بغداد',
      category: selectedTiersSummary,
      seats: totalSeats,
      total: totalAmount,
      code: randomCode,
    };

    setBookingSuccess(newBooking);
    if (onSuccessBooking) {
      onSuccessBooking(newBooking);
    }
  };

  return (
    <div id="tickets-screen" className="screen active">
      {/* الترويسة العلوية */}
      <div className="screen-header">
        <i
          className="fa-solid fa-chevron-right back-icon"
          onClick={onBack}
          role="button"
          title="رجوع"
        ></i>
        <h2 className="header-title">التذاكر</h2>
        <i
          className="fa-solid fa-bars menu-icon"
          onClick={onOpenMenu}
          role="button"
          title="القائمة"
        ></i>
      </div>

      <div className="tickets-content">
        {/* معلومات المباراة العلوية */}
        <div className="ticket-match-info">
          <div className="t-teams-row">
            <div className="t-team flex items-center justify-center">
              <div className="w-12 h-12 flex items-center justify-center">
                <LionLogo size={46} />
              </div>
            </div>
            <div className="t-vs-details">
              <span className="t-vs">VS</span>
            </div>
            <div className="t-team flex items-center justify-center">
              {match?.opponentLogoText ? (
                <div className="w-12 h-12 rounded-full bg-[#1b263b] border border-white/10 flex items-center justify-center font-black text-sm text-[#38bdf8]">
                  {match.opponentLogoText.slice(0, 3)}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center font-black text-sm text-white">
                  الشاوي
                </div>
              )}
            </div>
          </div>
          <div className="t-date-time">
            <p>
              {match ? `${match.date}` : 'الجمعة 25 أيلول'} <br />{' '}
              {match ? `الساعة ${match.time}` : 'الساعة 4:00 مساءً'}
            </p>
            <p className="t-stadium">{match?.stadium || 'ملعب بابل'}</p>
          </div>
        </div>

        {/* قائمة درجات التذاكر */}
        <div className="tickets-list">
          {tiers.map((tier) => (
            <div key={tier.id} className="ticket-row">
              <div className="ticket-type-info">
                <span
                  className="color-dot"
                  style={{ backgroundColor: tier.color }}
                ></span>
                <span className="ticket-name">{tier.name}</span>
              </div>
              <div className="ticket-price">
                {tier.price.toLocaleString()} <small>د.ع</small>
              </div>
              <div className="qty-selector">
                <button
                  type="button"
                  className="qty-btn plus"
                  onClick={() => updateQty(tier.id, 1)}
                  title="زيادة"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
                <span className="qty-num">{tier.qty}</span>
                <button
                  type="button"
                  className="qty-btn minus"
                  onClick={() => updateQty(tier.id, -1)}
                  title="إنقاص"
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* قسم الإجمالي وإتمام الشراء (ثابت في الأسفل) */}
      <div className="checkout-footer">
        <div className="total-row">
          <span className="total-label">المجموع</span>
          <span className="total-amount">
            {totalAmount.toLocaleString()} <small>د.ع</small>
          </span>
        </div>
        <button
          className="btn-primary"
          style={{ width: '100%', borderRadius: '15px' }}
          onClick={handleCheckout}
        >
          إتمام الشراء
        </button>
      </div>

      {/* نافذة نجاح الحجز المنبثقة */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-[#0a1120] border border-white/10 rounded-3xl p-6 text-center text-white relative shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black mb-1">تم تأكيد حجز التذاكر!</h3>
            <p className="text-xs text-[#8c96aa] mb-4">
              تم إضافة التذاكر إلى محفظتك الإلكترونية وبطاقتك الرقمية
            </p>

            <div className="bg-[#121c2e] p-4 rounded-2xl border border-white/5 text-right space-y-2 mb-4 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8c96aa]">المباراة</span>
                <span className="font-bold text-white">{bookingSuccess.matchTitle}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8c96aa]">التاريخ والوقت</span>
                <span className="font-bold text-white">{bookingSuccess.date}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8c96aa]">الملعب</span>
                <span className="font-bold text-white">{bookingSuccess.stadium}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8c96aa]">الدرجات المحجوزة</span>
                <span className="font-bold text-[#d4af37]">{bookingSuccess.category}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#8c96aa]">المقاعد</span>
                <span className="font-bold text-white">{bookingSuccess.seats} تذاكر</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#8c96aa]">الإجمالي</span>
                <span className="font-black text-[#e30613] text-sm">
                  {bookingSuccess.total.toLocaleString()} د.ع
                </span>
              </div>
            </div>

            {/* رمز الباركود */}
            <div className="p-3 bg-white rounded-xl inline-block mb-3">
              <div className="flex items-center justify-center gap-1">
                <QrCode className="w-20 h-20 text-black" />
              </div>
              <div className="text-[10px] text-black font-mono font-bold mt-1">
                {bookingSuccess.code}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setBookingSuccess(null);
                  onBack();
                }}
                className="flex-1 py-3 bg-[#e30613] hover:bg-[#c20510] text-white font-bold text-xs rounded-xl transition"
              >
                العودة للتطبيق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
