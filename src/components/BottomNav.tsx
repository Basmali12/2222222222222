import React from 'react';

export type NavTabId = 'home-screen' | 'matches-screen' | 'players-screen' | 'academy-screen' | 'more-screen';

interface BottomNavProps {
  activeScreen: string;
  onSelectScreen: (screenId: NavTabId) => void;
  cartCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onSelectScreen,
  cartCount = 0,
}) => {
  const navItems: Array<{ id: NavTabId; label: string; iconClass: string; badge?: number }> = [
    { id: 'home-screen', label: 'الرئيسية', iconClass: 'fa-solid fa-house' },
    { id: 'matches-screen', label: 'المباريات', iconClass: 'fa-regular fa-calendar-days' },
    { id: 'players-screen', label: 'اللاعبين', iconClass: 'fa-solid fa-shirt' },
    { id: 'academy-screen', label: 'الأكاديمية', iconClass: 'fa-solid fa-graduation-cap' },
    { id: 'more-screen', label: 'المزيد', iconClass: 'fa-solid fa-ellipsis', badge: cartCount },
  ];

  return (
    <nav id="bottom-nav">
      {navItems.map((item) => {
        const isActive = activeScreen === item.id;
        return (
          <div
            key={item.id}
            onClick={() => onSelectScreen(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            role="button"
            tabIndex={0}
          >
            <div className="relative flex items-center justify-center">
              <i className={item.iconClass}></i>
              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#e30613] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0a1120]">
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
};
