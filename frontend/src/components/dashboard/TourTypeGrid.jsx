import React from 'react';
import { Car, Train, Users, Briefcase } from 'lucide-react';

const types = [
  { title: 'Private Trip', desc: 'Curated for you', icon: Briefcase, gradient: "from-slate-800 to-slate-900" },
  { title: 'Self-Drive', desc: 'Own pace travel', icon: Car, gradient: "from-indigo-900 to-slate-900" },
  { title: 'Train Tours', desc: 'Scenic rail journeys', icon: Train, gradient: "from-purple-900 to-slate-900" },
  { title: 'Group Tour', desc: 'Shared adventures', icon: Users, gradient: "from-teal-900 to-slate-900" },
];

export default function TourTypeGrid() {
  return (
    <div className="py-8">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Tour Type</h2>
        <div className="flex-grow h-px bg-slate-200"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {types.map((type, idx) => {
          const Icon = type.icon;
          return (
            <div 
              key={idx} 
              className={`relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br ${type.gradient} shadow-sm group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative h-full flex flex-col items-center justify-center p-4 text-center z-10 transition-transform group-hover:-translate-y-1">
                <Icon className="w-8 h-8 text-white/90 mb-3" />
                <h3 className="font-bold text-white text-lg">{type.title}</h3>
                <p className="text-white/70 text-sm">{type.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
