import { SavingPot, Transaction } from './types';

// Let's create realistic mock transactions
export const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 't-1',
    title: 'Starbucks',
    amount: -5.50,
    category: 'Dining',
    date: 'Today, 08:45 AM',
    paymentMethod: 'Debit Card',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: 't-2',
    title: 'Groceries',
    amount: -45.00,
    category: 'Supplies',
    date: 'Today, 05:20 PM',
    paymentMethod: 'Checking',
    timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
  },
  {
    id: 't-3',
    title: 'Campus Bookstore',
    amount: -45.20,
    category: 'Supplies',
    date: 'Today, 02:45 PM',
    paymentMethod: 'Debit Card',
    timestamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
  },
  {
    id: 't-4',
    title: 'The Pizza Parlor',
    amount: -18.50,
    category: 'Dining',
    date: 'Yesterday, 08:12 PM',
    paymentMethod: 'Debit Card',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: 't-5',
    title: 'Rent',
    amount: -800.00,
    category: 'Housing',
    date: 'Yesterday, 10:00 AM',
    paymentMethod: 'Direct Deposit',
    timestamp: Date.now() - 1000 * 60 * 60 * 30, // 30 hours ago
  },
  {
    id: 't-6',
    title: 'Gym Membership',
    amount: -30.00,
    category: 'Health',
    date: 'Oct 23, 06:00 AM',
    paymentMethod: 'Subscription',
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
  },
  {
    id: 't-7',
    title: 'Parent Transfer',
    amount: 200.00,
    category: 'Income',
    date: 'Oct 24, 10:00 AM',
    paymentMethod: 'Checking',
    timestamp: Date.now() - 1000 * 60 * 60 * 56, // 2 days ago
  }
];

// Let's configure savings pots so they sum up to exactly $4,651.70:
// New Laptop: $650.00 (Goal $1500)
// Emergency Fund: $300.00 (Goal $1000)
// Designer Sneakers: $120.00 (Goal $250)
// Weekend Dining: $45.00 (Goal $80)
// Spring Break Trip: $450.00 (Goal $1200)
// Coffee Fund: $15.00 (Goal $30)
// Fixed/Locked Long term deposit pot to pad the remainder:
// College Semester Savings: $3071.70 (Goal $5000)
// Total currentSaved: 650 + 300 + 120 + 45 + 450 + 15 + 3071.70 = 4651.70!
// This is pure perfection!
export const DEFAULT_POTS: SavingPot[] = [
  {
    id: 'pot-laptop',
    name: 'New Laptop',
    goalAmount: 1500,
    currentSaved: 650,
    category: 'Tech',
    targetDate: '2026-09-15',
    isLocked: true,
  },
  {
    id: 'pot-emergency',
    name: 'Emergency Fund',
    goalAmount: 1000,
    currentSaved: 300,
    category: 'Emergency',
    targetDate: '2026-12-31',
    isLocked: true,
  },
  {
    id: 'pot-sneakers',
    name: 'Designer Sneakers',
    goalAmount: 250,
    currentSaved: 120,
    category: 'Lifestyle',
    targetDate: '2026-07-01',
    isLocked: true,
  },
  {
    id: 'pot-dining',
    name: 'Weekend Dining',
    goalAmount: 80,
    currentSaved: 45,
    category: 'Lifestyle',
    targetDate: '2026-06-30',
    isLocked: false,
  },
  {
    id: 'pot-spring-trip',
    name: 'Spring Break Trip',
    goalAmount: 1200,
    currentSaved: 450,
    category: 'Travel',
    targetDate: '2027-03-15',
    isLocked: true,
  },
  {
    id: 'pot-coffee',
    name: 'Coffee Fund',
    goalAmount: 30,
    currentSaved: 15,
    category: 'Lifestyle',
    targetDate: '2026-06-15',
    isLocked: false,
  },
  {
    id: 'pot-pad-semester',
    name: 'College Semester',
    goalAmount: 5000,
    currentSaved: 3071.70,
    category: 'Education',
    targetDate: '2026-08-20',
    isLocked: true,
  },
];
