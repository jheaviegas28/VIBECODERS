import { useEffect, useState } from 'react';
import { CheckCircle2, TrendingUp, Laptop, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { Screen, SavingPot, Transaction } from '../types';

interface UnlockSuccessProps {
  pots: SavingPot[];
  pendingTx: Partial<Transaction> | null;
  spendableBalance: number;
  shortfallAmount: number;
  chosenPotIds: string[];
  navigate: (screen: Screen) => void;
  onCompletePurchase: () => void;
}

export default function UnlockSuccessScreen({
  pots,
  pendingTx,
  spendableBalance,
  shortfallAmount,
  chosenPotIds,
  navigate,
  onCompletePurchase
}: UnlockSuccessProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const firstPot = pots.find((p) => chosenPotIds.includes(p.id)) || pots[0];
  const firstPotName = firstPot ? firstPot.name : 'New Laptop';
  const remainingInPot = firstPot ? firstPot.currentSaved : 545.20;
  const progressRatio = firstPot ? (remainingInPot / firstPot.goalAmount) * 100 : 65;

  return (
    <div className="w-full max-w-md mx-auto pt-6 pb-12 px-4 flex flex-col items-center justify-center min-h-screen text-center select-none relative">
      
      {/* simulated confetti float elements */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
          {Array.from({ length: 25 }).map((_, i) => {
            const randomLeft = Math.random() * 100;
            const randomDelay = Math.random() * 2;
            const randomColor = ['bg-[#003DCB]', '#4EDE93', '#6CF8BB', '#FFDDB8', '#FFB95F'][i % 5];
            const size = Math.random() * 6 + 5;
            
            return (
              <div
                key={i}
                className="absolute animate-confetti-drop rounded-full"
                style={{
                  left: `${randomLeft}%`,
                  top: `-20px`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: randomColor.startsWith('bg') ? undefined : randomColor,
                  animationDelay: `${randomDelay}s`,
                  animationDuration: `${Math.random() * 2.5 + 1.5}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Success Animated Logo banner */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-[#6CF8BB]/20 rounded-full flex items-center justify-center animate-bounce-subtle shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-[#006C49] rounded-full flex items-center justify-center shadow-lg shrink-0">
            <CheckCircle2 className="text-white h-10 w-10 md:h-12 md:w-12 fill-white/10 stroke-[2.3]" />
          </div>
        </div>

        {/* Bubble particles */}
        <div className="absolute -top-3 -right-3 w-5 h-5 bg-[#FFE1C0] rounded-full opacity-60"></div>
        <div className="absolute -bottom-1 -left-4 w-7 h-7 bg-[#E5EEFF] rounded-full opacity-30"></div>
      </div>

      {/* Headline & Description */}
      <div className="text-center mb-8 select-none">
        <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#0B1C30] mb-2 leading-none">
          Funds Unlocked!
        </h1>
        <p className="font-sans text-xs md:text-sm text-[#434656] px-2 leading-relaxed">
          <span className="text-[#003DCB] font-bold">${shortfallAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span> has been moved from your <span className="font-semibold text-[#0B1C30]">'{firstPotName}'</span> pot to your Spendable Balance.
        </p>
      </div>

      {/* Bento Balance card display values */}
      <div className="w-full bg-white border border-[#C3C5D9]/40 rounded-2xl shadow-sm p-5 md:p-6 mb-8 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#EFF4FF] rounded-full -mr-12 -mt-12 pointer-events-none opacity-50"></div>
        
        <div className="space-y-5 relative z-10 leading-none select-none">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-sans font-bold text-[#737688] uppercase tracking-wider mb-1">
                New Spendable Balance
              </p>
              <h2 className="text-3xl font-sans font-bold text-[#003DCB]">
                ${spendableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h2>
            </div>

            {/* Bubble highlighted variance increase chip widget */}
            <div className="flex items-center gap-1 bg-[#6CF8BB]/40 border border-[#006C49]/10 px-3 py-1 rounded-full text-xs font-semibold text-[#002113]">
              <TrendingUp className="h-3.5 w-3.5 text-[#006C49]" />
              <span>+${shortfallAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="h-[1px] bg-[#C3C5D9]/30 w-full"></div>

          {/* Sub-row item detailing remaining pot progress */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#F8F9FF] border border-[#C3C5D9]/20 rounded-lg flex items-center justify-center shrink-0">
                <Laptop className="h-4.5 w-4.5 text-[#434656]" />
              </div>
              <div>
                <p className="font-sans text-[10px] text-[#737688]">Remaining in '{firstPotName}'</p>
                <p className="font-sans font-bold text-xs text-[#0B1C30] mt-0.5">
                  ${remainingInPot.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right select-none">
              <p className="font-sans text-[10px] text-[#737688]">Goal Progress</p>
              <div className="w-24 h-1.5 bg-[#E5EEFF] rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-[#003DCB] h-full rounded-full transition-all duration-1000"
                  style={{ width: `${progressRatio}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Action buttons triggers */}
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={onCompletePurchase}
          className="w-full py-4 bg-[#003DCB] hover:bg-[#003DCB]/90 text-white font-sans font-semibold rounded-xl shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <span>Complete Purchase</span>
          <ArrowRight className="h-4.5 w-4.5" />
        </button>

        <button
          onClick={() => navigate('home')}
          className="w-full py-3.5 bg-transparent border border-[#C3C5D9] text-[#434656] font-sans font-semibold rounded-xl active:scale-[0.98] transition-all hover:bg-[#F8F9FF] cursor-pointer text-xs"
        >
          Back to Dashboard
        </button>
      </div>

    </div>
  );
}
