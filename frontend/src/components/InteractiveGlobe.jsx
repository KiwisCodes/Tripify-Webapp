import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

const GLOBE_CSS_SIZE = 600; // CSS pixels

const InteractiveGlobe = ({ className = "" }) => {
    const canvasRef = useRef();
    const globeRef = useRef(null);
    const rafRef   = useRef(null);
    const phiRef   = useRef(2.4);
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);

    const buildGlobe = (dark) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Stop existing animation loop
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (globeRef.current) { globeRef.current.destroy(); globeRef.current = null; }

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w   = GLOBE_CSS_SIZE * dpr;

        globeRef.current = createGlobe(canvas, {
            devicePixelRatio: dpr,
            width:  w,
            height: w,
            phi:    phiRef.current,
            theta:  0.25,
            dark:   dark ? 1 : 0,
            diffuse: 1.2,
            mapSamples:   16000,
            mapBrightness: dark ? 10 : 6,
            baseColor:  dark ? [0.2, 0.25, 0.4] : [1, 1, 1],
            markerColor: [6 / 255, 182 / 255, 212 / 255],  // Cyan-500
            glowColor:  dark ? [0.2, 0.35, 0.7] : [0.8, 0.9, 1.0],
            markers: [
                { location: [35.6655, 139.7707], size: 0.08 }, // Tsukiji
                { location: [35.6764, 139.6993], size: 0.08 }, // Meiji Jingu
                { location: [35.6938, 139.7034], size: 0.10 }, // Shinjuku
            ],
            arcs: [
                { from: [35.6655, 139.7707], to: [35.6764, 139.6993] },
                { from: [35.6764, 139.6993], to: [35.6938, 139.7034] },
            ],
            arcColor:  [99 / 255, 102 / 255, 241 / 255], // Indigo-500
            arcWidth:  0.5,
            arcHeight: 0.4,
        });

        // v2 API: animate via globe.update() in a rAF loop
        const animate = () => {
            if (pointerInteracting.current === null) {
                phiRef.current += 0.003;
            }
            globeRef.current?.update({
                phi: phiRef.current + pointerInteractionMovement.current,
            });
            rafRef.current = requestAnimationFrame(animate);
        };

        // Fade in canvas once globe is created
        canvas.style.opacity = '1';
        animate();
    };

    useEffect(() => {
        // Delay slightly so canvas has its CSS layout size
        const timer = setTimeout(() => {
            const dark = document.documentElement.classList.contains('dark');
            buildGlobe(dark);
        }, 100);

        // Rebuild on dark-mode toggle
        const observer = new MutationObserver(() => {
            const dark = document.documentElement.classList.contains('dark');
            buildGlobe(dark);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            clearTimeout(timer);
            observer.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            if (globeRef.current) { globeRef.current.destroy(); globeRef.current = null; }
        };
    }, []);

    return (
        <div
            className={`flex items-center justify-center ${className}`}
            style={{ width: GLOBE_CSS_SIZE, height: GLOBE_CSS_SIZE, maxWidth: '100%', margin: '0 auto' }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: GLOBE_CSS_SIZE,
                    height: GLOBE_CSS_SIZE,
                    maxWidth: '100%',
                    opacity: 0,
                    transition: 'opacity 0.8s ease',
                    cursor: 'grab',
                    display: 'block',
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
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta * 0.01;
                    }
                }}
                onTouchStart={(e) => {
                    if (e.touches[0]) pointerInteracting.current = e.touches[0].clientX - pointerInteractionMovement.current;
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.touches[0]) {
                        const delta = e.touches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta * 0.01;
                    }
                }}
                onTouchEnd={() => { pointerInteracting.current = null; }}
            />
        </div>
    );
};

export default InteractiveGlobe;
