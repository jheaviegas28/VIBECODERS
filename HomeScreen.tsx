import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  PlusCircle,
  FolderPlus,
  ShoppingBag,
  Utensils,
  Landmark,
  ShieldAlert,
  ChevronRight,
  BookOpen,
  DollarSign,
  Coffee,
  X,
  CreditCard,
  Plus
} from 'lucide-react';
import { Screen, User, Transaction, SavingPot } from '../types';

interface HomeScreenProps {
  user: User;
  transactions: Transaction[];
  pots: SavingPot[];
  navigate: (screen: Screen) => void;
  onAddTransaction: (tx: Partial<Transaction>) => void;
}

export default function HomeScreen({ user, transactions, pots, navigate, onAddTransaction }: HomeScreenProps) {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txCategory, setTxCategory] = useState('Dining');
  const [txMethod, setTxMethod] = useState('Debit Card');

  // Calculations that perfectly sync layout mathematically
  const spendableBalance = user.totalBalance - pots.reduce((sum, p) => sum + (p.isLocked ? p.currentSaved : 0), 0);
  const allocatedSavings = pots.reduce((sum, p) => sum + p.currentSaved, 0);
  const calculatedTotal = spendableBalance + allocatedSavings;

  // Render recent activity items
  const recentTx = transactions.slice(0, 3);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dining':
        return <Utensils className="h-5 w-5 text-[#003DCB]" />;
      case 'Supplies':
        return <ShoppingBag className="h-5 w-5 text-[#003DCB]" />;
      case 'Housing':
        return <Landmark className="h-5 w-5 text-[#003DCB]" />;
      case 'Income':
        return <TrendingUp className="h-5 w-5 text-[#006C49]" />;
      default:
        return <CreditCard className="h-5 w-5 text-[#003DCB]" />;
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

    // Reset Form
    setTxTitle('');
    setTxAmount('');
    setShowAddExpenseModal(false);
  };

  return (
    <div className="space-y-6 pt-6 select-none relative">
      {/* Spendable Alert Banner */}
      <div className="flex items-center gap-3 p-4 bg-[#FFDDB8] text-[#2A1700] rounded-2xl border border-[#704500]/10 animate-pulse-slow">
        <ShieldAlert className="text-[#704500] h-5 w-5 shrink-0" />
        <p className="font-sans text-xs md:text-sm font-semibold text-left">
          You've used 80% of your spendable balance this week.
        </p>
      </div>

      {/* Balance Overview Cards (Bento Layout Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Spendable Card */}
        <div className="md:col-span-2 p-6 md:p-8 rounded-[24px] bg-[#003DCB] text-white shadow-md relative overflow-hidden group">
          {/* Visual abstract overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F52FF]/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-[#0F52FF]/30 transition-all duration-700 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between text-left">
            <div>
              <span className="font-sans font-semibold text-xs tracking-wider uppercase opacity-80">
                Spendable Balance
              </span>
              <h2 className="font-sans font-bold text-4xl md:text-5xl mt-1 tracking-tight">
                ${spendableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>

            <div className="mt-8 md:mt-12 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 fill-[#6FFBCE]/10 text-[#6FFBCE]" />
              <p className="font-sans text-xs text-white/90">Safe to spend for the next 4 days</p>
            </div>
          </div>
        </div>

        {/* Total and Allocated Sub-Cards */}
        <div className="flex flex-col gap-4 text-left">
          {/* Total Balance Card */}
          <div className="flex-1 p-5 rounded-2xl bg-white border border-[#C3C5D9]/40 shadow-sm hover:shadow-md transition-shadow">
            <span className="font-sans font-semibold text-xs text-[#434656] tracking-wider uppercase">
              Total Balance
            </span>
            <p className="font-sans font-bold text-2xl text-[#0B1C30] mt-1 tracking-tight">
              ${calculatedTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Allocated Card */}
          <div className="flex-1 p-5 rounded-2xl bg-[#6CF8BB] text-[#002113] border border-[#006C49]/10 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="relative z-10">
              <span className="font-sans font-semibold text-xs text-[#005236] tracking-wider uppercase opacity-80">
                Allocated (Savings)
              </span>
              <p className="font-sans font-bold text-2xl text-[#002113] mt-1 tracking-tight">
                ${allocatedSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            
            {/* Background vector padlock design */}
            <span className="absolute -right-4 -bottom-4 text-[#006C49]/10 transition-transform duration-300 group-hover:scale-110 pointer-events-none text-7xl font-semibold material-symbols-outlined select-none">
              lock
            </span>
          </div>
        </div>
      </section>

      {/* Quick Actions Component */}
      <section className="text-left">
        <h3 className="font-sans font-bold text-lg text-[#0B1C30] mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="flex items-center justify-center gap-2.5 p-4 bg-white hover:bg-[#E5EEFF] border border-[#C3C5D9]/40 hover:border-[#003DCB]/20 text-[#003DCB] hover:text-[#003DCB] font-sans font-semibold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Expense</span>
          </button>

          <button
            onClick={() => navigate('create_pot')}
            className="flex items-center justify-center gap-2.5 p-4 bg-white hover:bg-[#E5EEFF] border border-[#C3C5D9]/40 hover:border-[#003DCB]/20 text-[#003DCB] hover:text-[#003DCB] font-sans font-semibold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            <FolderPlus className="h-5 w-5" />
            <span>Create Pot</span>
          </button>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="pb-8 text-left">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans font-bold text-lg text-[#0B1C30]">Recent Activity</h3>
          <button
            onClick={() => navigate('expenses')}
            className="text-[#003DCB] font-sans font-semibold text-sm hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {recentTx.map((tx) => {
            const isNegative = tx.amount < 0;
            return (
              <div
                key={tx.id}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[#C3C5D9]/30 hover:border-[#003DCB]/20 transition-colors shadow-sm text-left"
              >
                <div className="w-11 h-11 rounded-full bg-[#EFF4FF] flex items-center justify-center shrink-0">
                  {getCategoryIcon(tx.category)}
                </div>

                <div className="flex-grow">
                  <h4 className="font-sans font-semibold text-sm text-[#0B1C30] tracking-tight">{tx.title}</h4>
                  <p className="font-sans text-xs text-[#737688] mt-0.5">{tx.date}</p>
                </div>

                <p className={`font-sans font-bold text-sm tracking-tight ${isNegative ? 'text-[#BA1A1A]' : 'text-[#006C49]'}`}>
                  {isNegative ? '-' : '+'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Add Expense Interactive Slider Overlay/Popup */}
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
                <label className="font-sans font-semibold text-xs text-[#737688]" htmlFor="txTitle">
                  Merchant/Item Name
                </label>
                <input
                  id="txTitle"
                  type="text"
                  placeholder="e.g., Campus Cafeteria, Bookstore"
                  value={txTitle}
                  onChange={(e) => setTxTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F9FF] border border-[#C3C5D9]/60 rounded-lg text-sm font-sans focus:outline-none focus:border-[#003DCB] transition-colors"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-sans font-semibold text-xs text-[#737688]" htmlFor="txAmount">
                  Amount (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#737688]">$</span>
                  <input
                    id="txAmount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-[#F8F9FF] border border-[#C3C5D9]/60 rounded-lg text-sm font-sans focus:outline-none focus:border-[#003DCB] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-sans font-semibold text-xs text-[#737688]" htmlFor="txCategory">
                    Category
                  </label>
                  <select
                    id="txCategory"
                    value={txCategory}
                    onChange={(e) => setTxCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F9FF] border border-[#C3C5D9]/60 rounded-lg text-xs font-sans focus:outline-none focus:border-[#003DCB] transition-colors"
                  >
                    <option value="Dining">Dining</option>
                    <option value="Supplies">Supplies</option>
                    <option value="Housing">Housing</option>
                    <option value="Health">Health</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-sans font-semibold text-xs text-[#737688]" htmlFor="txMethod">
                    Payment Method
                  </label>
                  <select
                    id="txMethod"
                    value={txMethod}
                    onChange={(e) => setTxMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F9FF] border border-[#C3C5D9]/60 rounded-lg text-xs font-sans focus:outline-none focus:border-[#003DCB] transition-colors"
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
