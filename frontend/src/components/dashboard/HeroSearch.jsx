import React, { useState } from 'react';
import { Search, Utensils, Landmark, Camera, Mountain, MapPin, Calendar, Wallet, ArrowRight, PanelLeftClose, Loader2 } from 'lucide-react';

export default function HeroSearch({ onGenerate, isLoading }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    destinationCity: '',
    tripDuration: 3,
    budgetBracket: 'MEDIUM'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.destinationCity) return;
    onGenerate({
      ...formData,
      tripDuration: parseInt(formData.tripDuration)
    });
  };

  return (
    // We use relative positioning so the container respects the flow and layout of the parent
    <div className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isCollapsed ? 'w-14' : 'w-[320px]'}`}>
      <div className="relative group pointer-events-auto h-full">
        
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
          : 'w-full max-h-full rounded-[2.5rem] p-6 opacity-100 flex flex-col'
        }`}>
          
          {isCollapsed ? (
            <button 
              onClick={() => setIsCollapsed(false)}
              className="w-full h-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-transform active:scale-95 group/icon"
            >
              <Search size={22} strokeWidth={2.5} className="group-hover/icon:scale-110 transition-transform" />
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="animate-fade-in-up duration-300 flex flex-col min-h-0">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8 px-1 flex-shrink-0">
                 <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-none tracking-tight">AI Planner</h3>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1.5">Orchestrator v2</p>
                 </div>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
                {/* Elongated Input Stack */}
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                      <MapPin size={10} className="text-indigo-500" />
                      Destination
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.destinationCity}
                      onChange={(e) => setFormData({...formData, destinationCity: e.target.value})}
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
                      type="number" 
                      min="1"
                      max="14"
                      value={formData.tripDuration}
                      onChange={(e) => setFormData({...formData, tripDuration: e.target.value})}
                      placeholder="Days count"
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-3.5 px-5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">
                      <Wallet size={10} className="text-indigo-500" />
                      Budget
                    </label>
                    <select 
                      value={formData.budgetBracket}
                      onChange={(e) => setFormData({...formData, budgetBracket: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl py-3.5 px-5 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
                    >
                      <option value="LOW">Economy</option>
                      <option value="MEDIUM">Comfort</option>
                      <option value="HIGH">Luxury</option>
                    </select>
                  </div>
                </div>

                {/* Main CTA */}
                <button 
                  type="submit"
                  disabled={isLoading || !formData.destinationCity}
                  className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Curating...
                    </>
                  ) : (
                    <>
                      Generate Analysis
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Quick Categories */}
                <div className="grid grid-cols-4 gap-2 border-t border-slate-100 dark:border-white/5 pt-6">
                  {[
                    { icon: Utensils, label: 'Food', color: 'text-orange-500' },
                    { icon: Landmark, label: 'Art', color: 'text-indigo-500' },
                    { icon: Camera, label: 'View', color: 'text-cyan-500' },
                    { icon: Mountain, label: 'Trail', color: 'text-emerald-500' }
                  ].map((cat, idx) => (
                    <button 
                      key={idx} 
                      type="button"
                      onClick={() => setFormData({...formData, destinationCity: cat.label + " tour"})}
                      className="flex flex-col items-center justify-center p-2.5 bg-slate-50 dark:bg-white/[0.03] rounded-xl transition-all hover:bg-white dark:hover:bg-white/10 group/cat"
                    >
                      <cat.icon size={16} className={`${cat.color} group-hover/cat:scale-110 transition-transform`} />
                      <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-1.5 tracking-tighter">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
