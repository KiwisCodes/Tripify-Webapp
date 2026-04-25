import React, { useState, useEffect } from 'react';
import { Coins, User, Bell, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ refreshTrigger }) {
  const { isDark, toggleTheme } = useTheme();
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        // In a real app, use the actual authenticated user ID
        const data = await tripService.getCredits(1); 
        setCredits(data);
      } catch (err) {
        console.error("Failed to fetch credits:", err);
      }
    };
    fetchCredits();
  }, [refreshTrigger]);

  return (
    <nav className="relative z-50 flex items-center justify-between py-6 px-4 md:px-8 max-w-7xl mx-auto transition-all duration-300">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white hidden sm:block">
          Tripify
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center space-x-1 bg-white/50 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10 backdrop-blur-md">
        <a href="#" className="px-5 py-2 text-sm font-bold text-slate-900 dark:text-white bg-white dark:bg-white/10 shadow-sm rounded-xl">Discover</a>
        <a href="#" className="px-5 py-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-xl">Itineraries</a>
        <a href="#" className="px-5 py-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-xl">Journal</a>
      </div>

      {/* Right actions */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 transition-all shadow-sm"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>

        <div className="flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-full px-4 py-2 border border-indigo-100 dark:border-indigo-500/20 group cursor-pointer transition-all hover:bg-indigo-100 dark:hover:bg-indigo-500/20 shadow-sm">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-indigo-400 dark:text-indigo-500 uppercase tracking-wider leading-none">Credits</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{credits}</span>
          </div>
          <Coins className="w-4 h-4 text-amber-500 flex-shrink-0" />
        </div>

        <button className="p-2.5 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 rounded-xl text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 transition-all shadow-sm hidden sm:block">
          <Bell className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-sm hover:scale-105 active:scale-95 transition-all group">
          <User className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
        </button>
      </div>
    </nav>
  );
}
