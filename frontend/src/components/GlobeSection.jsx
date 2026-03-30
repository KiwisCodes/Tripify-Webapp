import React from 'react';
import InteractiveGlobe from './InteractiveGlobe';

const GlobeSection = () => {
    return (
        <section 
            id="explore-globe"
            className="relative w-full py-16 md:py-24 overflow-hidden bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900"
        >
            {/* Background dot pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Glow blob */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="flex flex-col items-center text-center">
                    {/* Heading */}
                    <div className="max-w-2xl mb-8 md:mb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-cyan-400 mb-3">Interactive Map</p>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-slate-900 dark:text-white leading-tight">
                            Explore the World in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">3D</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Spin the globe, drag it around, and see your Ho Chi Minh City → Tokyo route come alive with arc routing.
                        </p>
                    </div>

                    {/* Globe — scales with viewport */}
                    <div className="w-full flex justify-center" style={{ maxWidth: 600 }}>
                        <div className="w-full scale-75 sm:scale-90 md:scale-100 origin-top">
                            <InteractiveGlobe />
                        </div>
                    </div>
                    
                    {/* Feature pills */}
                    <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
                        {[
                            { label: 'Live Arc Routes', icon: 'route' },
                            { label: 'Drag to Explore', icon: 'language' },
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
