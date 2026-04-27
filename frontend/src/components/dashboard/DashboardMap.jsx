import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from 'react-leaflet';
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

// ── Day Colors ──────────────────────────────────────────
const DAY_COLORS = {
  1: '#ff6b6b',
  2: '#4ecdc4',
  3: '#ffd93d',
  4: '#a78bfa',
  5: '#6bcb77',
};
const DAY_COLOR_FALLBACK = '#94a3b8';

function getDayColor(dayNumber) {
  return DAY_COLORS[dayNumber] || DAY_COLOR_FALLBACK;
}

// ── Numbered marker icon colored by day ─────────────────
function createNumberedIcon(number, color) {
  return new L.divIcon({
    className: 'bg-transparent',
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      background:${color};color:#fff;border-radius:50%;
      width:34px;height:34px;font-weight:700;font-size:14px;
      border:3px solid #fff;
      box-shadow:0 0 0 3px ${color}40, 0 4px 12px rgba(0,0,0,0.5);
      transition:transform .15s;
    ">${number}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

// ── OSRM route fetcher (reuses the same logic as per-day maps) ──
async function fetchRouteForDay(items) {
  const valid = items.filter(i => i.pos[0] != null && i.pos[1] != null);
  if (valid.length <= 1) return null; // nothing to connect

  try {
    // OSRM wants lon,lat
    const coords = valid.map(i => `${i.pos[1]},${i.pos[0]}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.code === 'Ok' && data.routes?.[0]) {
      // GeoJSON is [lon,lat] → Leaflet needs [lat,lon]
      return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
    }
    // OSRM non-OK → straight-line fallback
    return valid.map(i => i.pos);
  } catch (err) {
    console.error('OSRM fetch failed for a day, falling back to straight lines:', err);
    return valid.map(i => i.pos);
  }
}

// ── Component to handle map view updates ────────────────
function MapRefocus({ markers }) {
  const map = useMap();
  useEffect(() => {
    const validMarkers = markers.filter(m => m.pos[0] != null && m.pos[1] != null);
    if (validMarkers.length > 0) {
      const bounds = L.latLngBounds(validMarkers.map(m => m.pos));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);
  return null;
}

// ── Legend overlay ──────────────────────────────────────
function Legend({ dayNumbers }) {
  if (!dayNumbers || dayNumbers.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        right: '12px',
        zIndex: 1000,
        background: 'rgba(15, 15, 20, 0.85)',
        borderRadius: '10px',
        padding: '10px 14px',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        fontSize: '13px',
        lineHeight: '1.8',
        pointerEvents: 'none',
      }}
    >
      {dayNumbers.map(dayNum => {
        const color = getDayColor(dayNum);
        return (
          <div key={dayNum} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 6px ${color}`,
                flexShrink: 0,
              }}
            />
            <span>Day {dayNum}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ──────────────────────────────────────
export default function DashboardMap({ markers = [], dayItineraries = [] }) {
  const [dayRoutes, setDayRoutes] = useState({});
  const defaultCenter = [48.8566, 2.3522]; // Paris fallback

  // Group markers by day for route fetching
  const markersByDay = useMemo(() => {
    const grouped = {};
    markers.forEach(m => {
      const d = m.day;
      if (!grouped[d]) grouped[d] = [];
      grouped[d].push(m);
    });
    return grouped;
  }, [markers]);

  // Unique sorted day numbers (for legend)
  const dayNumbers = useMemo(() => {
    return [...new Set(markers.map(m => m.day))].sort((a, b) => a - b);
  }, [markers]);

  // Fetch OSRM routes for each day in parallel
  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      const entries = {};

      await Promise.all(
        Object.entries(markersByDay).map(async ([dayNum, items]) => {
          const route = await fetchRouteForDay(items);
          if (!cancelled) entries[dayNum] = route;
        })
      );

      if (!cancelled) setDayRoutes(entries);
    }

    if (Object.keys(markersByDay).length > 0) {
      fetchAll();
    } else {
      setDayRoutes({});
    }

    return () => { cancelled = true; };
  }, [markersByDay]);

  // Sequential numbering across all days
  let globalIndex = 0;

  return (
    <div className="relative w-full h-full min-h-[500px] overflow-hidden group">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        zoomControl={false}
        className="w-full h-full z-0 grayscale-[0.2] contrast-[1.1]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        <MapRefocus markers={markers} />

        {/* ── Routes per day (glow + core polyline) ── */}
        {dayNumbers.map(dayNum => {
          const route = dayRoutes[dayNum];
          if (!route || route.length < 2) return null;
          const color = getDayColor(dayNum);
          return (
            <React.Fragment key={`route-${dayNum}`}>
              {/* Glow halo */}
              <Polyline
                positions={route}
                color={color}
                weight={12}
                opacity={0.25}
              />
              {/* Sharp core line */}
              <Polyline
                positions={route}
                color={color}
                weight={4}
                opacity={1.0}
                lineCap="round"
                lineJoin="round"
              />
            </React.Fragment>
          );
        })}

        {/* ── Markers colored by day ── */}
        {dayNumbers.map(dayNum => {
          const color = getDayColor(dayNum);
          const dayMarkers = markersByDay[dayNum] || [];
          return dayMarkers.map((dest, idx) => {
            if (dest.pos[0] == null || dest.pos[1] == null) return null;
            globalIndex++;
            return (
              <Marker
                key={`${dest.day}-${idx}`}
                position={dest.pos}
                icon={createNumberedIcon(globalIndex, color)}
              >
                <Tooltip 
                  direction="auto" 
                  offset={[0, -10]} 
                  opacity={1} 
                  className="custom-leaflet-tooltip"
                  sticky={false}
                >
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-3 shadow-xl border border-slate-100 dark:border-white/10 min-w-[150px]">
                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">
                      Day {dest.day} · {dest.time}
                    </p>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{dest.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{dest.category}</p>
                  </div>
                </Tooltip>
              </Marker>
            );
          });
        })}
      </MapContainer>

      {/* Legend Overlay */}
      <Legend dayNumbers={dayNumbers} />

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
      
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_80px_rgba(0,0,0,0.2)]"></div>
    </div>
  );
}
