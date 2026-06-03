import { useEffect, useState } from 'react';
import {
  Utensils,
  Sun,
  Coffee,
  Laptop,
  CheckCircle,
  PiggyBank,
  PlusCircle,
  Compass,
  ArrowRight,
  Shield,
  Unlock,
  Lock,
  Plus
} from 'lucide-react';
import { Screen, SavingPot } from '../types';

interface SavingsScreenProps {
  pots: SavingPot[];
  potsSum: number;
  navigate: (screen: Screen) => void;
}

export default function SavingsScreen({ pots, potsSum, navigate }: SavingsScreenProps) {
  const [animateWidths, setAnimateWidths] = useState(false);

  // Trigger entering animation transition for progress bars
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateWidths(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const getPotIcon = (category: string, name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('sneaker') || lowerName.includes('shoe')) {
      return <svg className="h-6 w-6 text-[#003DCB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.003 9.003 0 008.367-5.633L16 11V7a4 4 0 10-8 0v4L3.633 15.367A9.003 9.003 0 0012 21z" /></svg>;
    }
    if (lowerName.includes('dining') || lowerName.includes('restaurant') || lowerName.includes('food')) {
      return <Utensils className="h-6 w-6 text-[#006C49]" />;
    }
    if (lowerName.includes('trip') || lowerName.includes('travel') || lowerName.includes('spring') || lowerName.includes('vacation')) {
      return <Sun className="h-6 w-6 text-[#704500]" />;
    }
    if (lowerName.includes('coffee') || lowerName.includes('cafe')) {
      return <Coffee className="h-6 w-6 text-[#003DCB]" />;
    }
    if (lowerName.includes('laptop') || lowerName.includes('computer') || lowerName.includes('tech')) {
      return <Laptop className="h-6 w-6 text-[#003DCB]" />;
    }
    return <PiggyBank className="h-6 w-6 text-[#003DCB]" />;
  };

  const getPotBadgeStyles = (isLocked: boolean) => {
    if (isLocked) {
      return 'bg-[#EFF4FF] text-[#434656]';
    }
    return 'bg-[#6CF8BB]/30 text-[#006C49]';
  };

  const getPotMainColor = (isLocked: boolean) => {
    if (isLocked) {
      return 'bg-[#003DCB]';
    }
    return 'bg-[#006C49]';
  };

  const getPotTextColor = (isLocked: boolean) => {
    if (isLocked) {
      return 'text-[#003DCB]';
    }
    return 'text-[#006C49]';
  };

  return (
    <div className="space-y-6 pt-6 select-none text-left">
      {/* Target heading */}
      <section className="mb-4">
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-[#0B1C30] tracking-tight mb-1">
          Your Savings Goals
        </h2>
        <p className="font-sans text-sm md:text-base text-[#434656]">
          Small goals, big rewards.
        </p>
      </section>

      {/* Bento-ish layout Grid for Savings Pots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {pots.map((pot) => {
          const ratio = pot.currentSaved / pot.goalAmount;
          const percent = Math.min(100, Math.round(ratio * 100));

          return (
            <div
              key={pot.id}
              className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#C3C5D9]/30 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF4FF] flex items-center justify-center shrink-0">
                    {getPotIcon(pot.category, pot.name)}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-base text-[#0B1C30] tracking-tight">
                      {pot.name}
                    </h3>
                    <p className="font-sans text-xs text-[#737688]">
                      {pot.category} Goal
                    </p>
                  </div>
                </div>

                {/* Lock Status badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider border border-transparent ${getPotBadgeStyles(pot.isLocked)}`}>
                  {pot.isLocked ? (
                    <>
                      <Lock className="h-3 w-3" />
                      <span>Locked</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="h-3 w-3" />
                      <span>Spendable</span>
                    </>
                  )}
                </span>
              </div>

              {/* Progress Tracker display */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="font-sans font-bold text-lg text-[#0B1C30]">
                    ${pot.currentSaved.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}{' '}
                    <span className="text-[#737688] text-xs font-normal">
                      / ${pot.goalAmount.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                  <span className={`font-sans font-bold text-sm ${getPotTextColor(pot.isLocked)}`}>
                    {percent}%
                  </span>
                </div>

                {/* Progress bar with animated width */}
                <div className="w-full h-3 bg-[#E5EEFF] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getPotMainColor(pot.isLocked)} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: animateWidths ? `${percent}%` : '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Pot Action Card Grid Item */}
        <button
          onClick={() => navigate('create_pot')}
          className="lg:col-span-6 bg-[#003DCB] hover:bg-[#003DCB]/95 text-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex flex-col items-center justify-center gap-3 cursor-pointer select-none text-center min-h-[160px] "
        >
          <Plus className="h-10 w-10 text-white rounded-full bg-white/10 p-1 bg-clip-border stroke-[3]" />
          <div className="space-y-0.5">
            <h3 className="font-sans font-bold text-lg">Add New Pot</h3>
            <p className="font-sans text-xs text-white/80">Start your next goal</p>
          </div>
        </button>
      </div>

      {/* Atmospheric motivational section matching layout */}
      <section className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#0F52FF] to-[#003DCB] text-white relative overflow-hidden">
        <div className="relative z-10 select-none">
          <h4 className="font-sans font-bold text-base mb-2">Smart Saving Tip</h4>
          <p className="font-sans text-xs md:text-sm max-w-xl opacity-90 leading-relaxed">
            By locking your 'Designer Sneakers' pot, you've avoided $40 in impulse purchases this week. Keep up the momentum!
          </p>
        </div>

        {/* Abstract vector overlays */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-12 bottom-0 w-24 h-24 bg-[#6CF8BB]/20 rounded-full blur-2xl pointer-events-none"></div>
      </section>
    </div>
  );
}
