import React, { useEffect, useRef } from 'react';

const ProductShowcase = () => {
    const cardRef = useRef(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className="relative w-full overflow-hidden"
            id="product"
            style={{ minHeight: '600px', height: '85vh', backgroundColor: '#f8fafc' }}
        >
            {/* ── Dark mode compatible bg color ── */}
            <div className="absolute inset-0 bg-gray-50 dark:bg-slate-900" />

            {/* ── Map grid lines ── */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(99,102,241,0.12) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99,102,241,0.12) 1px, transparent 1px)
                    `,
                    backgroundSize: '56px 56px',
                }}
            />
            {/* Horizontal "road" bands */}
            <div
                className="absolute inset-0 opacity-20 dark:opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(transparent 38px, rgba(148,163,184,0.6) 38px, rgba(148,163,184,0.6) 41px, transparent 41px),
                        linear-gradient(90deg, transparent 90px, rgba(148,163,184,0.6) 90px, rgba(148,163,184,0.6) 93px, transparent 93px)
                    `,
                    backgroundSize: '180px 180px',
                }}
            />
            {/* Color wash overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 70% at 40% 55%, rgba(99,102,241,0.1) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 75% 35%, rgba(6,182,212,0.08) 0%, transparent 60%)',
                }}
            />
            {/* Edge vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(to right, rgba(248,250,252,0.6) 0%, transparent 15%, transparent 85%, rgba(248,250,252,0.6) 100%)',
            }} />
            <div className="absolute inset-0 dark:block hidden pointer-events-none" style={{
                background: 'linear-gradient(to right, rgba(15,23,42,0.6) 0%, transparent 15%, transparent 85%, rgba(15,23,42,0.6) 100%)',
            }} />

            {/* ── SVG Route with map pins (landscape-friendly viewBox) ── */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 160 90"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                        <filter id="pinShadow" x="-40%" y="-40%" width="180%" height="180%">
                            <feDropShadow dx="0" dy="0.5" stdDeviation="0.8" floodColor="#000" floodOpacity="0.25" />
                        </filter>
                    </defs>

                    {/* Animated route path */}
                    <path
                        className="map-route-path"
                        d="M 32,58 C 52,38 72,62 90,52 S 118,38 132,42"
                        fill="none"
                        stroke="url(#rg2)"
                        strokeLinecap="round"
                        strokeWidth="1.2"
                        opacity="0.85"
                    />

                    {/* ── Pin 1: Tsukiji (32, 58) ── */}
                    <g transform="translate(32,58)">
                        <circle r="3" fill="white" filter="url(#pinShadow)" />
                        <circle r="1.6" fill="#6366f1" />
                        {/* Tooltip */}
                        <rect x="-2" y="-12" rx="1.2" width="28" height="7" fill="white" stroke="#c7d2fe" strokeWidth="0.4" filter="url(#pinShadow)" />
                        <text x="12" y="-7.8" textAnchor="middle" fontSize="2.4" fontWeight="700" fill="#4338ca" fontFamily="Inter,sans-serif">
                            09:00 • Tsukiji Market
                        </text>
                    </g>

                    {/* ── Pin 2: Meiji Jingu (90, 52) ── */}
                    <g transform="translate(90,52)">
                        <circle r="3" fill="white" filter="url(#pinShadow)" />
                        <circle r="1.6" fill="#06b6d4" />
                        {/* Tooltip */}
                        <rect x="-2" y="-12" rx="1.2" width="25" height="7" fill="white" stroke="#a5f3fc" strokeWidth="0.4" filter="url(#pinShadow)" />
                        <text x="10.5" y="-7.8" textAnchor="middle" fontSize="2.4" fontWeight="700" fill="#0e7490" fontFamily="Inter,sans-serif">
                            01:00 • Meiji Jingu
                        </text>
                    </g>

                    {/* ── Pin 3: Shinjuku (132, 42) — destination ── */}
                    <g transform="translate(132,42)">
                        <circle r="4" fill="url(#rg2)" filter="url(#pinShadow)" />
                        <text x="0" y="1.4" textAnchor="middle" fontSize="3.5" fill="white" fontFamily="sans-serif">★</text>
                        {/* Tooltip */}
                        <rect x="-14" y="-12" rx="1.2" width="30" height="7" fill="white" stroke="#c7d2fe" strokeWidth="0.4" filter="url(#pinShadow)" />
                        <text x="1" y="-7.8" textAnchor="middle" fontSize="2.4" fontWeight="700" fill="#4338ca" fontFamily="Inter,sans-serif">
                            Neon Shinjuku Dinner
                        </text>
                    </g>
                </svg>
            </div>

            {/* ── Itinerary sidebar card ── */}
            <div
                ref={cardRef}
                className="reveal-right absolute bottom-8 right-6 md:right-10 z-20 w-72 md:w-80"
                style={{ maxHeight: '78%' }}
            >
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col">
                    <div className="p-6 overflow-y-auto no-scrollbar">
                        <div className="mb-5">
                            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-cyan-400 mb-2 font-mono text-[10px] uppercase tracking-widest">
                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>map</span>
                                Itinerary / Tokyo
                            </div>
                            <h3 className="text-xl font-bold tracking-tight mb-1">Day 1: Neon Shinjuku</h3>
                            <p className="text-gray-500 dark:text-slate-400 text-xs">Kickoff in the heart of the metropolis.</p>
                        </div>

                        <div className="space-y-0">
                            {[
                                { color: 'bg-indigo-500', time: '09:00 AM', place: 'Tsukiji Market', note: 'Freshest sushi in the world.' },
                                { color: 'bg-cyan-500', time: '01:00 PM', place: 'Meiji Jingu Forest', note: 'A serene escape from city chaos.' },
                                { color: 'bg-gradient-to-b from-cyan-500 to-indigo-600', time: '07:30 PM', place: 'Neon Shinjuku Dinner', note: 'Hidden izakaya, electric atmosphere.' },
                            ].map((stop, i, arr) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${stop.color}`} />
                                        {i < arr.length - 1 && <div className="w-px flex-1 bg-gray-200 dark:bg-slate-700 my-1" style={{ minHeight: '24px' }} />}
                                    </div>
                                    <div className="pb-4">
                                        <h4 className="font-bold text-xs">{stop.time} — {stop.place}</h4>
                                        <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-0.5">{stop.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-2 p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                            <h5 className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-2">Estimated Costs</h5>
                            <div className="space-y-1.5 text-[10px]">
                                {[['Food & Drink', '$45'], ['Transport', '$12']].map(([k, v]) => (
                                    <div key={k} className="flex justify-between text-gray-500">
                                        <span>{k}</span><span className="font-mono">{v}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between font-bold text-indigo-600 dark:text-cyan-400 border-t border-gray-200 dark:border-slate-700 pt-1.5 mt-1">
                                    <span>Daily Total</span><span className="font-mono">$77</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-5 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95"
                            style={{ transition: 'opacity 0.2s ease, transform 0.15s ease' }}>
                            Book Full Route
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductShowcase;
