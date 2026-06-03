import React, { useState } from 'react';
import { Calendar, Layers, Info, CheckCircle2, ChevronRight, X, Sparkles } from 'lucide-react';
import { Screen, SavingPot } from '../types';

interface CreatePotProps {
  navigate: (screen: Screen) => void;
  onCreatePot: (newPot: SavingPot) => void;
}

export default function CreatePotScreen({ navigate, onCreatePot }: CreatePotProps) {
  const [potName, setPotName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [category, setCategory] = useState('Travel');
  const [targetDate, setTargetDate] = useState('');
  const [isLocked, setIsLocked] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!potName.trim()) {
      setError('Please provide a name for this savings pot.');
      return;
    }
    const goalNum = parseFloat(goalAmount);
    if (isNaN(goalNum) || goalNum <= 0) {
      setError('Please provide a valid goal amount (above $0).');
      return;
    }
    if (!targetDate) {
      setError('Please select a target goal date.');
      return;
    }

    setLoading(true);

    // Simulate haptic API server delay
    setTimeout(() => {
      setLoading(false);

      const newId = 'pot-' + Date.now();
      
      // Auto move $200 initial funding to savings allocated pool as specified in mockup screen 5!
      const initialDeposit = Math.min(200, goalNum);

      onCreatePot({
        id: newId,
        name: potName,
        goalAmount: goalNum,
        currentSaved: initialDeposit,
        category: category,
        targetDate: targetDate,
        isLocked: isLocked
      });
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto pt-6 text-left select-none relative">
      {/* Header Info */}
      <section className="mb-6">
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-[#0B1C30] tracking-tight mb-1">
          Create New Pot
        </h2>
        <p className="font-sans text-sm md:text-base text-[#434656]">
          Set aside money for something special. We'll help you track your progress.
        </p>
      </section>

      {/* Main Card Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C3C5D9]/40 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-[#FFDAD6] text-[#93000A] p-4 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Pot Name input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans font-semibold text-xs text-[#434656] uppercase tracking-wider px-1" htmlFor="potName">
              Pot Name
            </label>
            <input
              id="potName"
              type="text"
              placeholder="e.g., Summer Trip, New Laptop"
              value={potName}
              onChange={(e) => setPotName(e.target.value)}
              className="w-full bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl px-4 py-3 font-sans text-sm text-[#0B1C30] focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all placeholder-[#737688]/50"
              required
              disabled={loading}
            />
          </div>

          {/* Goal & Category Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Goal Amount */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans font-semibold text-xs text-[#434656] uppercase tracking-wider px-1" htmlFor="goalAmount">
                Goal Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans font-bold text-sm text-[#434656]">$</span>
                <input
                  id="goalAmount"
                  type="number"
                  step="0.01"
                  min="1"
                  placeholder="0.00"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  className="w-full bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl pl-8 pr-4 py-3 font-sans text-sm text-[#0B1C30] focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all placeholder-[#737688]/50"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Category selection */}
            <div className="flex flex-col gap-1.5">
              <label className="font-sans font-semibold text-xs text-[#434656] uppercase tracking-wider px-1" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl px-4 py-3 font-sans text-sm text-[#0B1C30] focus:border-[#003DCB] transition-all focus:ring-2 focus:ring-[#003DCB]/10 outline-none cursor-pointer"
                disabled={loading}
              >
                <option value="Travel">Travel</option>
                <option value="Tech">Tech</option>
                <option value="Emergency">Emergency</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>

          {/* Target Goal Deadline choice */}
          <div className="flex flex-col gap-1.5">
            <label className="font-sans font-semibold text-xs text-[#434656] uppercase tracking-wider px-1" htmlFor="targetDate">
              Target Date
            </label>
            <input
              id="targetDate"
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl px-4 py-3 font-sans text-sm text-[#0B1C30] focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all cursor-pointer"
              required
              disabled={loading}
            />
          </div>

          {/* Lock Pot parameter toggle options */}
          <div className="flex items-center justify-between p-4 bg-[#EFF4FF] rounded-xl border border-[#C3C5D9]/20 relative">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-sans font-bold text-sm text-[#0B1C30]">Lock this Pot</span>
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setShowTooltip(!showTooltip)}
                >
                  <Info className="text-[#737688] h-4 w-4" />
                  
                  {/* Info Hover Tooltip widget popup */}
                  {showTooltip && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#213145] text-[#EAF1FF] text-[10px] rounded-lg shadow-lg opacity-100 transition-opacity pointer-events-none z-30 leading-snug">
                      Locked pots automatically deduct from your Spendable Balance to keep you on track.
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xs text-[#434656] mt-0.5">Recommended for high-priority goals.</p>
            </div>

            {/* Custom switch slider */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
                className="sr-only peer"
                disabled={loading}
              />
              <div className="w-11 h-6 bg-[#C3C5D9] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-[#C3C5D9] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003DCB]"></div>
            </label>
          </div>

          {/* Visual vector target workspace moodboard banner */}
          <div className="relative w-full h-28 rounded-xl overflow-hidden bg-[#EFF4FF] select-none border border-[#C3C5D9]/10">
            <img
              alt="Visual workspace banner illustration"
              className="w-full h-full object-cover opacity-65 grayscale pointer-events-none"
              src="https://lh3.googleusercontent.com/@google/genai-content-production/some-workspace-image?dummy=1"
              onError={(e) => {
                // Hotlink absolute backup provided in standard mock!
                (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ7YlfKZBLeyzj1766ngZIhqF5ElvG7Dz1oAkKl1rerM04ux1ndUBx5duP1C9xkmoYzubn8blv_HRF2b0wLzaryLlzReTomTL9zyMRMIJaspn-tO-PnpFnar6IfWlILBY14qtntSdVPd4SjuwM8hzz_bvQ9THoIjLPw7uNbKh2eX-jjt4zZgJA_uUZLyggnRnbvmQzyosGBQqzIVYURvpEbI0NtXC811EKrqNeUQdf1CbInGID2AFvY-IOXcjJjDVf6oEIg_pgOt9p";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-white/90 to-transparent">
              <span className="font-sans font-bold text-[#003DCB] text-xs tracking-widest uppercase">
                Visualize Your Goal
              </span>
            </div>
          </div>

          {/* Form Actions list */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-sans font-semibold shadow-md transition-all active:scale-[0.98] cursor-pointer text-center text-sm ${
                loading
                  ? 'bg-[#E5EEFF] text-[#003DCB]'
                  : 'bg-[#003DCB] hover:bg-[#003DCB]/90 text-white'
              }`}
            >
              {loading ? 'Creating savings pot...' : 'Create Pot'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('savings')}
              disabled={loading}
              className="w-full bg-transparent text-[#003DCB] py-2 rounded-xl h-10 font-sans font-semibold hover:bg-neutral-100 transition-all text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
