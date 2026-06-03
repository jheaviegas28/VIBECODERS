import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, User, Transaction, SavingPot } from './types';
import { DEFAULT_TRANSACTIONS, DEFAULT_POTS } from './mockData';

// Screens
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import ExpensesScreen from './components/ExpensesScreen';
import SavingsScreen from './components/SavingsScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import CreatePotScreen from './components/CreatePotScreen';
import PotSuccessScreen from './components/PotSuccessScreen';
import LockedWarningScreen from './components/LockedWarningScreen';
import SelectUnlockScreen from './components/SelectUnlockScreen';
import UnlockSuccessScreen from './components/UnlockSuccessScreen';
import InvestingGuideScreen from './components/InvestingGuideScreen';

// Core UI shell Layouts
import Header from './components/Header';
import BottomNavigation from './components/BottomNavigation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  
  // Persistent tracking lists (fallbacks to defaults)
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finstat_txs');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [savingPots, setSavingPots] = useState<SavingPot[]>(() => {
    const saved = localStorage.getItem('finstat_pots');
    return saved ? JSON.parse(saved) : DEFAULT_POTS;
  });

  // State handling for the interactive safety unlocking loop
  const [pendingTx, setPendingTx] = useState<Partial<Transaction> | null>(null);
  const [shortfall, setShortfall] = useState<number>(0);
  const [selectedUnlockPots, setSelectedUnlockPots] = useState<string[]>([]);
  const [createdPot, setCreatedPot] = useState<SavingPot | null>(null);

  // Sync state mutations to local storage for persistent review
  useEffect(() => {
    localStorage.setItem('finstat_txs', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finstat_pots', JSON.stringify(savingPots));
  }, [savingPots]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('finstat_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('finstat_user');
    }
  }, [user]);

  // Load existing session on initial mounting
  useEffect(() => {
    const savedUser = localStorage.getItem('finstat_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      setUser(parsedUser);
      // Fallback screen redirection
      if (parsedUser.onboarded) {
        setCurrentScreen('home');
      } else {
        setCurrentScreen('onboarding');
      }
    }
  }, []);

  const handleNavigate = (target: Screen) => {
    setCurrentScreen(target);
    // Smooth scroll page header context back to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
    localStorage.removeItem('finstat_user');
  };

  // Logic to calculate exact spendable balance
  const getSpendableBalance = (currentUser: User, pots: SavingPot[]) => {
    const lockedTotal = pots.reduce((sum, pot) => sum + (pot.isLocked ? pot.currentSaved : 0), 0);
    return currentUser.totalBalance - lockedTotal;
  };

  // Safe handler to append instant single transactions
  const handleAddTransaction = (newTx: Partial<Transaction>) => {
    if (!user) return;

    const amount = newTx.amount || 0;
    const isExpense = amount < 0;
    const absVal = Math.abs(amount);

    if (isExpense) {
      const currentSpendable = getSpendableBalance(user, savingPots);
      if (absVal > currentSpendable) {
        // Triggers the insufficient funds locked flows
        setPendingTx({
          ...newTx,
          id: 'tx-temp-' + Date.now(),
          date: 'Just Now',
          timestamp: Date.now()
        });
        setShortfall(absVal - currentSpendable);
        handleNavigate('locked_warning');
        return;
      }
    }

    // Success: Balance checks pass, commit transaction normally
    const committedTx: Transaction = {
      id: 'tx-' + Date.now(),
      title: newTx.title || 'Unknown Merchant',
      amount: amount,
      category: newTx.category || 'Lifestyle',
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethod: newTx.paymentMethod || 'Debit Card',
      timestamp: Date.now()
    };

    setTransactions([committedTx, ...transactions]);
    setUser({
      ...user,
      totalBalance: user.totalBalance + amount
    });
  };

  // Unlocking funds state transitions
  const handleUnlockCompleted = (shortfallAmount: number, chosenPotIds: string[]) => {
    if (!user) return;

    setSelectedUnlockPots(chosenPotIds);

    // Update pots by moving money out of holds proportionally or entirely from first selected pot
    const updatedPots = savingPots.map((pot) => {
      if (chosenPotIds.includes(pot.id)) {
        // Reduce the pot saved value by shortfall amount directly (mocking simple hold transfer!)
        const deduction = Math.min(pot.currentSaved, shortfallAmount);
        return {
          ...pot,
          currentSaved: pot.currentSaved - deduction
        };
      }
      return pot;
    });

    setSavingPots(updatedPots);
    handleNavigate('unlock_success');
  };

  // Closes the simulated transaction process loop
  const handleCompletePendingPurchase = () => {
    if (!user || !pendingTx) return;

    const finalTx: Transaction = {
      id: 'tx-' + Date.now(),
      title: pendingTx.title || 'Merchant Hold',
      amount: pendingTx.amount || 0,
      category: pendingTx.category || 'Lifestyle',
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      paymentMethod: pendingTx.paymentMethod || 'Debit Card',
      timestamp: Date.now()
    };

    // Update state variables safely
    setTransactions([finalTx, ...transactions]);
    setUser({
      ...user,
      totalBalance: user.totalBalance + (pendingTx.amount || 0)
    });

    setPendingTx(null);
    setSelectedUnlockPots([]);
    setShortfall(0);
    handleNavigate('home');
  };

  // User created high value savings goals pots
  const handleCreatePot = (newPot: SavingPot) => {
    if (!user) return;

    setSavingPots([newPot, ...savingPots]);
    setCreatedPot(newPot);

    // Initial deposit was moved into savings hold, deducts balance from overall total pool
    // Note: because the pot is locked, it automatically lowers spendable calculation as desired!
    handleNavigate('pot_success');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#0B1C30] font-sans antialiased flex flex-col">
      {/* Brand Header */}
      <Header
        currentScreen={currentScreen}
        navigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main responsive screen display viewport container */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-24 md:pb-12 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full flex justify-center h-fit"
          >
            {/* Screen switching options routing */}
            {currentScreen === 'login' && (
              <LoginScreen
                navigate={handleNavigate}
                onLoginSuccess={(signedUser) => {
                  setUser(signedUser);
                  if (signedUser.onboarded) {
                    handleNavigate('home');
                  } else {
                    handleNavigate('onboarding');
                  }
                }}
              />
            )}

            {currentScreen === 'signup' && (
              <SignUpScreen
                navigate={handleNavigate}
                onSignUpSuccess={(signedUser) => {
                  setUser(signedUser);
                  handleNavigate('onboarding');
                }}
              />
            )}

            {currentScreen === 'onboarding' && user && (
              <OnboardingScreen
                user={user}
                onOnboardComplete={(onboardedUser) => {
                  setUser(onboardedUser);
                  handleNavigate('home');
                }}
              />
            )}

            {currentScreen === 'home' && user && (
              <HomeScreen
                user={user}
                transactions={transactions}
                pots={savingPots}
                navigate={handleNavigate}
                onAddTransaction={handleAddTransaction}
              />
            )}

            {currentScreen === 'expenses' && user && (
              <ExpensesScreen
                user={user}
                transactions={transactions}
                pots={savingPots}
                navigate={handleNavigate}
                onAddTransaction={handleAddTransaction}
              />
            )}

            {currentScreen === 'savings' && (
              <SavingsScreen
                pots={savingPots}
                potsSum={savingPots.reduce((acc, current) => acc + current.currentSaved, 0)}
                navigate={handleNavigate}
              />
            )}

            {currentScreen === 'analytics' && (
              <AnalyticsScreen navigate={handleNavigate} />
            )}

            {currentScreen === 'create_pot' && (
              <CreatePotScreen
                navigate={handleNavigate}
                onCreatePot={handleCreatePot}
              />
            )}

            {currentScreen === 'pot_success' && (
              <PotSuccessScreen
                createdPot={createdPot}
                navigate={handleNavigate}
              />
            )}

            {currentScreen === 'locked_warning' && user && (
              <LockedWarningScreen
                pendingTx={pendingTx}
                spendableBalance={getSpendableBalance(user, savingPots)}
                navigate={handleNavigate}
                onCancel={() => {
                  setPendingTx(null);
                  handleNavigate('home');
                }}
              />
            )}

            {currentScreen === 'select_unlock' && user && (
              <SelectUnlockScreen
                pots={savingPots}
                pendingTx={pendingTx}
                spendableBalance={getSpendableBalance(user, savingPots)}
                navigate={handleNavigate}
                onUnlockCompleted={handleUnlockCompleted}
              />
            )}

            {currentScreen === 'unlock_success' && user && (
              <UnlockSuccessScreen
                pots={savingPots}
                pendingTx={pendingTx}
                spendableBalance={getSpendableBalance(user, savingPots)}
                shortfallAmount={shortfall}
                chosenPotIds={selectedUnlockPots}
                navigate={handleNavigate}
                onCompletePurchase={handleCompletePendingPurchase}
              />
            )}

            {currentScreen === 'investing_guide' && (
              <InvestingGuideScreen navigate={handleNavigate} />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Sticky Bottom navigation pivot */}
      <BottomNavigation
        currentScreen={currentScreen}
        navigate={handleNavigate}
      />
    </div>
  );
}
