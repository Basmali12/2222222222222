import React, { useState } from 'react';
import { Match } from '../data/clubData';
import { X, CheckCircle, Ticket, MapPin, Calendar, Users, QrCode } from 'lucide-react';
import { LionLogo } from './LionLogo';

interface TicketModalProps {
  match: Match;
  onClose: () => void;
  onSuccess: (ticket: {
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

export const TicketModal: React.FC<TicketModalProps> = ({ match, onClose, onSuccess }) => {
  const [tier, setTier] = useState<'standard' | 'first' | 'vip'>('standard');
  const [quantity, setQuantity] = useState(2);
  const [completed, setCompleted] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);

  const tiers = {
    standard: { name: 'مدرج أصحاب السعادة', price: match.ticketPrice || 35, desc: 'أجواء تشجيعية حماسية خلف المرمى' },
    first: { name: 'الدرجة الأولى (واجهة الملعب)', price: (match.ticketPrice || 35) + 40, desc: 'رؤية بانورامية ممتازة لمنتصف الملعب' },
    vip: { name: 'المقصورة الرئيسية VIP', price: 250, desc: 'مقاعد فخمة، ضيافة كاملة ومواقف خاصة' },
  };

  const selectedTier = tiers[tier];
  const totalPrice = selectedTier.price * quantity;

  const handleBooking = () => {
    const randomCode = 'RAJ-' + Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      id: 't-' + Date.now(),
      matchTitle: `الرجاء vs ${match.opponent}`,
      date: `${match.date} · ${match.time}`,
      stadium: match.stadium,
      category: selectedTier.name,
      seats: quantity,
      total: totalPrice,
      code: randomCode,
    };
    setTicketData(newTicket);
    setCompleted(true);
    onSuccess(newTicket);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#0a1120] border border-white/10 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto p-5 text-white animate-in slide-in-from-bottom duration-300">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#e30613]" />
            <h3 className="font-bold text-base text-white">حجز تذاكر المباراة</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#8c96aa] hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!completed ? (
          <div className="mt-4 space-y-4">
            {/* Match info card */}
            <div className="bg-[#121c2e] p-3.5 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-xs text-[#d4af37] font-semibold mb-2">
                <span>{match.competition}</span>
                <span className="text-white/70">{match.time}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-center">
                <div className="flex-1">
                  <div className="w-10 h-10 mx-auto mb-1">
                    <LionLogo size={40} />
                  </div>
                  <span className="text-xs font-bold">الرجاء</span>
                </div>
                <div className="px-3 text-xs text-[#8c96aa] font-bold">VS</div>
                <div className="flex-1">
                  <div className="w-10 h-10 mx-auto mb-1 rounded-full bg-[#1b263b] border border-white/10 flex items-center justify-center font-bold text-xs text-purple-400">
                    {match.opponentLogoText.slice(0, 3)}
                  </div>
                  <span className="text-xs font-bold">{match.opponent}</span>
                </div>
              </div>
              <div className="text-[11px] text-[#8c96aa] flex items-center justify-between pt-2 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#e30613]" />
                  {match.stadium}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {match.date}
                </span>
              </div>
            </div>

            {/* Stadium Pitch Seat Mini Map */}
            <div className="relative bg-[#0d1627] rounded-xl p-3 border border-white/5 text-center">
              <span className="text-[10px] text-[#8c96aa] block mb-2 font-medium">
                توزيع مدرجات استاد آل نهيان
              </span>
              <div className="w-full h-24 border border-emerald-500/30 bg-emerald-950/20 rounded-lg relative flex items-center justify-center overflow-hidden">
                <div className="w-12 h-12 rounded-full border border-emerald-500/20" />
                <div className="absolute inset-y-0 w-px bg-emerald-500/20" />
                <div className="absolute inset-0 flex items-center justify-around pointer-events-none text-[9px] font-bold">
                  <span className="text-amber-300">مدرج الدرجة الأولى</span>
                  <span className="text-red-400">مدرج أصحاب السعادة</span>
                </div>
              </div>
            </div>

            {/* Ticket Tier selection */}
            <div>
              <label className="block text-xs font-semibold text-[#8c96aa] mb-2">
                اختر فئة التذكرة
              </label>
              <div className="space-y-2">
                {(['standard', 'first', 'vip'] as const).map((tKey) => {
                  const t = tiers[tKey];
                  const isSel = tier === tKey;
                  return (
                    <button
                      key={tKey}
                      type="button"
                      onClick={() => setTier(tKey)}
                      className={`w-full p-3 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                        isSel
                          ? 'bg-[#14233c] border-[#e30613] shadow-[0_0_12px_rgba(227,6,19,0.2)]'
                          : 'bg-[#121c2e] border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{t.name}</span>
                          {tKey === 'vip' && (
                            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">VIP</span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#8c96aa] mt-0.5">{t.desc}</div>
                      </div>
                      <div className="text-sm font-black text-[#d4af37] font-mono">
                        {t.price} <span className="text-[10px] font-normal text-[#8c96aa]">د.إ</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between bg-[#121c2e] p-3 rounded-xl border border-white/5">
              <span className="text-xs font-semibold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#8c96aa]" />
                عدد المقاعد
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 text-white font-bold hover:bg-white/10 active:scale-95 transition-all"
                >
                  -
                </button>
                <span className="text-base font-bold text-white font-mono w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(8, quantity + 1))}
                  className="w-8 h-8 rounded-lg bg-white/5 text-white font-bold hover:bg-white/10 active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total and Checkout CTA */}
            <div className="pt-2">
              <div className="flex justify-between items-center text-xs text-[#8c96aa] mb-3">
                <span>المبلغ الإجمالي ({quantity} تذاكر):</span>
                <span className="text-lg font-black text-white font-mono">
                  {totalPrice} <span className="text-xs text-[#d4af37]">د.إ</span>
                </span>
              </div>
              <button
                onClick={handleBooking}
                className="w-full bg-[#e30613] hover:bg-[#c40510] text-white py-3.5 rounded-full font-bold text-sm cursor-pointer transition-all active:scale-95 shadow-[0_4px_15px_rgba(227,6,19,0.35)] flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>تأكيد الحجز والدفع الفوري</span>
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h4 className="text-lg font-black text-white">تم تأكيد حجزك بنجاح!</h4>
            <p className="text-xs text-[#8c96aa]">
              تم إصدار تذكرتك الرقمية وحفظها في محفظة المشجع بحسابك
            </p>

            {/* Ticket Card Preview */}
            <div className="bg-[#121c2e] p-4 rounded-2xl border border-white/10 text-right relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-[#e30613]" />
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h5 className="font-bold text-sm text-white">{ticketData?.matchTitle}</h5>
                  <p className="text-[11px] text-[#8c96aa]">{ticketData?.date}</p>
                </div>
                <div className="p-1 bg-white rounded">
                  <QrCode className="w-8 h-8 text-black" />
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between text-xs">
                <span className="text-[#8c96aa]">{ticketData?.category}</span>
                <span className="font-bold text-white font-mono">
                  {ticketData?.seats} مقاعد · {ticketData?.total} د.إ
                </span>
              </div>
              <div className="mt-2 text-center text-[10px] text-[#d4af37] font-mono tracking-wider">
                رمز البوابة: {ticketData?.code}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-full text-xs font-bold transition-all"
            >
              العودة للرئيسية
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
