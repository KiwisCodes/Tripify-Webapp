import React from 'react';
import InteractiveGlobe from './InteractiveGlobe';

const GlobeSection = () => {
    return (
        <section 
            id="explore-globe"
            className="relative w-full py-24 overflow-hidden bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="max-w-3xl mb-6">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
                            Explore the World in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">3D</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            Spin the globe, drag it around, and visualize your Tokyo itinerary with precision topographical data and live arc routing.
                        </p>
                    </div>

                    {/* Glow ring behind the globe */}
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full blur-3xl bg-indigo-500/10 dark:bg-indigo-500/20 scale-75 pointer-events-none" />
                        <InteractiveGlobe />
                    </div>
                    
                    <div className="mt-10 flex flex-wrap justify-center gap-8">
                        {[
                            { label: 'Real-time Arc Routes', icon: 'route' },
                            { label: 'Topographical Detail', icon: 'terrain' },
                            { label: 'Interactive Markers', icon: 'location_on' }
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-semibold text-sm">
                                <span className="material-symbols-outlined text-indigo-500 text-lg">{feature.icon}</span>
                                {feature.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GlobeSection;
