import React from 'react';

const Pricing = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-950" id="pricing">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, credit-based pricing</h2>
                    <p className="text-gray-500 dark:text-slate-400">One-time purchases. No recurring monthly fees.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[2.5rem] border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full transition-all hover:shadow-xl hover:-translate-y-1">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">Explorer Bundle</h3>
                            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">One-time Purchase</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-extrabold tracking-tight">$9</span>
                            <span className="text-gray-500 text-sm">/ 500 Credits</span>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-slate-400 flex-1 mb-10">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                Generate up to 5 complete trips
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                Standard AI Model access
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                Full Export to Notion
                            </li>
                        </ul>
                        <button className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 dark:border-slate-700 font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                            Buy 500 Credits
                        </button>
                    </div>
                    <div className="relative p-10 rounded-[2.5rem] border-2 border-transparent bg-gradient-to-b from-white to-white dark:from-slate-900 dark:to-slate-900 flex flex-col h-full shadow-2xl scale-105 before:absolute before:inset-[-2px] before:bg-gradient-to-b before:from-cyan-400 before:to-indigo-600 before:-z-10 before:rounded-[2.6rem]">
                        <div className="absolute -top-4 left-1/2 -track-x-1/2 px-6 py-1 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                            Best Value
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">Globetrotter Pack</h3>
                            <p className="text-xs font-bold text-indigo-500 dark:text-cyan-400 uppercase tracking-widest">One-time Purchase</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-extrabold tracking-tight">$49</span>
                            <span className="text-gray-500 text-sm">/ 5,000 Credits</span>
                        </div>
                        <ul className="space-y-4 text-sm text-gray-500 dark:text-slate-400 flex-1 mb-10">
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-indigo-500 text-lg">check_circle</span>
                                Generate up to 50 complete trips
                            </li>
                            <li className="flex items-center gap-3 text-gray-900 dark:text-white font-semibold">
                                <span className="material-symbols-outlined text-indigo-500 text-lg">check_circle</span>
                                Advanced Gemini-Pro Logic
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-indigo-500 text-lg">check_circle</span>
                                Offline Maps Access
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-indigo-500 text-lg">check_circle</span>
                                Priority 24/7 Generation
                            </li>
                        </ul>
                        <button className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 text-white font-extrabold hover:opacity-90 transition-all linear-glow shadow-xl">
                            Buy 5,000 Credits
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
