import React from 'react';

const ProductShowcase = () => {
    return (
        <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden" id="product">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-40 dark:opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-transparent to-gray-50/20 dark:from-slate-950/40 dark:to-slate-950/40 pointer-events-none"></div>
                <div className="absolute inset-0">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000">
                        <defs>
                            <linearGradient id="route-grad" x1="0%" x2="100%" y1="0%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                            <filter id="shadow">
                                <feDropShadow dx="0" dy="2" floodOpacity="0.3" stdDeviation="3" />
                            </filter>
                        </defs>
                        <path className="map-route-path" d="M 200,450 Q 350,300 500,500 T 800,400" fill="none" stroke="url(#route-grad)" strokeLinecap="round" strokeWidth="4" />
                        <g transform="translate(200,450)">
                            <circle className="dark:fill-slate-800" fill="white" filter="url(#shadow)" r="16" />
                            <circle fill="#6366f1" r="8" />
                            <foreignObject height="40" width="150" x="-12" y="-50">
                                <div className="text-[10px] font-bold bg-white dark:bg-slate-900 px-2 py-1 rounded-md shadow-sm border border-gray-200 dark:border-slate-700 w-fit text-gray-700 dark:text-slate-300">
                                    09:00 AM — Breakfast at Tsukiji
                                </div>
                            </foreignObject>
                        </g>
                        <g transform="translate(500,500)">
                            <circle className="dark:fill-slate-800" fill="white" filter="url(#shadow)" r="16" />
                            <circle fill="#06b6d4" r="8" />
                            <foreignObject height="40" width="150" x="-12" y="-50">
                                <div className="text-[10px] font-bold bg-white dark:bg-slate-900 px-2 py-1 rounded-md shadow-sm border border-gray-200 dark:border-slate-700 w-fit text-gray-700 dark:text-slate-300">
                                    01:00 PM — Meiji Jingu Forest
                                </div>
                            </foreignObject>
                        </g>
                        <g transform="translate(800,400)">
                            <circle fill="url(#route-grad)" filter="url(#shadow)" r="20" />
                            <foreignObject height="16" width="16" x="-8" y="-8">
                                <span className="material-symbols-outlined text-white text-[16px]">restaurant</span>
                            </foreignObject>
                            <foreignObject height="40" width="150" x="-12" y="-50">
                                <div className="text-[10px] font-bold bg-white dark:bg-slate-900 px-2 py-1 rounded-md shadow-sm border border-gray-200 dark:border-slate-700 w-fit text-gray-700 dark:text-slate-300">
                                    Next: Neon Shinjuku Dinner
                                </div>
                            </foreignObject>
                        </g>
                    </svg>
                </div>
            </div>
            <div className="absolute bottom-10 right-10 z-20 w-80 max-h-[80%] bg-white/80 dark:bg-slate-900/80 glass-card rounded-[2.5rem] border border-white/20 dark:border-slate-700/30 shadow-2xl overflow-hidden flex flex-col">
                <div className="p-6 overflow-y-auto no-scrollbar">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 mb-2 font-mono text-[10px] uppercase tracking-widest">
                            <span className="material-symbols-outlined text-xs">map</span> Itinerary / Tokyo
                        </div>
                        <h3 className="text-xl font-bold tracking-tight mb-1">Day 1: Neon Shinjuku</h3>
                        <p className="text-gray-600 dark:text-slate-400 text-xs">Kickoff in the heart of the metropolis.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                                <div className="w-px h-8 bg-gray-300 dark:bg-slate-700 mt-2"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-xs">09:00 AM — Breakfast at Tsukiji</h4>
                                <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">Freshest sushi in the world.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                                <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-xs">01:00 PM — Meiji Jingu Forest</h4>
                                <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">A serene escape city chaos.</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/20">
                        <h5 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Estimated Costs</h5>
                        <div className="space-y-1.5 text-[10px]">
                            <div className="flex justify-between text-gray-500">
                                <p>Food & Drink</p>
                                <p className="font-mono">$45</p>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <p>Transport</p>
                                <p className="font-mono">$12</p>
                            </div>
                            <div className="flex justify-between font-bold text-indigo-600 dark:text-cyan-400 border-t border-gray-200 dark:border-slate-700 pt-1.5 mt-1.5">
                                <p>Daily Total</p>
                                <p className="font-mono">$77</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg">
                        Book Full Route
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
