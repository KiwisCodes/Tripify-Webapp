import React from 'react';
import { Coins, Bookmark, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link to="/" className="text-2xl font-bold text-primary-dark tracking-tight">
          Tripify
        </Link>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex space-x-8">
        <a href="#" className="text-slate-900 font-semibold relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary-dark">Discover</a>
        <a href="#" className="text-slate-500 hover:text-slate-900 font-medium transition-colors">Itineraries</a>
        <a href="#" className="text-slate-500 hover:text-slate-900 font-medium transition-colors">Journal</a>
      </div>

      {/* Right actions */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-slate-100/80 rounded-full px-4 py-1.5 shadow-sm border border-slate-200/50">
          <span className="text-slate-700 font-medium text-sm">Credits: 0</span>
          <Coins className="w-4 h-4 text-amber-500 flex-shrink-0" />
        </div>
        <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
        <button className="w-9 h-9 bg-primary-dark text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
