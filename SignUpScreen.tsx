import React, { useState } from 'react';
import { User as UserIcon, Mail, Lock, Eye, EyeOff, Fingerprint, ArrowRight } from 'lucide-react';
import { Screen, User } from '../types';

interface SignUpScreenProps {
  navigate: (screen: Screen) => void;
  onSignUpSuccess: (user: User) => void;
}

export default function SignUpScreen({ navigate, onSignUpSuccess }: SignUpScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid university email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Sign up success, triggers onboarding screen!
    onSignUpSuccess({
      email,
      fullName,
      mode: 'wallet',
      onboarded: false, // Triggers Choose Your Mode screen (onboarding)!
      totalBalance: 5892.20,
    });
  };

  const handleDigiLocker = () => {
    // Mock DigiLocker signon
    onSignUpSuccess({
      email: 'alex_digi@university.edu',
      fullName: 'Alex Digilinker',
      mode: 'wallet',
      onboarded: false, // Go to onboarding
      totalBalance: 5892.20,
    });
  };

  return (
    <div className="w-full max-w-[480px] px-4 pt-20 pb-12 flex flex-col justify-center min-h-screen">
      {/* Back to Login link */}
      <div className="mb-6 select-none text-left">
        <h1 className="font-sans font-bold text-3xl tracking-tight text-[#0B1C30] mb-2">Create Account</h1>
        <p className="font-sans text-[#434656] text-base">Start your journey to financial freedom</p>
      </div>

      {/* Social / DigiLocker Signup component */}
      <div className="space-y-4 mb-6">
        <button
          onClick={handleDigiLocker}
          className="w-full py-3 px-4 bg-white hover:bg-[#F8F9FF] border border-[#C3C5D9] text-[#0B1C30] font-sans font-medium rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <Fingerprint className="text-[#003DCB] h-5 w-5" />
          <span>Continue with DigiLocker</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-grow h-[1px] bg-[#C3C5D9]"></div>
          <span className="font-sans font-semibold text-xs text-[#737688]/80 uppercase tracking-widest whitespace-nowrap">
            or sign up with email
          </span>
          <div className="flex-grow h-[1px] bg-[#C3C5D9]"></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C3C5D9]/30">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-[#FFDAD6] text-[#93000A] p-3 rounded-lg text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="font-sans font-semibold text-xs text-[#434656] tracking-wider uppercase px-1" htmlFor="fullName">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737688] h-5 w-5" />
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl font-sans text-sm text-[#0B1C30] placeholder-[#737688]/60 focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="font-sans font-semibold text-xs text-[#434656] tracking-wider uppercase px-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737688] h-5 w-5" />
              <input
                id="email"
                type="email"
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl font-sans text-sm text-[#0B1C30] placeholder-[#737688]/60 focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="font-sans font-semibold text-xs text-[#434656] tracking-wider uppercase px-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737688] h-5 w-5" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl font-sans text-sm text-[#0B1C30] placeholder-[#737688]/60 focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737688] hover:text-[#003DCB] p-2"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full bg-[#003DCB] text-white py-3.5 rounded-xl font-sans font-semibold shadow-lg shadow-[#003DCB]/20 hover:bg-[#003DCB]/90 active:scale-95 transition-all outline-none cursor-pointer mt-2"
          >
            Sign Up
          </button>
        </form>
      </div>

      {/* Login Redirection link */}
      <div className="mt-6 text-center select-none">
        <p className="font-sans text-sm text-[#434656]">
          Already have an account?{' '}
          <button
            onClick={() => navigate('login')}
            className="text-[#003DCB] font-bold hover:underline bg-transparent border-none outline-none"
          >
            Login
          </button>
        </p>
      </div>

      {/* Visual pulse line decorator */}
      <div className="mt-8 flex justify-center">
        <div className="w-24 h-1 bg-[#E5EEFF] rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-[#003DCB] rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Terms/Privacy Consent Notice */}
      <footer className="mt-auto py-6 text-center space-y-1.5 select-none text-[#737688] text-xs">
        <p className="font-sans font-semibold leading-relaxed">
          By signing up, you agree to our{' '}
          <button onClick={() => alert("FINSTAT Terms point.")} className="text-[#434656] font-bold hover:underline">Terms of Service</button> and{' '}
          <button onClick={() => alert("FINSTAT Privacy point.")} className="text-[#434656] font-bold hover:underline">Privacy Policy</button>.
        </p>
        <p className="font-sans text-[10px] opacity-60">
          © 2026 FINSTAT. Secure financial tracking for students.
        </p>
      </footer>
    </div>
  );
}
