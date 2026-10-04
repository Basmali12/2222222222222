import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '../data/clubData';

export interface StoreProduct {
  id: string;
  title: string;
  category: 'jerseys' | 'training' | 'accessories';
  price: number;
  image: string;
}

interface StoreTabProps {
  onBack?: () => void;
  onOpenMenu?: () => void;
  onAddToCart: (
    product: Product,
    customOptions?: { name: string; number: number; size: string }
  ) => void;
  cartCount: number;
  onOpenCartModal: () => void;
}

export const StoreTab: React.FC<StoreTabProps> = ({
  onBack,
  onOpenMenu,
  onAddToCart,
  cartCount,
  onOpenCartModal,
}) => {
  // Tabs: 'الكل' | 'التيشيرتات' | 'التدريبات' | 'الإكسسوارات'
  const [activeTab, setActiveTab] = useState<'all' | 'jerseys' | 'training' | 'accessories'>('all');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Products from Template 10
  const products: StoreProduct[] = [
    {
      id: 'prod-1',
      title: 'تيشرت أساسي 2026',
      category: 'jerseys',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1577212017184-80cc0da11082?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'prod-2',
      title: 'تيشرت احتياطي 2026',
      category: 'jerseys',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'prod-3',
      title: 'تيشرت تمرين',
      category: 'training',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'prod-4',
      title: 'شورت النادي',
      category: 'training',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'prod-5',
      title: 'قبعة النادي',
      category: 'accessories',
      price: 10000,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'prod-6',
      title: 'شال النادي',
      category: 'accessories',
      price: 12000,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter((p) => p.category === activeTab);

  const handleAdd = (p: StoreProduct) => {
    onAddToCart({
      id: p.id,
      name: p.title,
      price: p.price,
      image: p.image,
      category: p.category,
    });
    setRecentlyAddedId(p.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1200);
  };

  return (
    <div id="store-screen" className="screen active">
      {/* الترويسة العلوية */}
      <div className="screen-header">
        <i
          className="fa-solid fa-chevron-right back-icon"
          onClick={onBack}
          role="button"
          title="رجوع"
        ></i>
        <div className="flex items-center gap-2">
          <h2 className="header-title">المتجر</h2>
          {cartCount > 0 && (
            <button
              onClick={onOpenCartModal}
              className="bg-[#e30613] text-white text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer"
              title="عرض السلة"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>{cartCount}</span>
            </button>
          )}
        </div>
        <i
          className="fa-solid fa-bars menu-icon"
          onClick={onOpenMenu}
          role="button"
          title="القائمة"
        ></i>
      </div>

      {/* شريط التبويبات */}
      <div className="store-tabs">
        <button
          className={`store-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          الكل
        </button>
        <button
          className={`store-tab-btn ${activeTab === 'jerseys' ? 'active' : ''}`}
          onClick={() => setActiveTab('jerseys')}
        >
          التيشيرتات
        </button>
        <button
          className={`store-tab-btn ${activeTab === 'training' ? 'active' : ''}`}
          onClick={() => setActiveTab('training')}
        >
          التدريبات
        </button>
        <button
          className={`store-tab-btn ${activeTab === 'accessories' ? 'active' : ''}`}
          onClick={() => setActiveTab('accessories')}
        >
          الإكسسوارات
        </button>
      </div>

      {/* شبكة المنتجات */}
      <div className="products-grid">
        {filteredProducts.map((p) => {
          const isAdded = recentlyAddedId === p.id;
          return (
            <div key={p.id} className="product-card">
              <div className="product-img-box">
                <img
                  src={p.image}
                  alt={p.title}
                  onError={(e) => {
                    // Fallback to placeholder if external image fails
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/150x150/121c2e/ffffff?text=${encodeURIComponent(
                      p.title
                    )}`;
                  }}
                />
              </div>
              <div className="product-details">
                <h3 className="product-title">{p.title}</h3>
                <div className="product-bottom-row">
                  <span className="product-price">
                    {p.price.toLocaleString()} <small>د.ع</small>
                  </span>
                  <button
                    className="add-cart-btn"
                    onClick={() => handleAdd(p)}
                    title={isAdded ? 'تمت الإضافة' : 'إضافة إلى السلة'}
                  >
                    {isAdded ? (
                      <Check className="w-3.5 h-3.5 text-white animate-bounce" />
                    ) : (
                      <i className="fa-solid fa-cart-plus"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
