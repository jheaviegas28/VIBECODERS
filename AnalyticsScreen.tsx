import { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Info,
  Calendar,
  Utensils,
  Home as HomeIcon,
  Film,
  Car,
  ChevronRight,
  Sparkles,
  Award
} from 'lucide-react';
import { Screen } from '../types';

interface AnalyticsScreenProps {
  navigate: (screen: Screen) => void;
}

export default function AnalyticsScreen({ navigate }: AnalyticsScreenProps) {
  const [activeTab, setActiveTab] = useState<'week' | 'month' | 'year'>('month');
  const [animateChart, setAnimateChart] = useState(false);
  const [selectedHeatmapCell, setSelectedHeatmapCell] = useState<{ day: string; amount: number } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateChart(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Heatmap simulator values
  const heatmapData = [
    { label: 'M1', spendingAndVal: 12.00, intensity: 'bg-[#EFF4FF]' },
    { label: 'T1', spendingAndVal: 45.00, intensity: 'bg-[#DCE9FF]' },
    { label: 'W1', spendingAndVal: 120.00, intensity: 'bg-[#0F52FF]/60' },
    { label: 'T1', spendingAndVal: 5.00, intensity: 'bg-[#F8FAFC]' },
    { label: 'F1', spendingAndVal: 85.00, intensity: 'bg-[#0F52FF]/40' },
    { label: 'S1', spendingAndVal: 250.00, intensity: 'bg-[#003DCB]' },
    { label: 'S1', spendingAndVal: 180.00, intensity: 'bg-[#0F52FF]/80' },

    { label: 'M2', spendingAndVal: 15.00, intensity: 'bg-[#EFF4FF]' },
    { label: 'T2', spendingAndVal: 0.00, intensity: 'bg-[#F8FAFC]' },
    { label: 'W2', spendingAndVal: 40.00, intensity: 'bg-[#DCE9FF]' },
    { label: 'T2', spendingAndVal: 210.00, intensity: 'bg-[#003DCB]' },
    { label: 'F2', spendingAndVal: 22.00, intensity: 'bg-[#EFF4FF]' },
    { label: 'S2', spendingAndVal: 135.00, intensity: 'bg-[#0F52FF]/70' },
    { label: 'S2', spendingAndVal: 90.00, intensity: 'bg-[#0F52FF]/40' },

    { label: 'M3', spendingAndVal: 8.00, intensity: 'bg-[#EFF4FF]' },
    { label: 'T3', spendingAndVal: 62.00, intensity: 'bg-[#0F52FF]/30' },
    { label: 'W3', spendingAndVal: 18.00, intensity: 'bg-[#EFF4FF]' },
    { label: 'T3', spendingAndVal: 0.00, intensity: 'bg-[#F8FAFC]' },
    { label: 'F3', spendingAndVal: 110.00, intensity: 'bg-[#0F52FF]/60' },
    { label: 'S3', spendingAndVal: 35.00, intensity: 'bg-[#DCE9FF]' },
    { label: 'S3', spendingAndVal: 75.00, intensity: 'bg-[#0F52FF]/30' },

    { label: 'M4', spendingAndVal: 28.00, intensity: 'bg-[#DCE9FF]' },
    { label: 'T4', spendingAndVal: 0.00, intensity: 'bg-[#F8FAFC]' },
    { label: 'W4', spendingAndVal: 12.00, intensity: 'bg-[#EFF4FF]' },
    { label: 'T4', spendingAndVal: 55.00, intensity: 'bg-[#0F52FF]/30' },
    { label: 'F4', spendingAndVal: 0.00, intensity: 'bg-[#F8FAFC]' },
    { label: 'S4', spendingAndVal: 165.00, intensity: 'bg-[#0F52FF]/80' },
    { label: 'S4', spendingAndVal: 45.00, intensity: 'bg-[#DCE9FF]' },
  ];

  const getHeatRelativeLabel = (index: number) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const week = Math.floor(index / 7) + 1;
    const dayName = days[index % 7];
    return `${dayName}, Week ${week}`;
  };

  // Double columns month trend data mapping:
  const monthlyTrends = [
    { label: 'Feb', income: 80, expenses: 60 },
    { label: 'Mar', income: 90, expenses: 50 },
    { label: 'Apr', income: 75, expenses: 45 },
    { label: 'May', income: 95, expenses: 70 },
    { label: 'Jun', income: 85, expenses: 65 },
  ];

  return (
    <div className="space-y-6 pt-6 select-none text-left">
      {/* Header Info & Switcher tabs */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-[#0B1C30] tracking-tight">
            Financial Insights
          </h2>
          <p className="font-sans text-xs md:text-sm text-[#434656]">
            Tracking your performance for June 2024
          </p>
        </div>

        {/* Core selector tabs */}
        <div className="flex items-center bg-[#E5EEFF] rounded-xl p-1 gap-1 w-fit">
          {['week', 'month', 'year'].map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 font-sans font-semibold text-xs rounded-lg transition-all capitalize cursor-pointer ${
                  isActive
                    ? 'bg-[#003DCB] text-white shadow-sm'
                    : 'text-[#434656] hover:bg-[#DCE9FF]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Goal Completion Card (Expected vs Real) */}
        <div className="md:col-span-8 bg-white rounded-2xl p-5 md:p-6 border border-[#C3C5D9]/40 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-sans font-bold text-base text-[#0B1C30]">Goal Completion</h3>
              <p className="font-sans text-xs text-[#737688]">Savings Target vs. Actual Progress</p>
            </div>
            
            <span className="bg-[#6CF8BB]/30 text-[#006C49] px-3 py-1 rounded-full font-sans font-semibold text-xs flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>85% Achieved</span>
            </span>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between font-sans font-semibold text-xs">
                <span className="text-[#737688] uppercase tracking-wider">Target: $2,500.00</span>
                <span className="text-[#0F52FF] font-bold">$2,125.40</span>
              </div>
              
              <div className="w-full h-4 bg-[#E5EEFF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#003DCB] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: animateChart ? '85%' : '0%' }}
                ></div>
              </div>
            </div>

            {/* expected vs variance grids */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#C3C5D9]/20 pt-6">
              <div>
                <p className="font-sans font-semibold text-xs text-[#737688]">Expected Daily</p>
                <p className="font-sans font-bold text-sm text-[#0B1C30] mt-0.5">$83.33</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-xs text-[#737688]">Actual Daily</p>
                <p className="font-sans font-bold text-sm text-[#003DCB] mt-0.5">$70.84</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-xs text-[#737688]">Projected End</p>
                <p className="font-sans font-bold text-sm text-[#0B1C30] mt-0.5">$2,240.00</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-xs text-[#737688]">Variance</p>
                <p className="font-sans font-bold text-sm text-[#BA1A1A] mt-0.5">-$260.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Activity Spending Heatmap */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 border border-[#C3C5D9]/40 shadow-sm relative overflow-hidden">
          <div className="mb-4">
            <h3 className="font-sans font-bold text-base text-[#0B1C30]">Daily Activity</h3>
            <p className="font-sans text-xs text-[#737688]">Peak spending intensity</p>
          </div>

          {/* Popover daily value tooltip overlay if clicked */}
          {selectedHeatmapCell && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#213145] text-white py-2 px-3 rounded-lg text-xs font-sans tracking-tight shadow-md border border-white/15 z-20 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-100 max-w-sm w-36 whitespace-nowrap">
              <span className="font-bold text-white/70">{selectedHeatmapCell.day}</span>
              <span className="font-sans font-bold text-sm text-[#6CF8BB]">${selectedHeatmapCell.amount.toFixed(2)} spending</span>
              <button
                onClick={() => setSelectedHeatmapCell(null)}
                className="mt-1 text-[10px] text-white/50 hover:text-white uppercase font-bold tracking-wider pt-1 border-t border-white/5"
              >
                Close
              </button>
            </div>
          )}

          {/* Grid View calendar */}
          <div className="grid grid-cols-7 gap-1">
            {/* Days Labels */}
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-[10px] text-center text-[#737688] font-bold py-1">
                {day}
              </div>
            ))}

            {/* Grid Blocks */}
            {heatmapData.map((cell, idx) => (
              <button
                key={idx}
                onMouseEnter={() => {}}
                onClick={() =>
                  setSelectedHeatmapCell({
                    day: getHeatRelativeLabel(idx),
                    amount: cell.spendingAndVal,
                  })
                }
                title={`$${cell.spendingAndVal.toFixed(2)}`}
                className={`aspect-square rounded-[3px] border border-[#F8F9FF]/10 transition-transform hover:scale-[1.1] ${cell.intensity}`}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between font-sans font-semibold text-[11px] text-[#737688]">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-[#F8FAFC] border border-[#C3C5D9]/20 rounded-sm"></div>
              <div className="w-3 h-3 bg-[#DCE9FF] rounded-sm"></div>
              <div className="w-3 h-3 bg-[#0F52FF]/40 rounded-sm"></div>
              <div className="w-3 h-3 bg-[#003DCB] rounded-sm"></div>
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Category breakdown reports progress indicator lists */}
        <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-[#C3C5D9]/40 shadow-sm">
          <h3 className="font-sans font-bold text-base text-[#0B1C30] mb-5">Spending by Category</h3>
          
          <div className="flex flex-col gap-4">
            
            {/* Food & Dining */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EFF4FF] flex items-center justify-center text-[#003DCB] shrink-0">
                <Utensils className="h-4 w-4" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between font-sans text-xs font-semibold mb-1">
                  <span>Food & Dining</span>
                  <span className="font-bold text-[#0B1C30]">$482.00</span>
                </div>
                <div className="w-full h-1.5 bg-[#E5EEFF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#003DCB] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateChart ? '32%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Rent & Utilities */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#6CF8BB]/20 flex items-center justify-center text-[#006C49] shrink-0">
                <HomeIcon className="h-4 w-4" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between font-sans text-xs font-semibold mb-1">
                  <span>Rent & Utilities</span>
                  <span className="font-bold text-[#0B1C30]">$850.00</span>
                </div>
                <div className="w-full h-1.5 bg-[#E5EEFF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#006C49] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateChart ? '55%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Entertainment */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFE1C0] flex items-center justify-center text-[#704500] shrink-0">
                <Film className="h-4 w-4" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between font-sans text-xs font-semibold mb-1">
                  <span>Entertainment</span>
                  <span className="font-bold text-[#0B1C30]">$210.00</span>
                </div>
                <div className="w-full h-1.5 bg-[#E5EEFF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFB95F] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateChart ? '15%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Transport */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFDAD6] flex items-center justify-center text-[#BA1A1A] shrink-0">
                <Car className="h-4 w-4" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between font-sans text-xs font-semibold mb-1">
                  <span>Transport</span>
                  <span className="font-bold text-[#0B1C30]">$140.00</span>
                </div>
                <div className="w-full h-1.5 bg-[#E5EEFF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#BA1A1A] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateChart ? '8%' : '0%' }}
                  ></div>
                </div>
              </div>
            </div>

          </div>

          <button
            onClick={() => alert("Full detailed CSV breakdown is sent to your registered university email.")}
            className="w-full mt-5 py-2.5 border border-[#C3C5D9] rounded-xl font-sans font-semibold text-xs text-[#003DCB] hover:bg-[#EFF4FF] transition-colors cursor-pointer select-none text-center"
          >
            View Full Report
          </button>
        </div>

        {/* Monthly comparison bars (Income vs Expenses) */}
        <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-[#C3C5D9]/40 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-sans font-bold text-base text-[#0B1C30]">Monthly Trend</h3>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#003DCB] rounded-full shrink-0"></span>
                <span className="font-sans font-semibold text-[11px] text-[#737688]">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#4EDE93] rounded-full shrink-0"></span>
                <span className="font-sans font-semibold text-[11px] text-[#737688]">Expenses</span>
              </div>
            </div>
          </div>

          {/* Double bars charts SVG view */}
          <div className="h-40 flex items-end justify-between px-2 gap-4">
            {monthlyTrends.map((month, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end select-none">
                <div className="flex items-end gap-1.5 w-full h-4/5 relative">
                  {/* Income bar growth */}
                  <div
                    className="flex-1 bg-[#003DCB] rounded-t-[3px] transition-all duration-1000 origin-bottom"
                    style={{ height: animateChart ? `${month.income}%` : '0%' }}
                  ></div>
                  {/* Expenses bar growth */}
                  <div
                    className="flex-1 bg-[#4EDE93] rounded-t-[3px] transition-all duration-1000 origin-bottom"
                    style={{ height: animateChart ? `${month.expenses}%` : '0%' }}
                  ></div>
                </div>
                <span className="font-sans font-semibold text-[11px] text-[#737688]">
                  {month.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
