import { AlertTriangle, Info, Lightbulb, Lock } from 'lucide-react';
import { Screen, Transaction } from '../types';

interface LockedWarningProps {
  pendingTx: Partial<Transaction> | null;
  spendableBalance: number;
  navigate: (screen: Screen) => void;
  onCancel: () => void;
}

export default function LockedWarningScreen({ pendingTx, spendableBalance, navigate, onCancel }: LockedWarningProps) {
  if (!pendingTx) {
    return (
      <div className="text-center py-20 select-none">
        <p className="font-sans text-sm text-[#737688]">No pending transaction triggers discovered.</p>
        <button
          onClick={() => navigate('home')}
          className="mt-4 bg-[#003DCB] text-white px-4 py-2 rounded-xl text-xs font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const purchaseAmount = Math.abs(pendingTx.amount || 0);
  const shortfall = purchaseAmount - spendableBalance;

  return (
    <div className="w-full max-w-md mx-auto pt-6 pb-12 px-4 flex flex-col items-center justify-center min-h-screen text-center select-none">
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Warning Icon Banner Header */}
        <div className="space-y-3 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFDAD6] text-[#BA1A1A] shadow-inner shrink-0">
            <Lock className="h-9 w-9 text-[#BA1A1A] animate-pulse-slow fill-[#BA1A1A]/10 stroke-[2.2]" />
          </div>
          
          <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#0B1C30] leading-tight">
            Insufficient Spendable Balance
          </h1>
          
          <p className="font-sans text-xs md:text-sm text-[#434656] max-w-sm">
            Your transaction is attempting to use funds that are currently allocated to your savings goals.
          </p>
        </div>

        {/* Visual progress shortfall metric cards (Bento layout) */}
        <div className="grid grid-cols-2 gap-3 text-left leading-none">
          <div className="col-span-2 bg-white border border-[#C3C5D9]/40 p-4 rounded-xl flex flex-col justify-between shadow-sm">
            <span className="font-sans font-semibold text-[10px] text-[#737688] uppercase tracking-wider mb-1.5">
              PURCHASE AMOUNT
            </span>
            <span className="font-sans font-bold text-2xl text-[#0B1C30]">
              ${purchaseAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-white border border-[#C3C5D9]/40 p-4 rounded-xl flex flex-col justify-between shadow-sm">
            <span className="font-sans font-semibold text-[10px] text-[#737688] uppercase tracking-wider mb-1.5">
              SPENDABLE
            </span>
            <span className="font-sans font-semibold text-lg text-[#006C49]">
              ${spendableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-[#FFDAD6] border border-[#BA1A1A]/15 p-4 rounded-xl flex flex-col justify-between shadow-sm">
            <span className="font-sans font-semibold text-[10px] text-[#BA1A1A] uppercase tracking-wider mb-1.5 font-bold">
              SHORTFALL
            </span>
            <span className="font-sans font-semibold text-lg text-[#BA1A1A] font-bold">
              -${shortfall.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Context explanation details dialog card */}
        <div className="bg-white border border-[#C3C5D9]/40 p-4 rounded-xl flex gap-3 text-left">
          <Info className="text-[#003DCB] h-5 w-5 shrink-0 mt-0.5" />
          <p className="font-sans text-xs md:text-sm text-[#434656] leading-relaxed">
            This purchase requires funds that are currently locked in your{' '}
            <span className="font-bold text-[#0B1C30]">"New Laptop"</span> and{' '}
            <span className="font-bold text-[#0B1C30]">"Emergency Fund"</span> savings pots.
          </p>
        </div>

        {/* Smart tip container banner */}
        <div className="bg-[#FFE1C0]/30 border border-dashed border-[#704500]/30 p-4 rounded-xl text-left select-none">
          <div className="flex items-center gap-1.5 mb-1 select-none">
            <Lightbulb className="text-[#704500] h-4.5 w-4.5 shrink-0 mt-0.5 fill-[#704500]/10" />
            <span className="font-sans font-bold text-[10px] text-[#704500] tracking-wider uppercase font-semibold">
              SMART TIP
            </span>
          </div>
          <p className="font-sans text-xs text-[#653E00] italic leading-relaxed">
            Tip: Try waiting 24 hours before unlocking goals to avoid impulsive spending.
          </p>
        </div>

        {/* Action button trigger redirects */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={onCancel}
            className="w-full bg-[#003DCB] text-white py-3.5 rounded-xl font-sans font-semibold text-sm shadow-md hover:bg-[#003DCB]/90 active:scale-[0.98] transition-all cursor-pointer"
          >
            Cancel Purchase
          </button>
          
          <button
            onClick={() => navigate('select_unlock')}
            className="w-full bg-[#EFF4FF] hover:bg-[#DCE9FF] text-[#003DCB] py-3.5 rounded-xl font-sans font-semibold text-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            Unlock Funds
          </button>
        </div>

      </div>
    </div>
  );
}
