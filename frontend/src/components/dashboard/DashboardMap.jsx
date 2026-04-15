import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons not showing up due to webpack/vite module paths
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Map Pin using divIcon
const customIcon = new L.divIcon({
  className: 'bg-transparent',
  html: `<div class="w-8 h-8 rounded-full bg-primary-dark text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function DashboardMap() {
  const mapCenter = [48.8566, 2.3522]; // Paris default

  return (
    <div className="relative w-full h-[400px] lg:h-full min-h-[500px] rounded-3xl overflow-hidden shadow-sm border border-slate-200">
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        zoomControl={false}
        className="w-full h-full z-0"
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

      {/* Floating Badge */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-800">Interactive Explorer</span>
        </div>
      </div>
    </div>
  );
}
