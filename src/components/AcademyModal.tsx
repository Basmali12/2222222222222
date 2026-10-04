import React, { useState } from 'react';
import { LionLogo } from './LionLogo';

interface AcademyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcademyModal: React.FC<AcademyModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    age: '12',
    phone: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#121c2e] border border-white/10 rounded-3xl p-5 max-w-sm w-full text-right shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-graduation-cap text-[#d4af37]"></i>
            <span className="text-xs font-bold text-white">أكاديمية الرجاء العراقي للناشئين</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#8c96aa] hover:text-white"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="font-extrabold text-base text-white">تم استلام طلب التسجيل بنجاح!</h3>
            <p className="text-xs text-[#8c96aa] max-w-xs mx-auto">
              سيتواصل معك المشرف الفني لأكاديمية الرجاء العراقي لتحديد موعد اختبارات الأداء في مقر النادي.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="py-2.5 px-6 bg-[#e30613] text-white rounded-xl text-xs font-bold hover:bg-[#c40510]"
            >
              تم
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="p-3 bg-[#070d1a] rounded-2xl border border-white/5 text-xs text-[#8c96aa] leading-relaxed">
              تخرّج أكاديمية نادي الرجاء العراقي ألمع نجوم الكرة، مع إشراف مدربين معتمدين ومرافق تدريبية على أعلى المستويات.
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#8c96aa] mb-1">
                اسم اللاعب (المشترك)
              </label>
              <input
                type="text"
                required
                value={formData.childName}
                onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                placeholder="مثال: راشد خالد"
                className="w-full bg-[#070d1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#8c96aa] focus:outline-none focus:border-[#e30613]"
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-[11px] font-semibold text-[#8c96aa] mb-1">
                  الفئة العمرية
                </label>
                <select
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full bg-[#070d1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e30613]"
                >
                  <option value="6-8">6 - 8 سنوات (براعم)</option>
                  <option value="9-12">9 - 12 سنة (أشبال)</option>
                  <option value="13-16">13 - 16 سنة (ناشئين)</option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-[11px] font-semibold text-[#8c96aa] mb-1">
                  رقم ولي الأمر
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="050xxxxxxx"
                  className="w-full bg-[#070d1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#8c96aa] focus:outline-none focus:border-[#e30613]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#e30613] hover:bg-[#c40510] text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer"
            >
              إرسال طلب التسجيل
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
