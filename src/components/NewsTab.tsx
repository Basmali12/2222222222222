import React, { useState } from 'react';
import { NewsItem } from '../data/clubData';
import { LionLogo } from './LionLogo';

interface NewsTabProps {
  onSelectNews: (news: NewsItem) => void;
  onBack?: () => void;
  onOpenMenu?: () => void;
}

interface NewsCardItem {
  id: string;
  category: 'أخبار' | 'تقارير' | 'تصريحات' | 'صور' | 'فيديو';
  title: string;
  date: string;
  views: string;
  likes?: number;
  liked?: boolean;
  image?: string;
  imageAlt?: string;
  isCompact?: boolean;
  content: string;
}

export const NewsTab: React.FC<NewsTabProps> = ({ onSelectNews, onBack, onOpenMenu }) => {
  const [activeCategory, setActiveCategory] = useState<'أخبار' | 'تقارير' | 'تصريحات' | 'صور' | 'فيديو'>('أخبار');

  const [articles, setArticles] = useState<NewsCardItem[]>([
    {
      id: 'news-1',
      category: 'أخبار',
      title: 'مدرب الرجاء العراقي: جاهزون للمباراة القادمة ونسعى لتحقيق الفوز',
      date: '2026/09/20',
      views: '1.2K',
      likes: 92,
      liked: false,
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'خبر مدرب الرجاء العراقي',
      content:
        'أكد المدير الفني لنادي الرجاء العراقي في المؤتمر الصحفي التقديمي لمباراة الفريق القادمة جاهزية جميع اللاعبين لخوض اللقاء. وأوضح المدرب أن المعنويات عالية وأن الفريق تدرب بحماس وتركيز كامل لحصد النقاط الثلاث وإسعاد جماهير فرسان الرافدين.',
    },
    {
      id: 'news-2',
      category: 'أخبار',
      title: 'تدريبات الفريق استعداداً لمواجهة الدوري',
      date: '2026/09/19',
      views: '856',
      likes: 64,
      liked: false,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'تدريبات الفريق',
      content:
        'أجرى الفريق الأول لكرة القدم بنادي الرجاء العراقي حصة تدريبية مكثفة مساء اليوم على الملعب الرئيسي، واشتمل المران على تدريبات تكتيكية وبدنية خاصة وتطبيق خطة اللعب للمواجهة المرتقبة.',
    },
    {
      id: 'news-3',
      category: 'أخبار',
      title: 'إدارة النادي تعلن عن تصميم الزي الجديد',
      date: '2026/09/18',
      views: '620',
      isCompact: true,
      content:
        'كشفت إدارة نادي الرجاء العراقي رسمياً عن الطقم الأساسي والاحتياطي للموسم الرياضي 2026-2025 بتصميم عصري يمزج بين ألوان النادي التاريخية والتفاصيل الذهبية المستوحاة من درع البطولة.',
    },
    {
      id: 'news-4',
      category: 'أخبار',
      title: 'صور من تدريبات الفريق اليوم',
      date: '2026/09/18',
      views: '1.1K',
      isCompact: true,
      content:
        'شهدت تدريبات الفريق الأول أجواء إيجابية وروحاً قتالية عالية وسط حضور إداري وجماهيري لدعم اللاعبين قبل الجولة القادمة.',
    },

    // تقارير
    {
      id: 'news-5',
      category: 'تقارير',
      title: 'تقرير فني: قراءة تحليلية لنقاط قوة منافس الرجاء العراقي قبل اللقاء',
      date: '2026/09/17',
      views: '940',
      likes: 45,
      liked: false,
      image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'تقرير فني',
      content:
        'يستعرض التقرير أبرز نقاط القوة والضعف في التشكيلة المنافسة وطريقة بناء الهجمات، وكيف يخطط الجهاز الفني لنادي الرجاء العراقي لفرض أسلوبه الهجومي منذ الدقائق الأولى.',
    },
    {
      id: 'news-6',
      category: 'تقارير',
      title: 'إحصائيات: هجوم الرجاء العراقي الأقوى في الجولات الافتتاحية للموسم',
      date: '2026/09/16',
      views: '730',
      isCompact: true,
      content:
        'أظهرت إحصائيات دوري نجوم العراق تفوق خط هجوم الرجاء العراقي كأكثر الفرق تسجيلاً وصناعة للفرص المحققة بنسبة نجاح بلغت 78%.',
    },

    // تصريحات
    {
      id: 'news-7',
      category: 'تصريحات',
      title: 'كابتن الفريق: نعد جماهيرنا بتقديم كل ما نملك على أرضية الملعب',
      date: '2026/09/18',
      views: '1.4K',
      likes: 110,
      liked: false,
      image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'تصريح كابتن الفريق',
      content:
        'في حديث خاص للمركز الإعلامي، وجه قائد الفريق رسالة شكر لجمهور الرجاء العراقي مؤكداً أن دعمهم في المدرجات هو الوقود الحقيقي لتحقيق الانتصارات المتتالية.',
    },
    {
      id: 'news-8',
      category: 'تصريحات',
      title: 'رئيس شركة الكرة: الاستقرار الفني والإداري هو سر تطور الفريق',
      date: '2026/09/15',
      views: '880',
      isCompact: true,
      content:
        'ثمّن رئيس شركة كرة القدم جهود الجهازين الفني والإداري واللاعبين، مشيداً بالانضباط والعمل الجماعي المتواصل في سبيل رفعة اسم النادي.',
    },

    // صور
    {
      id: 'news-9',
      category: 'صور',
      title: 'ألبوم صور: الحصة التدريبية المسائية ومدرجات أصحاب السعادة',
      date: '2026/09/19',
      views: '2.3K',
      likes: 185,
      liked: false,
      image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'ألبوم صور المدرجات',
      content:
        'مجموعة حصرية من لقطات الكاميرا الخاصة بالنادي ترصد حماس اللاعبين وهتافات المشجعين في مدرجات التدريب المفتوحة.',
    },

    // فيديو
    {
      id: 'news-10',
      category: 'فيديو',
      title: 'فيديو: ملخص وأهداف آخر مواجهات الرجاء العراقي والأجواء الحماسية',
      date: '2026/09/17',
      views: '3.5K',
      likes: 240,
      liked: false,
      image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80',
      imageAlt: 'فيديو الملخص',
      content:
        'شاهد بالفيديو أبرز لقطات الفوز والأهداف الرائعة وردود أفعال المدرج الوحداوي بعد إطلاق صافرة النهاية.',
    },
  ]);

  const handleToggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setArticles((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = !item.liked;
          return {
            ...item,
            liked: isLiked,
            likes: (item.likes || 0) + (isLiked ? 1 : -1),
          };
        }
        return item;
      })
    );
  };

  const handleCardClick = (article: NewsCardItem) => {
    onSelectNews({
      id: article.id,
      title: article.title,
      date: article.date,
      category: article.category,
      readTime: '3 دقائق',
      summary: article.content.slice(0, 100) + '...',
      content: article.content,
      imageBg: 'from-[#17274a] to-[#070d1a]',
    });
  };

  const displayedArticles = articles.filter(
    (item) => item.category === activeCategory
  );

  return (
    <div id="news-screen" className="screen active w-full h-full flex flex-col relative">
      {/* الترويسة العلوية (الكليشة 4) */}
      <div className="screen-header">
        <i
          className="fa-solid fa-chevron-right back-icon"
          onClick={onBack}
          title="رجوع"
        ></i>
        <h2 className="header-title">الأخبار</h2>
        <i
          className="fa-solid fa-bars menu-icon"
          onClick={onOpenMenu}
          title="القائمة"
        ></i>
      </div>

      {/* شريط التبويبات (الكليشة 4) */}
      <div className="tabs-container">
        {(['أخبار', 'تقارير', 'تصريحات', 'صور', 'فيديو'] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeCategory === tab ? 'active' : ''}`}
            onClick={() => setActiveCategory(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* قائمة الأخبار (الكليشة 4) */}
      <div className="news-list">
        {displayedArticles.length > 0 ? (
          displayedArticles.map((item) => (
            <div
              key={item.id}
              className={`news-card ${item.isCompact ? 'compact-card' : ''} cursor-pointer`}
              onClick={() => handleCardClick(item)}
            >
              {/* صورة الخبر (تختفي في البطاقات المصغرة عبر CSS) */}
              {!item.isCompact && (
                <div className="relative overflow-hidden group">
                  <img
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    className="news-image transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-[#e30613] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    {item.category}
                  </div>
                  {item.category === 'فيديو' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 rounded-full bg-[#e30613] text-white flex items-center justify-center shadow-lg">
                        <i className="fa-solid fa-play mr-[-2px]"></i>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* محتوى الخبر */}
              <div className="news-content">
                <h3 className="news-title">{item.title}</h3>
                <div className="news-meta">
                  <span className="news-date">{item.date}</span>
                  <div className="news-stats">
                    <span>
                      <i className="fa-regular fa-eye"></i> {item.views}
                    </span>
                    {item.likes !== undefined && (
                      <span
                        onClick={(e) => handleToggleLike(e, item.id)}
                        className={`cursor-pointer transition-colors ${
                          item.liked ? 'text-[#e30613] font-bold' : 'hover:text-[#e30613]'
                        }`}
                        title="إعجاب"
                      >
                        <i className={`${item.liked ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>{' '}
                        {item.likes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-[#8c96aa]">
            <LionLogo size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold text-white">لا توجد أخبار في هذا القسم حالياً</p>
            <p className="text-xs mt-1">تابعنا لموافاتك بآخر المستجدات أولاً بأول</p>
          </div>
        )}
      </div>
    </div>
  );
};
