import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const GLOBE_CSS_SIZE = 640;

const CITIES = [
    { id: 'hcm',     name: 'Ho Chi Minh', location: [10.8231, 106.6297], size: 0.035, emoji: '🛫' },
    { id: 'bangkok', name: 'Bangkok',      location: [13.7563, 100.5018], size: 0.03,  emoji: '🔁' },
    { id: 'hanoi',   name: 'Hanoi',        location: [21.0285, 105.8542], size: 0.03,  emoji: '🔁' },
    { id: 'tokyo',   name: 'Tokyo',        location: [35.6762, 139.6503], size: 0.04,  emoji: '🛬' },
];

const ARCS = [
    { from: CITIES[0].location, to: CITIES[1].location },
    { from: CITIES[1].location, to: CITIES[2].location },
    { from: CITIES[2].location, to: CITIES[3].location },
];

const InteractiveGlobe = ({ className = "" }) => {
    const canvasRef = useRef();
    const globeRef  = useRef(null);
    const rafRef    = useRef(null);
    const phiRef    = useRef(4.6);
    const pointerInteracting         = useRef(null);
    const pointerInteractionMovement = useRef(0);

    const buildGlobe = (dark) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        if (rafRef.current)   cancelAnimationFrame(rafRef.current);
        if (globeRef.current) { globeRef.current.destroy(); globeRef.current = null; }

        const dpr  = Math.min(window.devicePixelRatio || 1, 2);
        const size = GLOBE_CSS_SIZE * dpr;

        globeRef.current = createGlobe(canvas, {
            devicePixelRatio: dpr,
            width:  size,
            height: size,
            phi:    phiRef.current,
            theta:  0.2,
            dark:   dark ? 1 : 0,
            diffuse: 1.2,
            scale:  0.88,
            mapSamples:    8000,
            mapBrightness: dark ? 10 : 6,
            baseColor:  dark ? [0.18, 0.22, 0.4] : [1, 1, 1],
            markerColor:   [6 / 255, 182 / 255, 212 / 255],
            glowColor:  dark ? [0.2, 0.35, 0.7] : [0.8, 0.9, 1.0],
            // Pass markers WITH ids so cobe sets --cobe-{id} anchor variables
            markers: CITIES.map(c => ({ location: c.location, size: c.size, id: c.id })),
            arcs:    ARCS.map(a => ({ from: a.from, to: a.to })),
            arcColor:  [99 / 255, 102 / 255, 241 / 255],
            arcWidth:  0.5,
            arcHeight: 0.4,
        });

        const animate = () => {
            if (pointerInteracting.current === null) {
                phiRef.current += 0.003;
            }
            globeRef.current?.update({
                phi: phiRef.current + pointerInteractionMovement.current,
            });
            rafRef.current = requestAnimationFrame(animate);
        };

        canvas.style.opacity = '1';
        animate();
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            buildGlobe(document.documentElement.classList.contains('dark'));
        }, 100);

        const themeObserver = new MutationObserver(() => {
            buildGlobe(document.documentElement.classList.contains('dark'));
        });
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => {
            clearTimeout(timer);
            themeObserver.disconnect();
            if (rafRef.current)   cancelAnimationFrame(rafRef.current);
            if (globeRef.current) { globeRef.current.destroy(); globeRef.current = null; }
        };
    }, []);

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {/* Globe canvas + overlaid CSS-anchored labels in one relative container */}
            <div
                style={{
                    position: 'relative',
                    width:    GLOBE_CSS_SIZE,
                    height:   GLOBE_CSS_SIZE,
                    maxWidth: '100%',
                    margin:   '0 auto',
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        width:    GLOBE_CSS_SIZE,
                        height:   GLOBE_CSS_SIZE,
                        maxWidth: '100%',
                        opacity:  0,
                        transition: 'opacity 0.8s ease',
                        cursor:   'grab',
                        display:  'block',
                    }}
                    onPointerDown={(e) => {
                        pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
                        canvasRef.current.style.cursor = 'grabbing';
                    }}
                    onPointerUp={() => {
                        pointerInteracting.current = null;
                        canvasRef.current.style.cursor = 'grab';
                    }}
                    onPointerOut={() => {
                        pointerInteracting.current = null;
                        canvasRef.current.style.cursor = 'grab';
                    }}
                    onMouseMove={(e) => {
                        if (pointerInteracting.current !== null) {
                            pointerInteractionMovement.current = (e.clientX - pointerInteracting.current) * 0.01;
                        }
                    }}
                    onTouchStart={(e) => {
                        if (e.touches[0]) pointerInteracting.current = e.touches[0].clientX - pointerInteractionMovement.current;
                    }}
                    onTouchMove={(e) => {
                        if (pointerInteracting.current !== null && e.touches[0]) {
                            pointerInteractionMovement.current = (e.touches[0].clientX - pointerInteracting.current) * 0.01;
                        }
                    }}
                    onTouchEnd={() => { pointerInteracting.current = null; }}
                />

                {/*
                  City labels — positioned via cobe's native CSS Anchor Positioning API.
                  Cobe sets `--cobe-{id}` as an anchor name on the canvas, and
                  `--cobe-visible-{id}` (0 or 1) for visibility.
                */}
                {CITIES.map((city) => (
                    <div
                        key={city.id}
                        className="marker-label"
                        style={{
                            positionAnchor: `--cobe-${city.id}`,
                            opacity: `var(--cobe-visible-${city.id}, 0)`,
                        }}
                    >
                        <span style={{ fontSize: '10px', marginRight: 3 }}>{city.emoji}</span>
                        {city.name}
                    </div>
                ))}
            </div>

            {/* Route breadcrumb */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {CITIES.map((city, i) => (
                    <React.Fragment key={i}>
                        <span className={`px-2.5 py-1 rounded-full border ${
                            i === 0 || i === CITIES.length - 1
                                ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                        }`}>
                            {city.emoji} {city.name}
                        </span>
                        {i < CITIES.length - 1 && (
                            <span className="text-slate-300 dark:text-slate-600">→</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default InteractiveGlobe;
