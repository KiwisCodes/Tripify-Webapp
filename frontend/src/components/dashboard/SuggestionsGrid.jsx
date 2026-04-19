import React from 'react';

const suggestions = [
  {
    city: 'Paris',
    desc: 'The city of light awaits your discovery.',
    imgUrl: 'https://images.unsplash.com/photo-1502602881226-2299000be0dc?w=800&auto=format&fit=crop&q=80',
  },
  {
    city: 'Rome',
    desc: 'Eternal wonders and world-class pasta.',
    imgUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&auto=format&fit=crop&q=80',
  },
  {
    city: 'Tokyo',
    desc: 'Where ancient tradition meets the future.',
    imgUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop&q=80',
  }
];

export default function SuggestionsGrid() {
  return (
    <div className="py-8">
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase">Tour Suggestion</h2>
        <div className="flex-grow h-px bg-slate-200"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((item, idx) => (
          <div 
            key={idx} 
            className="group relative rounded-3xl overflow-hidden h-72 shadow-sm cursor-pointer"
          >
            <img 
              src={item.imgUrl} 
              alt={item.city} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 z-10 transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-white mb-1">{item.city}</h3>
              <p className="text-slate-300 text-sm font-medium leading-snug">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
