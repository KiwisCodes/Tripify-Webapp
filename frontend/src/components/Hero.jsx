import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Hero = () => {
    const { ref: heroRef } = useScrollReveal({ threshold: 0.05 });

    return (
        <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
            {/* Static gradient glow — no animation to avoid paint */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 70%)'
            }} />
            <div className="absolute top-20 left-[15%] w-64 h-64 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-[15%] w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

            <div ref={heroRef} className="relative max-w-7xl mx-auto px-4 text-center">
                {/* Badge */}
                <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" style={{ animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}></span>
                    AI-Powered Trip Planner
                </div>

                <h1 className="animate-fade-in-up delay-100 text-5xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-slate-500 leading-tight">
                    Your next adventure,<br />curated by AI.
                </h1>
                <p className="animate-fade-in-up delay-200 text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">
                    Stop planning, start exploring. Tripify transforms your vague wanderlust into a detailed, ready-to-book itinerary in seconds.
                </p>

                {/* Search bar */}
                <div className="animate-fade-in-up delay-300 max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-2 rounded-3xl lg:rounded-full shadow-2xl flex flex-col lg:flex-row items-center gap-2">
                    <div className="flex-1 w-full px-6 py-3 text-left border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-slate-500 mb-1">Destination</label>
                        <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-600 outline-none" placeholder="Where to?" type="text" />
                    </div>
                    <div className="flex-1 w-full px-6 py-3 text-left border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-slate-500 mb-1">Length</label>
                        <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-600 outline-none" placeholder="How many days?" type="text" />
                    </div>
                    <div className="flex-1 w-full px-6 py-3 text-left">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-slate-500 mb-1">Budget</label>
                        <input className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-600 outline-none" placeholder="Approx budget?" type="text" />
                    </div>
                    <button className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-2xl lg:rounded-full linear-glow whitespace-nowrap hover:from-cyan-400 hover:to-indigo-500 active:scale-95"
                        style={{ transition: 'opacity 0.2s ease, transform 0.15s ease' }}>
                        Generate My Trip ✈️
                    </button>
                </div>

                <p className="animate-fade-in-up delay-400 mt-8 text-xs text-gray-400 dark:text-slate-600">
                    Trusted by <span className="font-bold text-indigo-500">100,000+</span> travelers worldwide
                </p>
            </div>
        </section>
    );
};

export default Hero;
