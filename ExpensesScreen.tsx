import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Calendar,
  Layers,
  ArrowUpDown,
  TrendingDown,
  Lightbulb,
  Utensils,
  ShoppingBag,
  Landmark,
  Heart,
  Plus,
  CreditCard,
  X
} from 'lucide-react';
import { SavingPot, Screen, Transaction, User } from '../types';

interface ExpensesProps {
  user: User;
  transactions: Transaction[];
  pots: SavingPot[];
  navigate: (screen: Screen) => void;
  onAddTransaction: (tx: Partial<Transaction>) => void;
}

export default function ExpensesScreen({ user, transactions, pots, navigate, onAddTransaction }: ExpensesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'Dining' | 'Supplies' | 'Housing' | 'Health'>('all');
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('Dining');
  const [txMethod, setTxMethod] = useState('Debit Card');

  // Dynamically calculate spendable progress
  const spendableRemaining = user.totalBalance - pots.reduce((sum, p) => sum + (p.isLocked ? p.currentSaved : 0), 0);
  const spendableBudget = 1500;
  const utilizedPercent = Math.min(100, Math.round(((spendableBudget - spendableRemaining) / spendableBudget) * 100));

  // Determine low balance indicator status
  const isLowBalance = spendableRemaining < 500;

  // Filter & Search logic
  const filteredTxs = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'all' || tx.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Group transactions by Date Relative labels to reflect mockup view
  const groupedTransactions: { [key: string]: Transaction[] } = {};
  filteredTxs.forEach((tx) => {
    let group = 'Older Activity';
    if (tx.date.startsWith('Today')) {
      group = 'Today, Oct 24';
    } else if (tx.date.startsWith('Yesterday')) {
      group = 'Yesterday, Oct 23';
    } else if (tx.date.startsWith('Oct 23') || tx.date.startsWith('Oct 24')) {
      group = tx.date.split(',')[0];
    } else {
      group = 'Older Activity';
    }
    
    if (!groupedTransactions[group]) {
      groupedTransactions[group] = [];
    }
    groupedTransactions[group].push(tx);
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dining':
        return <Utensils className="h-5 w-5" />;
      case 'Supplies':
        return <ShoppingBag className="h-5 w-5" />;
      case 'Housing':
        return <Landmark className="h-5 w-5" />;
      case 'Health':
        return <Heart className="h-5 w-5 animate-pulse-slow" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getCategoryPillStyle = (category: string) => {
    switch (category) {
      case 'Dining':
        return 'bg-[#FFE1C0] text-[#704500] border-[#704500]/10';
      case 'Supplies':
        return 'bg-[#6CF8BB]/30 text-[#006C49] border-[#006C49]/10';
      case 'Housing':
        return 'bg-[#EFF4FF] text-[#003DCB] border-[#003DCB]/10';
      case 'Health':
        return 'bg-[#FFDAD6] text-[#BA1A1A] border-[#BA1A1A]/10';
      default:
        return 'bg-[#CBDBF5]/30 text-[#0B1C30] border-[#0B1C30]/15';
    }
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txTitle.trim() || !txAmount) return;

    const amountNum = parseFloat(txAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    onAddTransaction({
      title: txTitle,
      amount: -amountNum,
      category: txCategory,
      paymentMethod: txMethod
    });

    // Reset Forms
    setTxTitle('');
    setTxAmount('');
    setShowAddExpenseModal(false);
  };

  return (
    <div className="space-y-6 pt-6 select-none relative pb-16">
      {/* Search and Category Filter Nav-Bar */}
      <section className="space-y-4 text-left">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Custom Search bar with scaling focus feedback */}
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737688]" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#C3C5D9] rounded-xl focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all font-sans text-sm text-[#0B1C30]"
            />
          </div>

          {/* Core Categories list buttons */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveFilter(activeFilter === 'all' ? 'all' : 'all')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-sans font-semibold text-xs transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#003DCB] text-white'
                  : 'bg-[#EFF4FF] text-[#434656] hover:bg-[#DCE9FF]'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>All Categories</span>
            </button>

            {['Dining', 'Supplies', 'Housing', 'Health'].map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(isActive ? 'all' : (cat as any))}
                  className={`px-4 py-2 rounded-full font-sans font-semibold text-xs transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#003DCB] text-white shadow-sm'
                      : 'bg-white hover:bg-[#EFF4FF] border border-[#C3C5D9]/50 text-[#434656]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        {/* Left column items: Spendable progress report, smart alerts */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Spendable Remaining Hero Unit Card */}
          <div className="bg-white p-6 rounded-2xl border border-[#C3C5D9]/40 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="font-sans font-semibold text-xs text-[#737688] tracking-widest uppercase mb-1">
                Spendable Remaining
              </h2>
              
              <div className="flex items-baseline gap-1.5 mb-4 select-none">
                <span className="font-sans font-bold text-3xl text-[#003DCB] tracking-tight">
                  ${spendableRemaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="font-sans text-xs text-[#434656]">
                  / ${spendableBudget.toLocaleString('en-US')}
                </span>
              </div>

              {/* Progress Bar Visualization matching user specs */}
              <div className="space-y-1.5 mb-6">
                <div className="h-3 w-full bg-[#E5EEFF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#003DCB] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${utilizedPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between font-sans font-semibold text-[11px] text-[#434656]">
                  <span>{utilizedPercent}% of budget used</span>
                  {isLowBalance ? (
                    <span className="text-[#BA1A1A] font-bold">Low balance</span>
                  ) : (
                    <span className="text-[#006C49] font-bold">Healthy balance</span>
                  )}
                </div>
              </div>

              {/* Avg. Daily spending tracker list */}
              <div className="flex items-center gap-3 p-4 bg-[#EFF4FF] rounded-xl border border-[#C3C5D9]/15">
                <div className="w-10 h-10 rounded-full bg-[#0F52FF] flex items-center justify-center text-white shadow-sm shrink-0">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-sans text-xs text-[#434656]">Avg. Daily Spending</p>
                  <p className="font-sans font-bold text-sm text-[#0B1C30]">$14.20</p>
                </div>
              </div>
            </div>

            {/* Ambient visual padding */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#003DCB]/5 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          {/* Smart Tip widget */}
          <div className="bg-[#6CF8BB]/10 p-5 rounded-2xl border border-[#6CF8BB]/30 flex items-start gap-3">
            <Lightbulb className="text-[#006C49] h-5 w-5 shrink-0 mt-0.5 fill-[#006C49]/10" />
            <div className="text-left select-none">
              <p className="font-sans font-bold text-[10px] text-[#005236] tracking-wider uppercase mb-0.5">SMART TIP</p>
              <p className="font-sans text-xs text-[#002113] leading-relaxed">
                You've spent $50 less on dining this week compared to last. Keep it up!
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Main Transaction grouped listing */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl border border-[#C3C5D9]/40 shadow-sm overflow-hidden text-left">
            <div className="p-4 border-b border-[#C3C5D9]/30 flex justify-between items-center bg-white">
              <h3 className="font-sans font-bold text-base text-[#0B1C30]">Transaction History</h3>
              <span className="font-sans font-semibold text-[10px] px-3 py-1 bg-[#DCE9FF] text-[#003DCB] rounded-full uppercase tracking-wider">
                Last 30 Days
              </span>
            </div>

            <div className="flex flex-col">
              {Object.keys(groupedTransactions).length === 0 ? (
                <div className="p-8 text-center text-[#737688]">
                  No matching transaction entries discovered.
                </div>
              ) : (
                Object.keys(groupedTransactions).map((dateLabel) => (
                  <div key={dateLabel}>
                    {/* Header Label group */}
                    <div className="px-4 py-2 bg-[#F8FAFC] border-b border-[#C3C5D9]/20">
                      <span className="font-sans font-bold text-[10px] text-[#737688] uppercase tracking-widest">
                        {dateLabel}
                      </span>
                    </div>

                    {/* Group rows item list */}
                    <div className="divide-y divide-[#C3C5D9]/20">
                      {groupedTransactions[dateLabel].map((tx) => {
                        const isNegative = tx.amount < 0;
                        return (
                          <div
                            key={tx.id}
                            className="p-4 flex items-center justify-between hover:bg-[#F8F9FF] transition-colors cursor-pointer group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-[#EFF4FF] text-[#003DCB] hover:text-[#003DCB] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-sm">
                                {getCategoryIcon(tx.category)}
                              </div>

                              <div>
                                <p className="font-sans font-bold text-sm text-[#0B1C30] tracking-tight">
                                  {tx.title}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className={`font-sans font-bold text-[9px] px-2 py-0.5 uppercase tracking-wide rounded border ${getCategoryPillStyle(tx.category)}`}>
                                    {tx.category}
                                  </span>
                                  <span className="text-[#737688] text-[11px]">
                                    • {tx.date.includes(',') ? tx.date.split(',')[1].trim() : tx.date}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className={`font-sans font-bold text-sm tracking-tight ${isNegative ? 'text-[#BA1A1A]' : 'text-[#006C49]'}`}>
                                {isNegative ? '-' : '+'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </p>
                              <p className="font-sans text-[10px] text-[#737688] tracking-tight">{tx.paymentMethod}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}

              {/* View older mockup button link */}
              <div className="p-5 text-center border-t border-[#C3C5D9]/20">
                <button
                  onClick={() => alert("Loading more transactions is disabled in offline mode.")}
                  className="font-sans font-semibold text-xs text-[#003DCB] hover:underline cursor-pointer"
                >
                  View Older Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Floating Action Button FAB for mobile view tracking */}
      <button
        onClick={() => setShowAddExpenseModal(true)}
        className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 bg-[#003DCB] hover:bg-[#003DCB]/95 text-white rounded-full shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 transition-all z-40 flex items-center justify-center group cursor-pointer"
        title="Add Transaction"
      >
        <Plus className="h-7 w-7" />
        <span className="absolute right-full mr-3 bg-[#0B1C30] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Add Transaction
        </span>
      </button>

      {/* Quick Add Expense popup form slider */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 bg-[#0B1C30]/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full border border-[#C3C5D9]/40 text-left relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAddExpenseModal(false)}
              className="absolute top-4 right-4 text-[#737688] hover:text-[#0B1C30] p-1 rounded-full hover:bg-[#F8F9FF] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-sans font-bold text-base text-[#0B1C30] mb-5">
              Add Instant Expense
            </h3>

            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div className="space-y-1">
                <label className="font-sans font-semibold text-xs text-[#737688]" htmlFor="txTitleNew">
                  Merchant/Item Name
                </label>
                <input
                  id="txTitleNew"
                  type="text"
                  placeholder="e.g., Target, Campus Diner"
                  value={txTitle}
                  onChange={(e) => setTxTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FF] border border-[#C3C5D9]/60 rounded-lg text-sm font-sans focus:outline-none focus:border-[#003DCB] transition-colors font-semibold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans font-semibold text-xs text-[#737688]" htmlFor="txAmountNew">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#737688]">$</span>
                  <input
                    id="txAmountNew"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-[#F8F9FF] border border-[#C3C5D9]/60 rounded-lg text-sm font-sans focus:outline-none focus:border-[#003DCB] transition-colors font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-sans font-semibold text-xs text-[#737688]" htmlFor="txCategoryNew">
                    Category
                  </label>
                  <select
                    id="txCategoryNew"
                    value={txCategory}
                    onChange={(e) => setTxCategory(e.target.value)}
                    className="w-full px-2 py-2 bg-[#F8F9FF] border border-[#C3C5D9]/60 rounded-lg text-xs font-sans focus:outline-none focus:border-[#003DCB] transition-colors"
                  >
                    <option value="Dining">Dining</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Housing">Housing</option>
                    <option value="Health">Health</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-sans font-semibold text-xs text-[#737688]" htmlFor="txMethodNew">
                    Payment Method
                  </label>
                  <select
                    id="txMethodNew"
                    value={txMethod}
                    onChange={(e) => setTxMethod(e.target.value)}
                    className="w-full px-2 py-2 bg-[#F8F9FF] border border-[#C3C5D9]/60 rounded-lg text-xs font-sans focus:outline-none focus:border-[#003DCB] transition-colors"
                  >
                    <option value="Debit Card">Debit Card</option>
                    <option value="Checking">Checking</option>
                    <option value="Subscription">Subscription</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-[#003DCB] hover:bg-[#003DCB]/90 text-white text-sm font-sans font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98]"
              >
                Create Transaction
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
