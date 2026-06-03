import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Fingerprint, LogIn, ArrowRight } from 'lucide-react';
import { Screen, User } from '../types';

interface LoginScreenProps {
  navigate: (screen: Screen) => void;
  onLoginSuccess: (user: User) => void;
}

export default function LoginScreen({ navigate, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('student@university.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid university email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Success login mock
    const fullName = email.split('@')[0]
      .split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'John Student';

    onLoginSuccess({
      email,
      fullName,
      mode: 'wallet',
      onboarded: true,
      totalBalance: 5892.20,
    });
  };

  const handleBiometricLogin = () => {
    // Simulated biometrics login
    onLoginSuccess({
      email: 'student@university.edu',
      fullName: 'Alex University',
      mode: 'wallet',
      onboarded: true,
      totalBalance: 5892.20,
    });
  };

  return (
    <div className="w-full max-w-[480px] px-4 pt-20 pb-12 flex flex-col justify-center min-h-screen">
      {/* Welcome Heading */}
      <div className="mb-8 select-none text-left">
        <h2 className="font-sans font-bold text-3xl tracking-tight text-[#0B1C30] mb-2">Welcome Back</h2>
        <p className="font-sans text-base text-[#434656]">Manage your student finances with ease</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C3C5D9]/30">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-[#FFDAD6] text-[#93000A] p-3 rounded-lg text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5 text-left">
            <label className="font-sans font-semibold text-xs text-[#434656] tracking-wider uppercase px-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-[#737688] h-5 w-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full h-12 pl-10 pr-4 bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl font-sans text-sm text-[#0B1C30] placeholder-[#737688]/60 focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <label className="font-sans font-semibold text-xs text-[#434656] tracking-wider uppercase px-1" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-[#737688] h-5 w-5" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-10 pr-12 bg-[#F8F9FF] border border-[#C3C5D9] rounded-xl font-sans text-sm text-[#0B1C30] placeholder-[#737688]/60 focus:border-[#003DCB] focus:ring-2 focus:ring-[#003DCB]/10 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#737688] hover:text-[#003DCB] p-2 transition-colors flex items-center"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => alert("Password reset link has been dispatched to your email address!")}
                className="font-sans font-semibold text-xs text-[#003DCB] hover:opacity-80 transition-opacity mt-1 bg-transparent border-none outline-none"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12 bg-[#003DCB] text-white font-sans font-semibold rounded-xl hover:bg-[#003DCB]/90 transition-all active:scale-[0.98] duration-150 flex items-center justify-center gap-2 mt-4 cursor-pointer shadow-md shadow-[#003DCB]/10"
          >
            <span>Login</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="relative my-6 flex items-center">
          <div className="flex-grow border-t border-[#C3C5D9]/40"></div>
          <span className="flex-shrink mx-4 font-sans font-semibold text-xs text-[#737688]">OR</span>
          <div className="flex-grow border-t border-[#C3C5D9]/40"></div>
        </div>

        {/* Biometric Mock Signin */}
        <button
          onClick={handleBiometricLogin}
          className="w-full h-12 border border-[#C3C5D9] rounded-xl font-sans text-sm text-[#0B1C30] font-medium flex items-center justify-center gap-3 hover:bg-[#F8F9FF] transition-colors active:scale-[0.98]"
        >
          <Fingerprint className="text-[#003DCB] h-6 w-6" />
          <span>Sign in with Biometrics</span>
        </button>
      </div>

      {/* Atmospheric Image Card */}
      <div className="mt-6 rounded-2xl overflow-hidden relative aspect-[16/10] shadow-sm group">
        <img
          alt="Atmospheric finance phone screen"
          className="w-full h-full object-cover transition-transform duration-700 select-none pointer-events-none group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmAvjNanTtrJXYFlfX0f6XSn8inrcF9ed8tjSjTY3sp5ucWLaFH_YI-kfooJkp44Uw-T_9i3Gg2NqB5tXxha7QNbVg0uu3jRJMMTXlDBjvfOYgHcnYnZt43MGZah9vk4U7KNbDAzjxX4opqc1aFiQmNjU1GprNR0I74QvFsvAu-d6CTbbtszvfpVJmiQdlHeM1nQ8bcIC3aMjZXBg8_xW3ucnJ_IctKDikzy0gerJiW4chfX5SZvxWq4gt9bIrzof-c3xgdfBkMaog"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003DCB]/70 via-[#003DCB]/20 to-transparent flex items-end p-4 text-left">
          <p className="text-white font-sans text-sm font-medium opacity-95">
            Secure student financial tracking at your fingertips.
          </p>
        </div>
      </div>

      {/* Account Signup Redirection Footer */}
      <div className="mt-8 text-center bg-transparent">
        <p className="font-sans text-sm text-[#434656]">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('signup')}
            className="text-[#003DCB] font-bold ml-1 hover:underline bg-transparent border-none outline-none"
          >
            Sign Up
          </button>
        </p>

        <div className="flex gap-6 justify-center mt-6 text-[#737688]/60 text-xs">
          <button onClick={() => alert("FINSTAT Privacy Policy document.")} className="hover:underline">Privacy Policy</button>
          <button onClick={() => alert("FINSTAT Terms & Conditions document.")} className="hover:underline">Terms of Service</button>
        </div>
      </div>
    </div>
  );
}
