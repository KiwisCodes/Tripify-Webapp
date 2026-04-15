import React from 'react';
import { Search, Utensils, Landmark, Camera, Mountain } from 'lucide-react';

export default function HeroSearch() {
  return (
    <div className="flex flex-col justify-center w-full h-full space-y-8 pr-0 lg:pr-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-tight">
        What's on your mind?
      </h1>
      
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-slate-400 group-focus-within:text-primary-dark transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Typing:......" 
          className="w-full pl-14 pr-4 py-5 bg-white border-2 border-slate-100 rounded-2xl text-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-primary-light/20 focus:border-primary-light transition-all placeholder:text-slate-300 placeholder:font-light"
        />
        <button className="absolute inset-y-2 right-2 bg-primary-dark hover:bg-indigo-600 text-white px-6 rounded-xl font-medium shadow-md transition-colors">
          Search
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-light/30 transition-all group">
          <div className="w-12 h-12 bg-indigo-50 text-primary-dark rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Utensils className="w-6 h-6" />
          </div>
          <span className="font-semibold text-slate-800">Food</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-light/30 transition-all group">
          <div className="w-12 h-12 bg-indigo-50 text-primary-dark rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Landmark className="w-6 h-6" />
          </div>
          <span className="font-semibold text-slate-800">Culture</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-light/30 transition-all group">
          <div className="w-12 h-12 bg-indigo-50 text-primary-dark rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Camera className="w-6 h-6" />
          </div>
          <span className="font-semibold text-slate-800">Attraction</span>
        </button>
        <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-light/30 transition-all group">
          <div className="w-12 h-12 bg-indigo-50 text-primary-dark rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Mountain className="w-6 h-6" />
          </div>
          <span className="font-semibold text-slate-800">Outdoors</span>
        </button>
      </div>
    </div>
  );
}
