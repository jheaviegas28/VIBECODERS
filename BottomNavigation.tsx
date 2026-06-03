import { Home, Receipt, PiggyBank, BarChart2 } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavigationProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
}

export default function BottomNavigation({ currentScreen, navigate }: BottomNavigationProps) {
  // Only render on core navigation screens
  const visibleScreens = ['home', 'expenses', 'savings', 'analytics'];
  if (!visibleScreens.includes(currentScreen)) return null;

  const tabs = [
    { label: 'Home', screen: 'home' as Screen, icon: Home },
    { label: 'Expenses', screen: 'expenses' as Screen, icon: Receipt },
    { label: 'Savings', screen: 'savings' as Screen, icon: PiggyBank },
    { label: 'Analytics', screen: 'analytics' as Screen, icon: BarChart2 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe bg-white border-t border-[#C3C5D9] shadow-md z-50 rounded-t-xl">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.screen;
        const Icon = tab.icon;

        return (
          <button
            key={tab.screen}
            onClick={() => navigate(tab.screen)}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all active:scale-90 duration-200 ${
              isActive
                ? 'bg-[#E5EEFF] text-[#003DCB] font-semibold'
                : 'text-[#434656] hover:text-[#003DCB]'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'fill-[#003DCB]/10 text-[#003DCB]' : 'text-current'}`} />
            <span className="font-sans text-[11px] mt-1 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
