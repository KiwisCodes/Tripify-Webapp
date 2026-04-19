import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Maximize2, Map as MapIcon } from 'lucide-react';

// Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const customIcon = new L.divIcon({
  className: 'bg-transparent',
  html: `<div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

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
        <Marker position={[48.8584, 2.2945]} icon={customIcon}>
          <Popup>Eiffel Tower</Popup>
        </Marker>
        <Marker position={[48.8606, 2.3376]} icon={customIcon}>
          <Popup>Louvre Museum</Popup>
        </Marker>
        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Floating Controls */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
        <button className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 dark:border-white/10 text-slate-700 dark:text-white hover:scale-105 transition-transform active:scale-95">
          <Maximize2 size={20} />
        </button>
        <button className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 dark:border-white/10 text-slate-700 dark:text-white hover:scale-105 transition-transform active:scale-95">
          <MapIcon size={20} />
        </button>
      </div>

      {/* Status Badge */}
      <div className="absolute bottom-8 left-8 z-10 pointer-events-none">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10 flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          <span className="text-[13px] font-bold text-slate-800 dark:text-white tracking-wide">Interactive Explorer Active</span>
        </div>
      </div>
      
      {/* Overlay vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] rounded-[3rem]"></div>
    </div>
  );
}
