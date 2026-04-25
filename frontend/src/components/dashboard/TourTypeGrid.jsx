import React from 'react';
import { Car, Train, Users, Briefcase, ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';

const types = [
  { title: 'Private Trip', desc: 'Curated for you', icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
  { title: 'Self-Drive', desc: 'Own pace travel', icon: Car, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-500/10" },
  { title: 'Train Tours', desc: 'Scenic rail journeys', icon: Train, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-500/10" },
  { title: 'Group Tour', desc: 'Shared adventures', icon: Users, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
];

export default function TourTypeGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {types.map((type, idx) => {
        const Icon = type.icon;
        return (
          <Reveal key={idx} animation="reveal" delay={idx * 0.1}>
            <div className="group relative bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 transition-all hover:bg-white dark:hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-2 cursor-pointer overflow-hidden">
              {/* Decorative Circle */}
              <div className={`absolute -top-12 -right-12 w-32 h-32 ${type.bg} rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 ${type.bg} ${type.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xl mb-1">{type.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-4">{type.desc}</p>
                
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Now
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
