import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ShoppingBag, ArrowLeft } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options?: string;
}

interface CartModalProps {
  items: CartItem[];
  onClose: () => void;
  onClear: () => void;
  onRemoveItem: (index: number) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  items,
  onClose,
  onClear,
  onRemoveItem,
}) => {
  const [ordered, setOrdered] = useState(false);

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const delivery = subtotal > 0 ? 20 : 0;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    setOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#0a1120] border border-white/10 rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto p-5 text-white animate-in slide-in-from-bottom duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#e30613]" />
            <h3 className="font-bold text-base text-white">حقيبة التسوق</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#8c96aa] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!ordered ? (
          <div className="mt-4 space-y-4">
            {items.length === 0 ? (
              <div className="py-12 text-center text-[#8c96aa]">
                <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-40 text-slate-400" />
                <p className="text-sm">حقيبة التسوق فارغة حالياً</p>
                <p className="text-xs text-[#8c96aa] mt-1">تصفح أطقم وشالات النادي وأضفها هنا</p>
              </div>
            ) : (
              <>
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#121c2e] p-3 rounded-2xl border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.name}</h4>
                        {item.options && (
                          <p className="text-[10px] text-[#d4af37] font-semibold mt-0.5">
                            {item.options}
                          </p>
                        )}
                        <span className="text-xs font-mono font-bold text-white mt-1 block">
                          {item.price} د.إ
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-[#8c96aa] hover:text-[#e30613] p-1.5 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="bg-[#121c2e] p-3.5 rounded-2xl border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-[#8c96aa]">
                    <span>المجموع الفرعي:</span>
                    <span className="font-mono text-white font-bold">{subtotal} د.إ</span>
                  </div>
                  <div className="flex justify-between text-[#8c96aa]">
                    <span>رسوم التوصيل السريع (داخل الإمارات):</span>
                    <span className="font-mono text-white font-bold">{delivery} د.إ</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                    <span>الإجمالي:</span>
                    <span className="text-[#d4af37] font-mono text-base">{total} د.إ</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#e30613] hover:bg-[#c40510] text-white py-3.5 rounded-full font-bold text-sm cursor-pointer transition-all active:scale-95 shadow-[0_4px_15px_rgba(227,6,19,0.35)] flex items-center justify-center gap-2"
                >
                  <span>إتمام الطلب والدفع</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-white">تم استلام طلبك بنجاح!</h4>
            <p className="text-xs text-[#8c96aa]">
              رقم الطلب: <span className="font-mono text-white font-bold">#WHD-9842</span>
            </p>
            <p className="text-xs text-slate-300">
              سيتم تجهيز طلبك وشحنه مباشرة إلى عنوانك المسجل خلال 24 ساعة.
            </p>
            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="mt-4 w-full bg-white/10 hover:bg-white/15 text-white py-3 rounded-full text-xs font-bold transition-all"
            >
              متابعة التسوق
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
