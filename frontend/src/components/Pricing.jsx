import React from 'react';
import Reveal from './ui/Reveal';

const Pricing = () => {
    return (
        <section className="py-24 bg-white dark:bg-slate-950" id="pricing">
            <div className="max-w-5xl mx-auto px-4">
                <Reveal animation="reveal" className="text-center mb-16">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-cyan-400 mb-3">Pricing</p>
                    <h2 className="text-3xl font-bold tracking-tight mb-4 text-black dark:text-white">Simple, credit-based pricing</h2>
                    <p className="text-black dark:text-slate-400">One-time purchases. No recurring monthly fees.</p>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Explorer Bundle */}
                    <Reveal animation="reveal" delay={0.1} className="p-10 rounded-[2.5rem] border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Explorer Bundle</h3>
                            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest">One-time Purchase</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-extrabold tracking-tight text-black dark:text-white">$9</span>
                            <span className="text-black dark:text-slate-400 text-sm">/ 500 Credits</span>
                        </div>
                        <ul className="space-y-4 text-sm text-black dark:text-slate-400 flex-1 mb-10">
                            {['Generate up to 5 complete trips', 'Standard AI Model access', 'Full Export to Notion'].map((f) => (
                                <li key={f} className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-4 px-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 font-bold text-black dark:text-white hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Buy 500 Credits
                        </button>
                    </Reveal>

                    {/* Globetrotter Pack */}
                    <Reveal animation="reveal" delay={0.2} className="relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 flex flex-col h-full shadow-2xl scale-[1.03] hover:-translate-y-1.5 before:absolute before:inset-[-2px] before:bg-gradient-to-b before:from-cyan-400 before:to-indigo-600 before:-z-10 before:rounded-[2.6rem] transition-all duration-300">
                        <div className="absolute -top-4 left-1/2 px-6 py-1 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg"
                            style={{ transform: 'translateX(-50%)' }}>
                            Best Value
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Globetrotter Pack</h3>
                            <p className="text-xs font-bold text-indigo-500 dark:text-cyan-400 uppercase tracking-widest">One-time Purchase</p>
                        </div>
                        <div className="flex items-baseline gap-1 mb-8">
                            <span className="text-5xl font-extrabold tracking-tight text-black dark:text-white">$49</span>
                            <span className="text-black dark:text-slate-400 text-sm">/ 5,000 Credits</span>
                        </div>
                        <ul className="space-y-4 text-sm text-black dark:text-slate-400 flex-1 mb-10">
                            {[
                                { text: 'Generate up to 50 complete trips', bold: false },
                                { text: 'Advanced Gemini-Pro Logic', bold: true },
                                { text: 'Offline Maps Access', bold: false },
                                { text: 'Priority 24/7 Generation', bold: false },
                            ].map(({ text, bold }) => (
                                <li key={text} className={`flex items-center gap-3 ${bold ? 'text-black dark:text-white font-semibold' : ''}`}>
                                    <span className="material-symbols-outlined text-indigo-500 text-lg">check_circle</span>
                                    {text}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-700 text-white font-extrabold shadow-xl linear-glow hover:opacity-90 active:scale-95 transition-all">
                            Buy 5,000 Credits
                        </button>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
