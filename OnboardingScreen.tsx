import { useState } from 'react';
import { Wallet, Landmark, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Screen, Mode, User } from '../types';

interface OnboardingScreenProps {
  user: User;
  onOnboardComplete: (updatedUser: User) => void;
}

export default function OnboardingScreen({ user, onOnboardComplete }: OnboardingScreenProps) {
  const [selectedMode, setSelectedMode] = useState<Mode>('wallet');

  const handleContinue = () => {
    // Save onboarding details and mode choice
    onOnboardComplete({
      ...user,
      mode: selectedMode,
      onboarded: true,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-12 flex flex-col items-center justify-center min-h-screen">
      {/* Selection Header */}
      <div className="max-w-xl w-full text-center mb-8 select-none">
        <h2 className="font-sans font-bold text-2xl md:text-3xl text-[#0B1C30] tracking-tight mb-2">
          Choose Your Mode
        </h2>
        <p className="font-sans text-sm md:text-base text-[#434656] leading-relaxed">
          Select how you want to manage your student finances. You can change this later in settings.
        </p>
      </div>

      {/* Mode Cards Radio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full select-none">
        {/* Wallet Mode Option */}
        <label
          onClick={() => setSelectedMode('wallet')}
          className="group relative cursor-pointer"
        >
          <div
            className={`transition-all duration-300 bg-white rounded-2xl p-6 h-full flex flex-col items-start border-2 ${
              selectedMode === 'wallet'
                ? 'border-[#003DCB] shadow-md shadow-[#003DCB]/5'
                : 'border-transparent hover:border-[#C3C5D9] shadow-sm'
            }`}
          >
            {/* Wallet Mode Icon Container */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                selectedMode === 'wallet'
                  ? 'bg-[#E5EEFF] text-[#003DCB]'
                  : 'bg-[#EFF4FF] text-[#003DCB] group-hover:bg-[#003DCB]/10'
              }`}
            >
              <Wallet className="h-6 w-6" />
            </div>

            {/* Title & Description */}
            <h3 className="font-sans font-bold text-lg text-[#0B1C30] mb-1">Wallet Mode</h3>
            <p className="font-sans text-xs md:text-sm text-[#434656] mb-6 text-left leading-relaxed flex-grow">
              Manually track your income and expenses. Full privacy and control over every transaction entry.
            </p>

            {/* Footer Tag */}
            <div className="flex items-center gap-1.5 mt-auto">
              <CheckCircle2 className="text-[#006C49] h-5 w-5 fill-[#006C49]/10" />
              <span className="font-sans font-semibold text-[10px] text-[#434656] uppercase tracking-widest">
                Manual Control
              </span>
            </div>
          </div>

          {/* Action check indicator */}
          {selectedMode === 'wallet' && (
            <div className="absolute top-4 right-4 text-[#003DCB]">
              <CheckCircle2 className="h-6 w-6 fill-[#003DCB]/10" />
            </div>
          )}
        </label>

        {/* Bank-Linked Mode Option */}
        <label
          onClick={() => setSelectedMode('bank')}
          className="group relative cursor-pointer"
        >
          <div
            className={`transition-all duration-300 bg-white rounded-2xl p-6 h-full flex flex-col items-start border-2 ${
              selectedMode === 'bank'
                ? 'border-[#003DCB] shadow-md shadow-[#003DCB]/5'
                : 'border-transparent hover:border-[#C3C5D9] shadow-sm'
            }`}
          >
            {/* Bank Mode Icon Container */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                selectedMode === 'bank'
                  ? 'bg-[#E5EEFF] text-[#003DCB]'
                  : 'bg-[#EFF4FF] text-[#003DCB] group-hover:bg-[#003DCB]/10'
              }`}
            >
              <Landmark className="h-6 w-6" />
            </div>

            {/* Title & Description */}
            <h3 className="font-sans font-bold text-lg text-[#0B1C30] mb-1">Bank-Linked Mode</h3>
            <p className="font-sans text-xs md:text-sm text-[#434656] mb-6 text-left leading-relaxed flex-grow">
              Automatically sync your transactions. Effortless tracking with real-time updates from your accounts.
            </p>

            {/* Footer Tag */}
            <div className="flex items-center gap-1.5 mt-auto">
              <Zap className="text-[#006C49] h-5 w-5 fill-[#006C49]/10" />
              <span className="font-sans font-semibold text-[10px] text-[#434656] uppercase tracking-widest">
                Automated Sync
              </span>
            </div>
          </div>

          {/* Action check indicator */}
          {selectedMode === 'bank' && (
            <div className="absolute top-4 right-4 text-[#003DCB]">
              <CheckCircle2 className="h-6 w-6 fill-[#003DCB]/10" />
            </div>
          )}
        </label>
      </div>

      {/* Action Button & Security Assurance */}
      <div className="mt-8 w-full max-w-3xl flex flex-col items-center gap-4">
        <button
          onClick={handleContinue}
          className="w-full md:w-64 bg-[#003DCB] hover:bg-[#003DCB]/90 text-white font-sans font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all tracking-wider uppercase text-xs"
        >
          Continue
        </button>

        <div className="flex items-center justify-center gap-2 max-w-sm text-center">
          <ShieldCheck className="text-[#434656] h-5 w-5 shrink-0" />
          <p className="font-sans text-xs text-[#434656] leading-relaxed">
            Your data is encrypted and secure. We never store your login credentials.
          </p>
        </div>
      </div>

      {/* Content Aesthetic Card (top workspace perspective layout) */}
      <section className="max-w-3xl w-full mt-10 overflow-hidden rounded-2xl border border-[#C3C5D9]/20 shadow-sm relative aspect-[21/9]">
        <img
          alt="Financial planning aesthetic"
          className="w-full h-full object-cover opacity-85 grayscale hover:grayscale-0 transition-all duration-700 select-none pointer-events-none"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1X2zY2fdIxUvLsfDJWeb704VfMJe5Vep6_HgQ6erxKZGHRozmGyQDezDwvRpcvMFqxKJw8XWMyW_dprJ5hFHUrjPXfQW_i3WuiXiQDomcPsLfwU-921lghpA0FE4Fs7lQ6hbm5JbK6k7Vn1F9A6ge0GgUM3OZkmd9L423iDYtBd5ESTqWYJxis275kKfPRIma9lkI1E9RXoSmBa0SnerF3K3wXN5gHSLn49063FdUQuBsx65YHo0yiCnrZ73uAtldIz3gCaGbQeIC"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent pointer-events-none"></div>
      </section>
    </div>
  );
}
