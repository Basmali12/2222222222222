import React from 'react';
import { House, CalendarDays, Shirt, GraduationCap, Ellipsis, type LucideIcon } from 'lucide-react';

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
  const navItems: Array<{ id: NavTabId; label: string; icon: LucideIcon; badge?: number }> = [
    { id: 'home-screen', label: 'الرئيسية', icon: House },
    { id: 'matches-screen', label: 'المباريات', icon: CalendarDays },
    { id: 'players-screen', label: 'اللاعبون', icon: Shirt },
    { id: 'academy-screen', label: 'الأكاديمية', icon: GraduationCap },
    { id: 'more-screen', label: 'المزيد', icon: Ellipsis, badge: cartCount },
  ];

  return (
    <nav id="bottom-nav" aria-label="التنقل الرئيسي">
      {navItems.map((item) => {
        const isActive = activeScreen === item.id;
        const Icon = item.icon;
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => onSelectScreen(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="relative flex items-center justify-center">
              <Icon size={21} strokeWidth={isActive ? 2.3 : 1.7} aria-hidden="true" />
              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#e30613] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0a1120]">
                  {item.badge}
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
