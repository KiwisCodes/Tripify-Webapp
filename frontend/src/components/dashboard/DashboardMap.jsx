import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Maximize2, Plus, Minus } from 'lucide-react';
import MapHoverCard from './MapHoverCard';

// Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const customIcon = new L.divIcon({
  className: 'bg-transparent',
  html: `<div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Source of truth for dynamic markers
const currentDestinations = [
  {
    id: 1,
    name: "Eiffel Tower",
    pos: [48.8584, 2.2945],
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800&auto=format&fit=crop",
    category: "Landmark",
    rating: "4.9",
    description: "Iconic iron lattice tower on the Champ de Mars, a global cultural icon of France."
  },
  {
    id: 2,
    name: "Louvre Museum",
    pos: [48.8606, 2.3376],
    image: "https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?q=80&w=800&auto=format&fit=crop",
    category: "Museum",
    rating: "4.8",
    description: "The world's largest art museum and a historic monument in Paris."
  }
];

export default function DashboardMap() {
  const mapCenter = [48.8566, 2.3522]; // Paris default

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-white/10 group">
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        zoomControl={false}
        className="w-full h-full z-0 grayscale-[0.2] contrast-[1.1]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {currentDestinations.map((dest) => (
          <Marker key={dest.id} position={dest.pos} icon={customIcon}>
            <Tooltip 
              direction="auto" 
              offset={[0, -10]} 
              opacity={1} 
              className="custom-leaflet-tooltip"
              sticky={false}
            >
              <MapHoverCard 
                name={dest.name}
                image={dest.image}
                description={dest.description}
                rating={dest.rating}
                category={dest.category}
              />
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Tools */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-3">
        <div className="flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 dark:border-white/10 overflow-hidden">
          <button className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border-b border-slate-100 dark:border-white/5">
            <Plus size={18} />
          </button>
          <button className="p-3 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <Minus size={18} />
          </button>
        </div>
        <button className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:scale-105 transition-transform active:scale-95">
          <Maximize2 size={18} />
        </button>
      </div>

      {/* Hover-to-Expand Status Badge - Moved Deeper to Corner */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="group/badge relative flex items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-1.5 rounded-full shadow-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:pr-4 w-9 hover:w-[210px] overflow-hidden">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
          </div>
          <span className="ml-2.5 text-[11px] font-bold text-slate-800 dark:text-white tracking-wide whitespace-nowrap opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300">
            Interactive Explorer Active
          </span>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] rounded-[3rem]"></div>
    </div>
  );
}
