import React from 'react';

const steps = [
    {
        id: 1,
        title: 'Feed the AI',
        description: 'Tell us your vibes—"Tokyo neon lights," "Tuscan wine tasting," or "Secret surf spots."',
        color: 'indigo'
    },
    {
        id: 2,
        title: 'Instant Curation',
        description: 'Our engine scans millions of data points to build a logic-defying perfect route.',
        color: 'cyan'
    },
    {
        id: 3,
        title: 'Pack and Go',
        description: 'Sync your dynamic itinerary to Google Maps and Notion. Adventure awaits.',
        color: 'indigo'
    }
];

const HowItWorks = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 relative">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">From Spark to Sensation</h2>
                    <p className="text-gray-500 dark:text-slate-400">Three steps to your dream vacation.</p>
                </div>
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-500 hidden md:block opacity-20 -translate-y-1/2"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 relative">
                        {steps.map((step) => (
                            <div key={step.id} className="relative flex flex-col items-center text-center group">
                                <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border-2 ${step.color === 'indigo' ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' : 'border-cyan-500 text-cyan-600 dark:text-cyan-400'} flex items-center justify-center font-bold mb-8 shadow-xl z-10 group-hover:scale-110 transition-transform`}>
                                    {step.id}
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
