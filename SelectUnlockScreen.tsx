import { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldCheck, Laptop, Sun, Sparkles, X, Lock } from 'lucide-react';
import { Screen, SavingPot, Transaction } from '../types';

interface SelectUnlockProps {
  pots: SavingPot[];
  pendingTx: Partial<Transaction> | null;
  spendableBalance: number;
  navigate: (screen: Screen) => void;
  onUnlockCompleted: (unlockAmount: number, chosenPotIds: string[]) => void;
}

export default function SelectUnlockScreen({
  pots,
  pendingTx,
  spendableBalance,
  navigate,
  onUnlockCompleted
}: SelectUnlockProps) {
  // Local active selections list state
  const [selectedPotIds, setSelectedPotIds] = useState<string[]>(['pot-laptop']);

  if (!pendingTx) {
    return (
      <div className="text-center py-20">
        <p className="font-sans text-sm text-[#737688]">No pending transaction to evaluate unlock for.</p>
        <button
          onClick={() => navigate('home')}
          className="mt-4 bg-[#003DCB] text-white px-4 py-2 rounded-xl text-[#003DCB] font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const purchaseAmount = Math.abs(pendingTx.amount || 0);
  const shortfall = purchaseAmount - spendableBalance;

  // Filter ONLY locked pots that can be unlocked (i.e. those with holds)
  const unlockablePots = pots.filter((p) => p.isLocked && p.currentSaved > 0);

  const toggleSelectPot = (id: string) => {
    if (selectedPotIds.includes(id)) {
      // Allow deselecting unless it's the only choice
      setSelectedPotIds(selectedPotIds.filter((pId) => pId !== id));
    } else {
      setSelectedPotIds([...selectedPotIds, id]);
    }
  };

  const handleUnlockFunds = () => {
    if (selectedPotIds.length === 0) {
      alert('Please select at least one Locked Saving Pot to release funds.');
      return;
    }

    // Verify if selected pots have enough aggregate savings to satisfy shortfall
    const aggregateHold = pots
      .filter((p) => selectedPotIds.includes(p.id))
      .reduce((sum, p) => sum + p.currentSaved, 0);

    if (aggregateHold < shortfall) {
      alert(`The selected savings pots only contain $${aggregateHold.toFixed(2)} in total, which doesn't cover your shortfall of $${shortfall.toFixed(2)}. Please select more pots.`);
      return;
    }

    // Successfully trigger callback that mutates the state!
    onUnlockCompleted(shortfall, selectedPotIds);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 w-full pt-6 select-none text-left">
      
      {/* Warning indicator section */}
      <div className="mb-6 bg-[#FFDAD6] border border-[#BA1A1A]/10 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
        <AlertCircle className="text-[#BA1A1A] h-6 w-6 mt-0.5 shrink-0" />
        <div>
          <h2 className="font-sans font-bold text-lg md:text-xl text-[#93000A] mb-1 leading-snug">
            Select Pots to Unlock
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#434656] max-w-2xl leading-relaxed">
            You need <span className="font-sans font-bold text-[#BA1A1A]">${shortfall.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span> more for your purchase. Unlocking funds will move money from your savings to your Spendable Balance.
          </p>
        </div>
      </div>

      {/* Pots list/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {unlockablePots.map((pot) => {
          const isSelected = selectedPotIds.includes(pot.id);
          return (
            <div
              key={pot.id}
              onClick={() => toggleSelectPot(pot.id)}
              className={`md:col-span-6 bg-white border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-md relative overflow-hidden group select-none ${
                isSelected
                  ? 'border-[#003DCB] bg-[#EFF4FF]'
                  : 'border-[#C3C5D9]/40 bg-white hover:border-[#C3C5D9]'
              }`}
            >
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex flex-col text-left">
                  <span className={`font-sans font-semibold text-[10px] uppercase tracking-wider mb-0.5 ${
                    isSelected ? 'text-[#003DCB]' : 'text-[#737688]'
                  }`}>
                    {pot.category.toUpperCase()} GOAL
                  </span>
                  <h3 className="font-sans font-bold text-base text-[#0B1C30] tracking-tight">{pot.name}</h3>
                </div>

                {/* custom selection circle checks */}
                <div className={`rounded-full w-7 h-7 flex items-center justify-center shrink-0 border transition-all ${
                  isSelected
                    ? 'bg-[#003DCB] border-[#003DCB] text-white'
                    : 'border-[#C3C5D9] text-transparent bg-white'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>

              <div className="flex items-end justify-between relative z-10">
                <div>
                  <p className="font-sans text-xs text-[#737688]">Available hold</p>
                  <p className="font-sans font-bold text-xl text-[#0B1C30]">
                    ${pot.currentSaved.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                
                {/* background laptop design vector outline */}
                <span className="absolute -right-4 -bottom-4 text-[#737688]/5 transition-opacity duration-300 group-hover:opacity-10 pointer-events-none text-8xl material-symbols-outlined shrink-0 select-none">
                  savings
                </span>
              </div>
            </div>
          );
        })}

        {/* Informative secure transfers overlay */}
        <div className="md:col-span-12 bg-[#003DCB] text-white rounded-2xl p-5 relative overflow-hidden flex flex-col justify-end min-h-[120px] select-none text-left shadow-sm">
          <div className="absolute top-4 right-4 text-white/10 shrink-0 select-none">
            <span className="material-symbols-outlined text-6xl font-semibold select-none text-white/5 opacity-40 shrink-0">
              verified
            </span>
          </div>
          <p className="font-sans font-bold text-base mb-1">Safe & Secure Transfers</p>
          <p className="font-sans text-xs md:text-sm text-white/80 max-w-xl leading-relaxed">
            Unlocking funds happens instantly. You can always move money back to your pots when your balance recovers.
          </p>
        </div>

      </div>

      {/* CTA actions list */}
      <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
        <button
          onClick={handleUnlockFunds}
          className="w-full md:w-auto px-6 py-3.5 bg-[#003DCB] hover:bg-[#003DCB]/90 text-white font-sans font-semibold text-xs rounded-xl shadow-md hover:shadow-xl active:scale-[0.98] transition-all tracking-wider uppercase"
        >
          Unlock Selected (${shortfall.toLocaleString('en-US', { minimumFractionDigits: 2 })})
        </button>
        
        <button
          onClick={() => navigate('locked_warning')}
          className="w-full md:w-auto px-6 py-3.5 text-[#003DCB] bg-white hover:bg-[#EFF4FF] border border-[#C3C5D9] font-sans font-semibold text-xs rounded-xl active:scale-[0.98] transition-all tracking-wider uppercase text-center"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}
