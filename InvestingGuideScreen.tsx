import { useState } from 'react';
import {
  TrendingUp,
  FileText,
  Layers,
  Landmark,
  Compass,
  ArrowRight,
  Bookmark,
  ChevronRight,
  ShieldCheck,
  Award,
  BookOpen,
  PieChart,
  Lightbulb,
  HelpCircle,
  Sparkles,
  Rocket,
  Check,
  X
} from 'lucide-react';
import { Screen, QuizQuestion } from '../types';

interface InvestingGuideProps {
  navigate: (screen: Screen) => void;
}

export default function InvestingGuideScreen({ navigate }: InvestingGuideProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);

  // Student Investor Quiz Questions
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      text: "How would you react if your investment dropped 10% in a month?",
      options: [
        { text: "Sell immediately to prevent subsequent losses (Risk: Low)", score: 1 },
        { text: "Do nothing and wait for it to recover (Risk: Moderate)", score: 2 },
        { text: "Buy more at a discount since it's on sale (Risk: High)", score: 3 }
      ]
    },
    {
      id: 2,
      text: "What is your primary goal for starting to invest today?",
      options: [
        { text: "Keep my hard-earned money safe from inflation (Risk: Low)", score: 1 },
        { text: "Grow my savings steadily for college/rent (Risk: Moderate)", score: 2 },
        { text: "Aim for maximum compounding gains over 10+ years (Risk: High)", score: 3 }
      ]
    },
    {
      id: 3,
      text: "Which portfolio package fits your financial personality?",
      options: [
        { text: "90% stable Government Bonds, 10% cash savings (Risk: Low)", score: 1 },
        { text: "60% market Index Funds, 40% reliable Bonds (Risk: Moderate)", score: 2 },
        { text: "90% diversified Global Stocks, 10% Crypto assets (Risk: High)", score: 3 }
      ]
    }
  ];

  const handleQuizAnswer = (score: number) => {
    const nextScore = quizScore + score;
    setQuizScore(nextScore);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const getQuizResult = () => {
    if (quizScore <= 4) {
      return {
        personality: "Cash Sentinel (Conservative)",
        description: "You prioritize capital preservation over fast growth. Low-risk assets like High Yield Savings Accounts, Bonds, and Index ETFs form your perfect baseline.",
        ratio: "80% Bonds & Cash, 20% Stocks"
      };
    } else if (quizScore <= 7) {
      return {
        personality: "Balanced Compounder (Moderate)",
        description: "You seek a balanced formula for healthy market compounding. A mix of broad Index Funds and index ETFs keeps you safe with attractive long term gains.",
        ratio: "60% Stocks, 40% Bonds"
      };
    } else {
      return {
        personality: "Growth Pathseeker (Aggressive)",
        description: "You embrace volatility as the ticket to top-tier returns. Standard multi-industry stocks, sector ETFs, and long-term compounding fit you beautifully.",
        ratio: "90% Stocks, 10% Alternatives"
      };
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setQuizComplete(false);
    setShowQuiz(false);
  };

  return (
    <div className="space-y-8 pt-6 select-none text-left relative pb-16">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-2xl bg-[#003DCB] text-white p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="flex-grow space-y-4 z-10 md:w-3/5 text-left leading-relaxed">
          <h2 className="font-sans font-bold text-2xl md:text-3xl tracking-tight leading-none">
            Your Future Starts Now
          </h2>
          <p className="font-sans text-sm md:text-base text-[#E1E4FF] opacity-90 max-w-xl">
            Investing isn't just for Wall Street experts. For students, time is your greatest asset. Starting small today can lead to financial freedom tomorrow.
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('basics');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#6CF8BB] text-[#002113] hover:brightness-105 active:scale-95 transition-all font-sans font-bold text-xs tracking-wider uppercase px-5 py-3 rounded-xl cursor-pointer"
          >
            GET STARTED
          </button>
        </div>

        {/* Hero Illustration circular image mockup matching user input list 10 */}
        <div className="relative w-44 h-44 md:w-48 md:h-48 aspect-square shrink-0 select-none pointer-events-none">
          <img
            className="w-full h-full object-cover rounded-full border-8 border-[#0F52FF]/35"
            alt="Growth sapling digital illustration"
            src="https://lh3.googleusercontent.com/some-sapling-growth-hotlink?dummy=1"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida-public/AB6AXuDdvYhi4VpCFILrC7dr_McfJom4ZtCDyACvwSJzSgvvaM1oXSvPVrpKOaQ031GaoMVcv0Jy9JRyA2bgkFnXABEXI07TmGkD1etpV_t4CspCBV3vWKPK24H9HaP1VkiCKZkbxYGQV86hmD_bbiOBDS9u31MXYc6bIIkuLV99Bb02bBspC_HFJmfDHeiJWKtoYRvnTNUUZJb8mtkWLbjiq_z4HUzXcWV3eb687J2yg0w-Fo1UmEpqEWGaidf_39jmzOhfoWRRkcVi9M9f";
            }}
          />
        </div>

        {/* background blobs */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#0F52FF]/20 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Investment Basics category section */}
      <section id="basics" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-sans font-bold text-lg text-[#0B1C30]">Investment Basics</h3>
          <span className="font-sans font-semibold text-xs text-[#003DCB]">Educational Guide</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 leading-relaxed">
          {/* Stocks */}
          <div className="bg-white p-5 rounded-2xl border border-[#C3C5D9]/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group text-left">
            <div className="w-11 h-11 rounded-xl bg-[#EFF4FF] flex items-center justify-center text-[#003DCB] mb-4 group-hover:scale-105 transition-transform shadow-inner">
              <TrendingUp className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-sans font-bold text-sm text-[#0B1C30] mb-1">Stocks</h4>
            <p className="font-sans text-[11px] md:text-xs text-[#434656]">
              Own a tiny piece of a company. Higher growth potential, but more volatility.
            </p>
          </div>

          {/* Bonds */}
          <div className="bg-white p-5 rounded-2xl border border-[#C3C5D9]/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group text-left">
            <div className="w-11 h-11 rounded-xl bg-[#6CF8BB]/15 flex items-center justify-center text-[#006C49] mb-4 group-hover:scale-105 transition-transform shadow-inner">
              <FileText className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-sans font-bold text-sm text-[#0B1C30] mb-1">Bonds</h4>
            <p className="font-sans text-[11px] md:text-xs text-[#434656]">
              Essentially an IOU to a government or corporation. Predictable and steady.
            </p>
          </div>

          {/* Index Funds */}
          <div className="bg-white p-5 rounded-2xl border border-[#C3C5D9]/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group text-left">
            <div className="w-11 h-11 rounded-xl bg-[#FFE1C0] flex items-center justify-center text-[#704500] mb-4 group-hover:scale-105 transition-transform shadow-inner">
              <Layers className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-sans font-bold text-sm text-[#0B1C30] mb-1">Index Funds</h4>
            <p className="font-sans text-[11px] md:text-xs text-[#434656]">
              A collection of stocks that tracks the entire market. The "set it and forget it" strategy.
            </p>
          </div>

          {/* ETFs */}
          <div className="bg-white p-5 rounded-2xl border border-[#C3C5D9]/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group text-left">
            <div className="w-11 h-11 rounded-xl bg-[#CBDBF5]/40 flex items-center justify-center text-[#0B1C30] mb-4 group-hover:scale-105 transition-transform shadow-inner">
              <Landmark className="h-5.5 w-5.5" />
            </div>
            <h4 className="font-sans font-bold text-sm text-[#0B1C30] mb-1">ETFs</h4>
            <p className="font-sans text-[11px] md:text-xs text-[#434656]">
              Exchange Traded Funds are like Index Funds but trade on the stock exchange like a stock.
            </p>
          </div>
        </div>
      </section>

      {/* Risk vs Return section */}
      <section className="bg-[#EFF4FF] rounded-2xl p-5 md:p-6 border border-[#C3C5D9]/30 text-left">
        <div className="flex flex-col md:flex-row gap-6 items-center leading-relaxed">
          <div className="flex-1 space-y-4">
            <h3 className="font-sans font-bold text-lg text-[#0B1C30]">Understanding Risk vs. Return</h3>
            <p className="font-sans text-xs md:text-sm text-[#434656] leading-relaxed">
              In investing, there's no such thing as a free lunch. Higher potential rewards usually come with higher risk. As a student, you can often afford more risk because you have more time to recover from market dips.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#BA1A1A] shrink-0"></span>
                <p className="font-sans text-xs font-semibold text-[#0B1C30]">High Risk: Individual Stocks, Crypto</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#003DCB] shrink-0"></span>
                <p className="font-sans text-xs font-semibold text-[#0B1C30]">Moderate Risk: Index Funds, Real Estate</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#006C49] shrink-0"></span>
                <p className="font-sans text-xs font-semibold text-[#0B1C30]">Low Risk: Bonds, Savings Accounts</p>
              </div>
            </div>
          </div>

          {/* Simple responsive bar charts */}
          <div className="w-full md:w-1/2 bg-white rounded-xl p-4 border border-[#C3C5D9]/40 flex flex-col justify-end">
            <div className="h-40 flex items-end gap-3 px-3 pb-8 border-l-2 border-b-2 border-[#C3C5D9] relative select-none">
              
              {/* Green Row */}
              <div className="flex-1 bg-[#006C49] rounded-t-sm" style={{ height: '30%' }}></div>
              {/* Blue Row */}
              <div className="flex-1 bg-[#003DCB] rounded-t-sm" style={{ height: '60%' }}></div>
              {/* Red Row */}
              <div className="flex-1 bg-[#BA1A1A] rounded-t-sm" style={{ height: '90%' }}></div>

              {/* Axis labels */}
              <span className="absolute -bottom-6 left-1 text-[10px] font-sans font-bold text-[#737688]">Low Risk</span>
              <span className="absolute -bottom-6 right-1 text-[10px] font-sans font-bold text-[#737688]">High Risk</span>
              <span className="absolute -left-12 top-0 -rotate-90 text-[10px] font-sans font-bold text-[#737688]">RETURN</span>
            </div>
          </div>
        </div>
      </section>

      {/* Smart student guide tips horizontal overflow */}
      <section className="space-y-4">
        <h3 className="font-sans font-bold text-lg text-[#0B1C30]">Smart Tips for Student Investors</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {/* Card 1 */}
          <div className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white p-5 rounded-2xl shadow-sm border border-[#C3C5D9]/40 relative overflow-hidden select-none hover:border-[#003DCB]/45 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-5 text-[#4EDE93] pointer-events-none">
              <Award className="h-16 w-16" />
            </div>
            <div className="text-[#006C49] font-sans font-bold text-base mb-1">8th Wonder</div>
            <h4 className="font-sans font-bold text-sm text-[#0B1C30] mb-2 leading-none">Compound Interest</h4>
            <p className="font-sans text-xs text-[#434656] leading-relaxed">
              Earning interest on your interest. The earlier you start, the more powerful this becomes. Even $20/month makes a difference.
            </p>
          </div>

          {/* Card 2 */}
          <div className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white p-5 rounded-2xl shadow-sm border border-[#C3C5D9]/40 relative overflow-hidden select-none hover:border-[#003DCB]/45 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-5 text-[#003DCB] pointer-events-none">
              <PieChart className="h-16 w-16" />
            </div>
            <div className="text-[#003DCB] font-sans font-bold text-base mb-1">Safety First</div>
            <h4 className="font-sans font-bold text-sm text-[#0B1C30] mb-2 leading-none">Diversification</h4>
            <p className="font-sans text-xs text-[#434656] leading-relaxed">
              Don't put all your eggs in one basket. Spreading investments across different sectors reduces your risk significantly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white p-5 rounded-2xl shadow-sm border border-[#C3C5D9]/40 relative overflow-hidden select-none hover:border-[#003DCB]/45 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-5 text-[#FFE1C0] pointer-events-none">
              <Lightbulb className="h-16 w-16" />
            </div>
            <div className="text-[#905B00] font-sans font-bold text-base mb-1">Budget Tip</div>
            <h4 className="font-sans font-bold text-sm text-[#0B1C30] mb-2 leading-none">Pay Yourself First</h4>
            <p className="font-sans text-xs text-[#434656] leading-relaxed">
              Treat your investment like a mandatory bill. Move it to your brokerage account as soon as you get your allowance.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM ACTION CTA CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Risk Quiz trigger */}
        <div
          onClick={() => setShowQuiz(true)}
          className="bg-[#DCE9FF] rounded-xl p-5 flex items-center justify-between group cursor-pointer hover:bg-[#DCE9FF]/80 transition-colors shadow-inner"
        >
          <div className="space-y-1 text-left leading-none">
            <h4 className="font-sans font-bold text-[#0B1C30] text-sm md:text-base">Risk Quiz</h4>
            <p className="font-sans text-xs text-[#434656]">Discover your investor personality.</p>
          </div>
          <ChevronRight className="text-[#003DCB] h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
        </div>

        {/* Best Platform list trigger */}
        <div
          onClick={() => setShowPlatforms(true)}
          className="bg-[#6CF8BB]/10 rounded-xl p-5 flex items-center justify-between group cursor-pointer hover:bg-[#6CF8BB]/20 transition-colors border border-[#6CF8BB]/30"
        >
          <div className="space-y-1 text-left leading-none">
            <h4 className="font-sans font-bold text-[#006C49] text-sm md:text-base">Best Platforms</h4>
            <p className="font-sans text-xs text-[#434656]">Student-friendly trading apps.</p>
          </div>
          <Rocket className="text-[#006C49] h-5.5 w-5.5 group-hover:translate-x-1.5 transition-transform animate-bounce-subtle" />
        </div>
      </section>

      {/* INTERACTIVE 3-STEP QUIZ modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-[#0B1C30]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full border border-[#C3C5D9]/40 text-left relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close */}
            <button
              onClick={resetQuiz}
              className="absolute top-4 right-4 text-[#737688] hover:text-[#0B1C30] p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {!quizComplete ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#003DCB] font-sans font-semibold text-xs select-none uppercase tracking-wider mb-2">
                  <HelpCircle className="h-4.5 w-4.5" />
                  <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                </div>

                <h3 className="font-sans font-bold text-base text-[#0B1C30] leading-snug">
                  {quizQuestions[quizStep].text}
                </h3>

                <div className="flex flex-col gap-3 pt-2">
                  {quizQuestions[quizStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(opt.score)}
                      className="w-full text-left p-4 rounded-xl border border-[#C3C5D9] hover:border-[#003DCB] hover:bg-[#EFF4FF] transition-all font-sans text-xs font-semibold text-[#0B1C30]"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>

                {/* Progress dot list */}
                <div className="flex gap-1.5 justify-center pt-2">
                  {quizQuestions.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === quizStep
                          ? 'w-6 bg-[#003DCB]'
                          : idx < quizStep
                          ? 'w-2 bg-[#4EDE93]'
                          : 'w-2 bg-[#C3C5D9]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Quiz Completed results screen
              <div className="space-y-4 text-center">
                <div className="inline-flex p-3 rounded-full bg-[#6CF8BB]/20 text-[#006C49] mb-1">
                  <Award className="h-8 w-8 animate-bounce-subtle" />
                </div>
                
                <h3 className="font-sans font-bold text-xl text-[#0B1C30] leading-none">
                  Quiz Completed!
                </h3>
                
                <p className="font-sans text-xs text-[#737688]">We matched you to your investor asset personality:</p>
                
                <div className="p-4 bg-[#EFF4FF] rounded-xl border border-[#C3C5D9]/30 text-left">
                  <h4 className="font-sans font-bold text-md text-[#003DCB]">{getQuizResult().personality}</h4>
                  <p className="font-sans text-xs text-[#434656] mt-1.5 leading-relaxed">
                    {getQuizResult().description}
                  </p>
                  <div className="mt-3 text-[10px] uppercase font-bold text-[#006C49] bg-[#6CF8BB]/20 px-2 py-1 rounded w-fit">
                    Recommended Mix: {getQuizResult().ratio}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      setQuizStep(0);
                      setQuizScore(0);
                      setQuizComplete(false);
                    }}
                    className="flex-1 py-3 border border-[#C3C5D9] text-[#737688] font-semibold rounded-xl text-xs"
                  >
                    Retake Quiz
                  </button>

                  <button
                    onClick={resetQuiz}
                    className="flex-1 py-3 bg-[#003DCB] text-white font-semibold rounded-xl text-xs"
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BEST TRADING PLATFORMS list overlay */}
      {showPlatforms && (
        <div className="fixed inset-0 bg-[#0B1C30]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full border border-[#C3C5D9]/40 text-left relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close */}
            <button
              onClick={() => setShowPlatforms(false)}
              className="absolute top-4 right-4 text-[#737688] hover:text-[#0B1C30] p-1 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-sans font-bold text-base text-[#0B1C30] mb-4 select-none leading-none">
              Trading Platforms
            </h3>
            <p className="font-sans text-xs text-[#737688] mb-4">
              Here are highly reliable student-friendly micro-investing alternatives:
            </p>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              
              <div className="p-3 bg-neutral-50 rounded-xl border border-[#C3C5D9]/30 text-left">
                <h5 className="font-sans font-bold text-xs text-[#0B1C30]">Robinhood Youth</h5>
                <p className="font-sans text-[11px] text-[#434656] mt-1 lead-tight">
                  Zero commission fractional shares. Extremely clean visual UI and educational learning cards built-in.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-[#C3C5D9]/30 text-left">
                <h5 className="font-sans font-bold text-xs text-[#0B1C30]">Fidelity Youth Account</h5>
                <p className="font-sans text-[11px] text-[#434656] mt-1 lead-tight">
                  Allows students 13-17 to trade with zero fee stock/etf options under parental guardian oversight.
                </p>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-[#C3C5D9]/30 text-left">
                <h5 className="font-sans font-bold text-xs text-[#0B1C30]">Acorns Student</h5>
                <p className="font-sans text-[11px] text-[#434656] mt-1 lead-tight">
                  Micro-saving spare change roundup system. Automatically bundles small cents from card purchases into customized ETFs.
                </p>
              </div>

            </div>

            <button
              onClick={() => setShowPlatforms(false)}
              className="w-full mt-4 py-3 bg-[#003DCB] text-white font-semibold rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
