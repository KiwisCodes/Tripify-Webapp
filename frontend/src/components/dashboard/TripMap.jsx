import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Loader2, MapPin, Navigation } from 'lucide-react';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// MapRefocus component to handle bounds when items change
function MapRefocus({ items }) {
  const map = useMap();
  useEffect(() => {
    const validItems = items.filter(i => i.latitude != null && i.longitude != null);
    if (validItems.length > 0) {
      const bounds = L.latLngBounds(validItems.map(i => [i.latitude, i.longitude]));
      map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 15, duration: 1.5 });
    }
  }, [items, map]);
  return null;
}


export default function TripMap({ dayItineraries = [], destinationCity = '' }) {
  const [selectedDay, setSelectedDay] = useState(dayItineraries[0]?.dayNumber || 1);
  const [routeGeometry, setRouteGeometry] = useState([]);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  
  // Find current day's items
  const currentDayData = dayItineraries.find(d => d.dayNumber === selectedDay);
  const currentItems = currentDayData?.items || [];

  const DAY_COLORS = {
    1: '#ff6b6b',
    2: '#4ecdc4',
    3: '#ffd93d',
    4: '#a78bfa',
    5: '#6bcb77',
  };

  const routeColor = DAY_COLORS[selectedDay] || '#ff6b6b';
  
  // Fetch route when currentItems changes
  useEffect(() => {
    const fetchRoute = async () => {
      const validItems = currentItems.filter(i => i.latitude != null && i.longitude != null);
      
      // If 1 or 0 items, no route needed
      if (validItems.length <= 1) {
        setRouteGeometry([]);
        return;
      }

      setIsRouteLoading(true);
      
      try {
        // Build coordinate string: lon,lat;lon,lat...
        const coords = validItems.map(i => `${i.longitude},${i.latitude}`).join(';');
        const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
        
        const response = await fetch(osrmUrl);
        const data = await response.json();
        
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          // OSRM returns [longitude, latitude], Leaflet needs [latitude, longitude]
          const mappedCoords = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setRouteGeometry(mappedCoords);
        } else {
          // Fallback to straight line
          setRouteGeometry(validItems.map(i => [i.latitude, i.longitude]));
        }
      } catch (error) {
        console.error("OSRM fetch failed, falling back to straight lines:", error);
        // Fallback to straight line
        setRouteGeometry(validItems.map(i => [i.latitude, i.longitude]));
      } finally {
        setIsRouteLoading(false);
      }
    };
    
    fetchRoute();
  }, [currentItems]);



  // Create custom numbered icon
  const createNumberedIcon = (number, color) => {
    return new L.divIcon({
      className: 'bg-transparent',
      html: `
        <div class="flex items-center justify-center hover:scale-110 transition-transform" 
             style="background: ${color}; color: white; border-radius: 50%; width: 34px; height: 34px; font-weight: 700; font-size: 14px; border: 3px solid white; box-shadow: 0 0 0 3px ${color}40, 0 4px 12px rgba(0,0,0,0.5);">
            ${number}
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -17]
    });
  };

  const defaultCenter = [48.8566, 2.3522]; // Paris fallback

  return (
    <div className="flex flex-col w-full rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-slate-900 mt-8">
      
      {/* Header & Day Switcher */}
      <div className="p-4 md:p-6 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400">
          <Navigation size={20} />
          <h3 className="font-bold text-slate-900 dark:text-white">Interactive Map Route</h3>
        </div>
        
        {/* Day Tabs */}
        <div className="flex flex-wrap gap-2">
          {dayItineraries.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDay(day.dayNumber)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedDay === day.dayNumber
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>
      </div>
      
      {/* Map Area */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        
        {/* Loading Overlay */}
        {isRouteLoading && (
          <div className="absolute inset-0 z-[1000] bg-slate-900/20 backdrop-blur-[2px] flex flex-col items-center justify-center transition-opacity">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <Loader2 className="animate-spin text-indigo-600 dark:text-cyan-400" size={24} />
              <span className="font-bold text-sm text-slate-700 dark:text-slate-200">Calculating route...</span>
            </div>
          </div>
        )}
        
        <MapContainer 
          center={defaultCenter} 
          zoom={13} 
          className="w-full h-full z-0"
          zoomControl={false}
          maxZoom={18}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          />
          
          <MapRefocus items={currentItems} />
          

          
          {/* Polyline Route */}
          {routeGeometry.length > 0 && (
            <>
              {/* Glow Layer */}
              <Polyline 
                positions={routeGeometry} 
                color={routeColor} 
                weight={12} 
                opacity={0.25}
              />
              {/* Core Layer */}
              <Polyline 
                positions={routeGeometry} 
                color={routeColor} 
                weight={4} 
                opacity={1.0}
                lineCap="round"
                lineJoin="round"
              />
            </>
          )}
          
          {/* Markers */}
          {currentItems.map((item, index) => {
            if (item.latitude == null || item.longitude == null) return null;
            return (
              <Marker 
                key={`${selectedDay}-${index}`} 
                position={[item.latitude, item.longitude]} 
                icon={createNumberedIcon(index + 1, routeColor)}
              >
                <Popup className="custom-popup">
                  <div className="min-w-[150px]">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <MapPin size={10} /> {item.placeType}
                    </p>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.placeName}</h4>
                    {item.time && (
                      <p className="text-xs text-slate-500 mt-1 font-medium">{item.time}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
