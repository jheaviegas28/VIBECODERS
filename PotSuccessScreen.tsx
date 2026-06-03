import { ArrowRight, CheckCircle, ArrowLeft, Calendar, Medal } from 'lucide-react';
import { Screen, SavingPot } from '../types';

interface PotSuccessProps {
  createdPot: SavingPot | null;
  navigate: (screen: Screen) => void;
}

export default function PotSuccessScreen({ createdPot, navigate }: PotSuccessProps) {
  if (!createdPot) {
    return (
      <div className="text-center py-20">
        <p className="font-sans text-sm text-[#737688]">No pot recently resolved as created.</p>
        <button
          onClick={() => navigate('savings')}
          className="mt-4 bg-[#003DCB] text-white px-4 py-2 rounded-xl text-xs font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Format dates beautifully
  const formattedDate = new Date(createdPot.targetDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="w-full max-w-md mx-auto px-4 flex flex-col items-center justify-center py-10 select-none">
      {/* Animated Success Ring and Growth SVG Illustration context */}
      <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
        {/* Decorative background outer rings */}
        <div className="absolute inset-0 bg-[#6CF8BB]/10 opacity-70 rounded-full animate-ping-slow"></div>
        <div className="absolute inset-4 bg-[#6CF8BB]/20 rounded-full"></div>
        
        {/* Floating growth graphic plant pot success shape */}
        <div className="relative z-10 animate-floating flex flex-col items-center">
          <svg fill="none" height="100" viewBox="0 0 120 120" width="100" xmlns="http://www.w3.org/2000/svg">
            {/* Plant Pot Base */}
            <path
              d="M35 55C35 49.477 39.477 45 45 45H75C80.523 45 85 49.477 85 55V82C85 90.284 78.284 97 70 97H50C41.716 97 35 90.284 35 82V55Z"
              fill="#006C49"
            />
            
            {/* Rim of Pot */}
            <rect fill="#005236" height="8" rx="4" width="60" x="30" y="40" />
            
            {/* Green Sprouting leaf context */}
            <path
              className="animate-in fade-in zoom-in-50 duration-700 delay-150"
              d="M60 40V25M60 25C60 25 50 20 45 25M60 25C60 25 70 20 75 25"
              stroke="#4EDE93"
              strokeLinecap="round"
              strokeWidth="4.5"
            />
            
            {/* Success icon indicator check lock */}
            <path
              className="stroke-white"
              d="M48 68L56 76L72 58"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="6"
              strokeDasharray="100"
              strokeDashoffset="0"
            />
          </svg>
        </div>
      </div>

      {/* Typography Headers list */}
      <div className="text-center mb-6">
        <h1 className="font-sans font-bold text-2xl md:text-3xl text-[#0B1C30] mb-2 leading-none">
          Pot Created!
        </h1>
        <p className="font-sans text-sm text-[#434656] max-w-xs mx-auto leading-relaxed">
          Your <span className="text-[#003DCB] font-bold">"{createdPot.name}"</span> pot is ready.{' '}
          <span className="font-sans font-bold text-[#0B1C30]">${Math.min(200, createdPot.goalAmount)}</span> has been moved to allocated savings.
        </p>
      </div>

      {/* Overview stats layout dashboard checklist */}
      <div className="w-full bg-[#FFFFFF] border border-[#C3C5D9]/40 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="space-y-3.5 text-left text-xs font-semibold select-none leading-none">
          <div className="flex justify-between items-center opacity-85">
            <span className="font-sans text-[#737688] tracking-widest uppercase">NAME</span>
            <span className="font-sans text-[#0B1C30]">{createdPot.name}</span>
          </div>
          <div className="border-t border-[#C3C5D9]/20"></div>
          <div className="flex justify-between items-center opacity-85">
            <span className="font-sans text-[#737688] tracking-widest uppercase">GOAL</span>
            <span className="font-sans text-[#0B1C30]">${createdPot.goalAmount.toLocaleString('en-US')}</span>
          </div>
          <div className="border-t border-[#C3C5D9]/20"></div>
          <div className="flex justify-between items-center opacity-85">
            <span className="font-sans text-[#737688] tracking-widest uppercase">TARGET DATE</span>
            <span className="font-sans text-[#0B1C30]">{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Actions Trigger List buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={() => navigate('savings')}
          className="w-full py-3.5 bg-[#003DCB] text-white rounded-xl font-sans font-semibold text-sm hover:bg-[#003DCB]/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-[#003DCB]/10"
        >
          <span>Go to Savings</span>
          <ArrowRight className="h-4.5 w-4.5" />
        </button>

        <button
          onClick={() => navigate('home')}
          className="w-full py-3 bg-transparent text-[#003DCB] border border-[#C3C5D9] rounded-xl font-sans font-semibold text-xs hover:bg-[#EFF4FF] transition-all active:scale-[0.98] cursor-pointer"
        >
          View Dashboard
        </button>
      </div>

      {/* Ambient decorative layout floats */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-[10%] w-32 h-32 bg-[#003DCB]/5 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/4 left-[8%] w-40 h-40 bg-[#006C49]/5 blur-[80px] rounded-full"></div>
      </div>
    </div>
  );
}
