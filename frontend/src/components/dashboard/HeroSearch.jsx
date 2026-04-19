import React, { useState } from 'react';
import { Search, Utensils, Landmark, Camera, Mountain, MapPin, Calendar, Wallet, ArrowRight, PanelLeftClose } from 'lucide-react';

export default function HeroSearch() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCollapsed ? 'w-14' : 'w-[320px]'}`}>
      <div className="relative group">
        
        {/* Toggle Button - Centered Right */}
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-7 h-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg flex items-center justify-center shadow-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-90 pointer-events-auto opacity-0 group-hover:opacity-100"
          >
            <PanelLeftClose size={12} />
          </button>
        )}

        {/* Slender Elongated Card */}
        <div className={`bg-white/95 dark:bg-slate-900/80 border-2 border-white dark:border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
          isCollapsed 
          ? 'w-14 h-14 rounded-2xl opacity-100' 
          : 'w-full rounded-[2.5rem] p-6 opacity-100'
        }`}>
          
          {isCollapsed ? (
            <button 
              onClick={() => setIsCollapsed(false)}
              className="w-full h-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-transform active:scale-95 group/icon"
            >
              <Search size={22} strokeWidth={2.5} className="group-hover/icon:scale-110 transition-transform" />
            </button>
          ) : (
            <div className="animate-fade-in-up duration-300 flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8 px-1">
                 <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <Search size={18} />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none tracking-tight">AI Planner</h3>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">Orchestrator v2</p>
                 </div>
              </div>

              {/* Elongated Input Stack */}
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                    <MapPin size={10} className="text-indigo-500" />
                    Destination
                  </label>
                  <input 
                    type="text" 
                    placeholder="Where to?" 
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-3.5 px-5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                    <Calendar size={10} className="text-indigo-500" />
                    Trip Length
                  </label>
                  <input 
                    type="text" 
                    placeholder="Days count" 
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-3.5 px-5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                    <Wallet size={10} className="text-indigo-500" />
                    Budget
                  </label>
                  <input 
                    type="text" 
                    placeholder="Economy / Luxury" 
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-3.5 px-5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Main CTA */}
              <button className="w-full mt-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn">
                Generate Analysis
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Quick Categories */}
              <div className="grid grid-cols-4 gap-2 mt-8 border-t border-slate-100 dark:border-white/5 pt-6">
                {[
                  { icon: Utensils, label: 'Food', color: 'text-orange-500' },
                  { icon: Landmark, label: 'Art', color: 'text-indigo-500' },
                  { icon: Camera, label: 'View', color: 'text-cyan-500' },
                  { icon: Mountain, label: 'Trail', color: 'text-emerald-500' }
                ].map((cat, idx) => (
                  <button key={idx} className="flex flex-col items-center justify-center p-2.5 bg-slate-50 dark:bg-white/[0.03] rounded-xl transition-all hover:bg-white dark:hover:bg-white/10 group/cat">
                    <cat.icon size={16} className={`${cat.color} group-hover/cat:scale-110 transition-transform`} />
                    <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-1.5 tracking-tighter">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
