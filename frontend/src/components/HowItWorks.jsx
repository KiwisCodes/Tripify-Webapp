import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const steps = [
    {
        id: 1,
        icon: '✏️',
        title: 'Feed the AI',
        description: 'Tell us your vibes—"Tokyo neon lights," "Tuscan wine tasting," or "Secret surf spots."',
        color: 'indigo',
    },
    {
        id: 2,
        icon: '⚡',
        title: 'Instant Curation',
        description: 'Our engine scans millions of data points to build a logic-defying perfect route.',
        color: 'cyan',
    },
    {
        id: 3,
        icon: '🧳',
        title: 'Pack and Go',
        description: 'Sync your dynamic itinerary to Google Maps and Notion. Adventure awaits.',
        color: 'indigo',
    },
];

const HowItWorks = () => {
    const { ref: headingRef } = useScrollReveal();
    const { ref: stepsRef } = useScrollReveal({ threshold: 0.1 });

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950" id="how-it-works">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-100/30 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 relative">
                {/* Heading */}
                <div ref={headingRef} className="reveal text-center mb-20">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-cyan-400 mb-3">How It Works</p>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">From Spark to Sensation</h2>
                    <p className="text-gray-500 dark:text-slate-400">Three steps to your dream vacation.</p>
                </div>

                {/* Steps */}
                <div ref={stepsRef} className="relative">
                    <div className="absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-500 hidden md:block opacity-15" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                        {steps.map((step, i) => (
                            <div
                                key={step.id}
                                className="reveal flex flex-col items-center text-center group"
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 ${
                                    step.color === 'indigo' ? 'border-indigo-500' : 'border-cyan-500'
                                } flex items-center justify-center text-2xl mb-8 shadow-xl z-10 group-hover:scale-110 group-hover:-translate-y-1`}
                                    style={{ transition: 'transform 0.25s ease' }}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed max-w-xs">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
