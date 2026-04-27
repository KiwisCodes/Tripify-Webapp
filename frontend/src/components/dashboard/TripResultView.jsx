import React from 'react';
import { Calendar, MapPin, Wallet, Clock, Map as MapIcon, ChevronRight, Sparkles, TrendingUp, Info } from 'lucide-react';
import Reveal from '../ui/Reveal';
import TripMap from './TripMap';

export default function TripResultView({ tripData }) {
    if (!tripData) return null;

    const { 
        destinationCity, 
        budgetBracket, 
        dayItineraries, 
        estimateCosts 
    } = tripData;

    // Safely extract costs with defaults to prevent null-reference errors
    const {
        estimateHotelPerNight = 0,
        estimateFoodPerDay = 0,
        estimateActivityPerDay = 0,
        estimateTransportPerDay = 0,
        totalEstimatedCost = 0,
        currency = '$',
        budgetNotes = 'No specific budget notes.'
    } = estimateCosts || {};

    return (
        <div className="space-y-12">
            {/* Header / Summary Card */}
            <Reveal animation="reveal-scale" className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-2xl shadow-indigo-500/5 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Sparkles size={12} />
                            Generated Itinerary
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                            {destinationCity}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-400 mt-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                                <Calendar size={16} className="text-indigo-500" />
                                {dayItineraries.length} Days
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 uppercase tracking-wider">
                                <Wallet size={16} className="text-indigo-500" />
                                {budgetBracket} Budget
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 dark:bg-white p-8 rounded-[2rem] text-center min-w-[200px] shadow-xl hover:scale-105 transition-transform duration-500">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">Total Estimate</p>
                        <p className="text-4xl font-black text-white dark:text-slate-950">
                            {currency}{totalEstimatedCost}
                        </p>
                    </div>
                </div>
            </Reveal>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left: Detailed Itinerary & Map */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Interactive Trip Map */}
                    <Reveal animation="reveal" className="w-full">
                        <TripMap dayItineraries={dayItineraries} destinationCity={destinationCity} />
                    </Reveal>

                    {dayItineraries.map(({ dayNumber, dayTheme, items }, dayIdx) => (
                        <Reveal 
                            key={dayNumber} 
                            animation="reveal" 
                            delay={dayIdx * 0.1}
                            className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden"
                        >
                            <div className="p-6 md:p-8 bg-slate-50/50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-600/20">
                                        {dayNumber}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Day {dayNumber}</h3>
                                        <p className="text-xs font-bold text-indigo-500 dark:text-cyan-400 uppercase tracking-widest mt-1">{dayTheme}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-10 space-y-0 relative">
                                {/* Vertical Timeline Path */}
                                <div className="absolute left-[31px] md:left-[47px] top-10 bottom-10 w-[2px] bg-slate-100 dark:bg-slate-800 z-0" />

                                {items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="flex gap-6 md:gap-10 relative z-10 mb-10 last:mb-0 group">
                                        <div className="flex flex-col items-center pt-2">
                                            <div className="w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-500 shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform duration-300" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1.5">
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                                    <Clock size={12} />
                                                    {item.time}
                                                </div>
                                                <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                                                    {item.placeType}
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                                                {item.placeName}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Right: Cost Breakdown & AI Tips */}
                <div className="space-y-8 sticky top-24">
                    <Reveal animation="reveal-right" className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <TrendingUp size={20} />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Cost Breakdown</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'Hotels / Night', value: estimateHotelPerNight, icon: MapIcon },
                                { label: 'Food / Day', value: estimateFoodPerDay, icon: MapIcon },
                                { label: 'Activities', value: estimateActivityPerDay, icon: Sparkles },
                                { label: 'Transport', value: estimateTransportPerDay, icon: MapPin }
                            ].map((cost, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{cost.label}</span>
                                    <span className="font-mono font-black text-slate-900 dark:text-white">{currency}{cost.value}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal animation="reveal-right" delay={0.1} className="bg-indigo-600 dark:bg-indigo-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                                <Info size={20} />
                            </div>
                            <h3 className="font-bold">AI Budget Expert</h3>
                        </div>
                        <p className="text-sm leading-relaxed font-medium opacity-90 italic">
                            "{budgetNotes}"
                        </p>
                    </Reveal>
                </div>

            </div>
        </div>
    );
}
