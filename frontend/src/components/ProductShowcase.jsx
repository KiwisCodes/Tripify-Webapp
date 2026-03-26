import React, { useEffect, useRef } from 'react';

const ProductShowcase = () => {
    const cardRef = useRef(null);

    // Scroll reveal logic
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                el.classList.add('is-visible');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                observer.unobserve(el);
            }
        }, { threshold: 0.1 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="relative w-full overflow-hidden flex items-center bg-[#f8fafc] dark:bg-slate-900 py-32"
            id="product"
        >
            {/* ── Background Grids ── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* ── Visual Overlays ── */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)' }}
            />

            <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                
                {/* ── Left Side: Content ── */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        A Better Way to Plan
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]">
                        Every detail, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">perfectly organized.</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
                        Stop juggling tabs and spreadsheets. Our AI handles the logistics, generating comprehensive itineraries including route optimization, cost estimates, and local hidden gems.
                    </p>
                    
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl">
                            Try It Out
                        </button>
                        <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* ── Right Side: Itinerary Card ── */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <div
                        ref={cardRef}
                        className="w-full max-w-sm transition-all duration-1000 ease-out translate-y-12 opacity-0"
                    >
                        {/* Enhanced Float Animation with CSS */}
                        <style dangerouslySetInnerHTML={{ __html: `
                            @keyframes float-card {
                                0% { transform: translateY(0px); }
                                50% { transform: translateY(-15px); }
                                100% { transform: translateY(0px); }
                            }
                            .float-animation {
                                animation: float-card 6s ease-in-out infinite;
                            }
                        `}} />

                        <div className="float-animation bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 shadow-[0_30px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col">
                            <div className="p-8 md:p-10">
                                <div className="mb-8 relative">
                                    <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 mb-4 font-mono text-[11px] uppercase tracking-[0.2em] font-black">
                                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                                        Day 1: Tokyo
                                    </div>
                                    <h3 className="text-3xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Neon Shinjuku</h3>
                                    <div className="w-12 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"></div>
                                </div>

                                <div className="space-y-0 relative">
                                    {/* Vertical Timeline Path */}
                                    <div className="absolute left-[7px] top-6 bottom-12 w-[2px] bg-slate-100 dark:bg-slate-800 z-0"></div>
                                    
                                    {[
                                        { color: 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]', time: '09:00 AM', place: 'Tsukiji Market', note: 'Freshest sushi globally.' },
                                        { color: 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]', time: '01:00 PM', place: 'Meiji Jingu', note: 'Shinto forest shrine.' },
                                        { color: 'bg-gradient-to-b from-indigo-500 to-cyan-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]', time: '07:30 PM', place: 'Golden Gai', note: 'Vibrant local izakayas.' },
                                    ].map((stop, i) => (
                                        <div key={i} className="flex gap-6 relative z-10 mb-8">
                                            <div className="flex flex-col items-center pt-1.5">
                                                <div className={`w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 shrink-0 relative transition-transform hover:scale-125 cursor-pointer ${stop.color}`} title={stop.place} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm md:text-base text-slate-900 dark:text-white tracking-tight">{stop.time} — {stop.place}</h4>
                                                <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1.5">
                                                    {stop.note}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 group hover:border-indigo-500/30 transition-colors duration-500">
                                    <div className="flex items-center justify-between mb-4">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Daily Forecast</h5>
                                        <span className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300">
                                            <span className="material-symbols-outlined text-sm text-amber-400">wb_sunny</span> 22°C
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Food & Drink', cost: '$45' },
                                            { label: 'Transport', cost: '$12' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-[11px] md:text-xs">
                                                <span className="text-slate-500 dark:text-slate-400 font-medium">{item.label}</span>
                                                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{item.cost}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between font-black text-indigo-600 dark:text-cyan-400 border-t border-slate-200/50 dark:border-slate-700/50 pt-3.5 mt-2.5 text-sm md:text-base">
                                            <span>Budget</span><span className="font-mono">$77</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full mt-8 py-5 bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 text-white text-sm md:text-base font-black rounded-[1.25rem] shadow-[0_20px_40px_rgba(79,70,229,0.25)] hover:shadow-[0_25px_50px_rgba(79,70,229,0.35)] hover:-translate-y-1 active:scale-[0.97] transition-all duration-300">
                                    View Full Itinerary
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;