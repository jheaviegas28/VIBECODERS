import { Bell, Search, GraduationCap } from 'lucide-react';
import { Screen, User } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  user: User | null;
  onLogout: () => void;
}

export default function Header({ currentScreen, navigate, user, onLogout }: HeaderProps) {
  // Check if screen has navigation back action
  const showBack = [
    'create_pot',
    'pot_success',
    'locked_warning',
    'select_unlock',
    'unlock_success',
    'investing_guide'
  ].includes(currentScreen);

  const getBackTarget = (): Screen => {
    if (currentScreen === 'create_pot') return 'savings';
    if (currentScreen === 'pot_success') return 'savings';
    if (currentScreen === 'locked_warning') return 'home';
    if (currentScreen === 'select_unlock') return 'locked_warning';
    if (currentScreen === 'unlock_success') return 'home';
    if (currentScreen === 'investing_guide') return 'savings';
    return 'home';
  };

  const navLinks: { label: string; screen: Screen }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Expenses', screen: 'expenses' },
    { label: 'Savings', screen: 'savings' },
    { label: 'Analytics', screen: 'analytics' },
  ];

  const hideHeader = ['login', 'signup', 'onboarding'].includes(currentScreen);
  if (hideHeader) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F8F9FF] border-b border-[#C3C5D9]">
      <div className="flex items-center justify-between px-4 md:px-8 py-3 w-full max-w-7xl mx-auto h-16">
        {/* Left Side: Brand Name & Logo / Back Button */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={() => navigate(getBackTarget())}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#E5EEFF] text-[#003DCB] transition-colors active:scale-95 duration-100"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-[#003DCB]">
              <GraduationCap className="h-7 w-7 text-[#003DCB]" />
            </div>
          )}
          
          <button
            onClick={() => navigate('home')}
            className="font-sans font-bold text-xl tracking-tight text-[#003DCB] hover:opacity-90 active:scale-95 transition-all"
          >
            FINSTAT
          </button>
        </div>

        {/* Desktop Navigation Link Pivot (Centered) */}
        {!showBack && (
          <nav className="hidden md:flex items-center gap-8 bg-[#E5EEFF] py-1 px-1.5 rounded-full shadow-sm">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.screen;
              return (
                <button
                  key={link.screen}
                  onClick={() => navigate(link.screen)}
                  className={`font-sans font-semibold text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#003DCB] text-white shadow-sm'
                      : 'text-[#434656] hover:text-[#003DCB]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Side Icons & Profile */}
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={() => navigate('investing_guide')}
              className={`flex items-center gap-1 hover:bg-[#E5EEFF] transition-colors px-3 py-1.5 rounded-full group ${
                currentScreen === 'investing_guide' ? 'bg-[#E5EEFF] text-[#003DCB]' : 'text-[#434656]'
              }`}
            >
              <span className="font-sans font-semibold text-xs transition-colors group-hover:text-[#003DCB]">Investing Info</span>
            </button>
          )}

          <button
            onClick={() => {
              // Quick alert simulating notification tray
              alert("Finstat Smart Tips:\n- Remember to complete your 'Designer Sneakers' pot this month!\n- Great job! You spent $50 less on dining this week compared to last!");
            }}
            className="flex items-center justify-center p-2 rounded-full text-[#434656] hover:bg-[#DCE9FF] transition-colors relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#BA1A1A] rounded-full"></span>
          </button>

          {user ? (
            <div className="flex items-center gap-2 border-l border-[#C3C5D9] pl-3">
              <button
                onClick={() => {
                  if (confirm('Would you like to logout from FINSTAT?')) {
                    onLogout();
                  }
                }}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#003DCB] shadow-sm active:scale-95 transition-transform"
                title={`Logged in as ${user.fullName}. Click to Logout.`}
              >
                <img
                  alt="User Profile"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8GrZPLbTcHQCjiXIXpS2z2_8lCLIbbdPSCMiDmI5EtnKXIyCjGnqq5x2N4Bepx6n2IcGFILpY-DmytEVEMYNWmTGaI7aT2UNOWGxnK99MtCQoRF12cogXUsPXYFL1v2cy-J4DBf9OhNLKQFYaB3TS9qfmf9qTlTcwT_gmOQ_agB0oVgnEhgGNHbEGM86SJgeOK81TSP-8iFEISGZoCOHRVonNshqnlEwTQDKhmDIWFJW2bvZ6XnptnvPG_nO2h5wqr297K0Id74ZG"
                />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('login')}
              className="font-sans font-semibold text-xs px-3.5 py-1.5 rounded-lg border border-[#003DCB] text-[#003DCB] hover:bg-[#003DCB]/10 active:scale-95 transition-all"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
