import React, { useState } from 'react';
import { LionLogo } from './LionLogo';

export const CommunityTab: React.FC = () => {
  const [pollVoted, setPollVoted] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'ماجد الوحداوي',
      badge: 'مشجع موسمي',
      time: 'منذ 25 دقيقة',
      content: 'جاهزون لمواجهة الشاوي على ملعب بابل! كل الدعم للفهود وأصحاب السعادة 🔴⚽',
      likes: 42,
      isLiked: false,
    },
    {
      id: 2,
      author: 'سعيد بن راشد',
      badge: 'عضو ذهبي',
      time: 'منذ ساعة',
      content: 'الفريق في أفضل حالاته هذا الموسم، التشكيلة متكاملة وبإذن الله النقاط الثلاث رجاوية!',
      likes: 68,
      isLiked: true,
    },
    {
      id: 3,
      author: 'رابطة مشجعي الرجاء العراقي',
      badge: 'حساب موثق',
      time: 'منذ 3 ساعات',
      content: 'تجمع الجماهير سيكون في البوابة رقم 4 قبل بداية المباراة بساعتين. احضروا الأعلام والشالات الحمراء!',
      likes: 115,
      isLiked: false,
    },
  ]);

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            isLiked: !p.isLiked,
          };
        }
        return p;
      })
    );
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: 'سلطان الشامسي',
        badge: 'عضو ذهبي',
        time: 'الآن',
        content: newComment,
        likes: 1,
        isLiked: true,
      },
      ...posts,
    ]);
    setNewComment('');
  };

  return (
    <div className="w-full h-full pb-24 text-white overflow-y-auto fade-in-screen">
      {/* Header */}
      <div className="home-header">
        <div className="header-logo-side">
          <div className="w-10 h-10 rounded-full bg-[#121c2e] border border-white/10 flex items-center justify-center">
            <LionLogo size={32} />
          </div>
          <div>
            <h3>مجتمع الوحداوية</h3>
            <span>أصحاب السعادة</span>
          </div>
        </div>
        <div className="text-xs font-bold text-white bg-[#e30613] px-3 py-1 rounded-full">
          مباشر
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Fan Poll Card */}
        <div className="bg-[#121c2e] border border-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#d4af37]">
            <i className="fa-solid fa-chart-pie"></i>
            <span>استطلاع الجمهور للمباراة القادمة</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-3">
            ما هي توقعاتك لنتيجة مواجهة (الرجاء vs الزوراء)؟
          </h4>

          <div className="space-y-2">
            {[
              { id: 'win', label: 'فوز الرجاء بفارق هدفين أو أكثر', pct: '78%' },
              { id: 'draw', label: 'التعادل الإيجابي', pct: '14%' },
              { id: 'other', label: 'فوز الفريق المنافس', pct: '8%' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPollVoted(opt.id)}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all border ${
                  pollVoted === opt.id
                    ? 'bg-[#e30613]/20 border-[#e30613] text-white'
                    : 'bg-[#070d1a] border-white/5 text-[#8c96aa] hover:border-white/20'
                }`}
              >
                <span>{opt.label}</span>
                {pollVoted && (
                  <span className="font-mono font-bold text-white">{opt.pct}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Create Post Input */}
        <form onSubmit={handleAddPost} className="bg-[#121c2e] p-3 rounded-2xl border border-white/5">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="شارك رأيك أو هتافك مع جماهير الرجاء العراقي..."
              className="flex-1 bg-[#070d1a] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#8c96aa] focus:outline-none focus:border-[#e30613]"
            />
            <button
              type="submit"
              className="bg-[#e30613] hover:bg-[#c40510] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              نشر
            </button>
          </div>
        </form>

        {/* Fan Posts Feed */}
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-[#121c2e] border border-white/5 rounded-2xl p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#1b2b4d] border border-white/10 flex items-center justify-center font-bold text-xs text-[#d4af37]">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{post.author}</span>
                      <span className="text-[10px] text-[#e30613] font-normal">
                        ({post.badge})
                      </span>
                    </div>
                    <div className="text-[10px] text-[#8c96aa]">{post.time}</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-white/90 leading-relaxed">{post.content}</p>

              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-[#8c96aa]">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.isLiked ? 'text-[#e30613] font-bold' : 'hover:text-white'
                  }`}
                >
                  <i className={`fa-heart ${post.isLiked ? 'fa-solid' : 'fa-regular'}`}></i>
                  <span>{post.likes}</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="hover:text-white cursor-pointer">
                    <i className="fa-regular fa-comment ml-1"></i>
                    تعليق
                  </span>
                  <span className="hover:text-white cursor-pointer">
                    <i className="fa-solid fa-share-nodes ml-1"></i>
                    مشاركة
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
