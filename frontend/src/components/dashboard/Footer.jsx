import React from 'react';
import { Send, Globe, Share2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 backdrop-blur-xl pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
              Tripify
            </span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
            Redefining exploration through intelligent, AI-curated travel experiences for the modern world.
          </p>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
               <Globe size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
               <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
               <MessageSquare size={18} />
            </button>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Platform</h3>
          <ul className="space-y-4">
            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 text-sm font-semibold transition-colors">Tour Finder</a></li>
            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 text-sm font-semibold transition-colors">City Guides</a></li>
            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 text-sm font-semibold transition-colors">AI Itinerary</a></li>
            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 text-sm font-semibold transition-colors">Journal</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Company</h3>
          <ul className="space-y-4">
            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 text-sm font-semibold transition-colors">About Us</a></li>
            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 text-sm font-semibold transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 text-sm font-semibold transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-cyan-400 text-sm font-semibold transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest">Inspirations</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Join 100k+ global explorers.</p>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="explorer@world.com" 
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner placeholder:text-slate-400"
            />
            <button className="absolute right-2 top-2 bottom-2 w-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
        <p>© {new Date().getFullYear()} TRIPIFY INTELLIGENCE · REDEFINING EXPLORATION</p>
        <p className="flex items-center gap-2">Designed with <span className="text-red-500 animate-pulse">❤</span> for the world</p>
      </div>
    </footer>
  );
}
