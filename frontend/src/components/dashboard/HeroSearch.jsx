import React from 'react';
import { Search, Utensils, Landmark, Camera, Mountain, MapPin, Calendar, Wallet } from 'lucide-react';
import Reveal from '../ui/Reveal';

export default function HeroSearch() {
  return (
    <div className="flex flex-col justify-center w-full h-full space-y-10">
      <Reveal animation="reveal" className="space-y-6">
        {/* Search Input Container */}
        <div className="bg-white dark:bg-white/[0.03] border-2 border-white dark:border-white/5 p-6 rounded-[2.5rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
          
          <div className="grid grid-cols-1 gap-6">
            {/* Destination */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                <MapPin size={12} className="text-indigo-500" />
                Destination
              </label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-4 px-5 text-base font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {/* Duration */}
               <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                  <Calendar size={12} className="text-indigo-500" />
                  Length
                </label>
                <input 
                  type="text" 
                  placeholder="How many days?" 
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-4 px-5 text-base font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
              {/* Budget */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                  <Wallet size={12} className="text-indigo-500" />
                  Budget
                </label>
                <input 
                  type="text" 
                  placeholder="E.g. Luxury" 
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-4 px-5 text-base font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          <button className="w-full mt-8 py-4.5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-[1.25rem] font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group">
            Generate My Journey
            <Search size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Utensils, label: 'Food', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
            { icon: Landmark, label: 'Culture', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
            { icon: Camera, label: 'View', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-500/10' },
            { icon: Mountain, label: 'Outdoors', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' }
          ].map((cat, idx) => (
            <button key={idx} className="flex flex-col items-center justify-center p-4 bg-white/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl transition-all hover:bg-white dark:hover:bg-white/[0.08] hover:shadow-md group">
              <div className={`w-10 h-10 ${cat.bg} ${cat.color} rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110`}>
                <cat.icon size={18} />
              </div>
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">{cat.label}</span>
            </button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
