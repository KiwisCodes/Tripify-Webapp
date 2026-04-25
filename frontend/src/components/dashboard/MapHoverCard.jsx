import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

export default function MapHoverCard({ name, image, description, rating, category }) {
  return (
    <div className="w-[280px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 dark:border-white/10 animate-fade-in-up">
      {/* Image Header */}
      <div className="relative h-32 w-full overflow-hidden">
        <img 
          src={image || "https://images.unsplash.com/photo-1502602881226-2299000be0dc?w=400&q=80"} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
          <div className="bg-indigo-600 px-2 py-0.5 rounded-full">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">{category || 'Destination'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{name}</h3>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg">
            <Star size={12} className="text-amber-500 fill-amber-500" />
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">{rating || '4.8'}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {description || "Explore this iconic landmark and experience the heart of the city's rich history and culture."}
        </p>

        <div className="pt-2 flex items-center gap-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
            <Clock size={14} />
            <span className="text-[10px] font-bold">Open Now</span>
          </div>
          <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
            <MapPin size={14} />
            <span className="text-[10px] font-bold underline">Directions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
