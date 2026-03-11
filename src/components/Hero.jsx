import React, { useState } from 'react';

const Hero = () => {
    const [formData, setFormData] = useState({
        destination: '',
        length: '',
        budget: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGenerate = () => {
        console.log('Generating Trip:', JSON.stringify(formData, null, 2));
    };

    return (
        <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
            <div className="absolute inset-0 glow-gradient pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-slate-500 leading-tight">
                    Your next adventure,<br />curated by AI.
                </h1>
                <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">
                    Stop planning, start exploring. Trippy transforms your vague wanderlust into a detailed, ready-to-book itinerary in seconds.
                </p>
                <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-2 rounded-3xl lg:rounded-full shadow-2xl flex flex-col lg:flex-row items-center gap-2">
                    <div className="flex-1 w-full px-6 py-3 text-left border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-slate-500 mb-1">
                            Destination
                        </label>
                        <input
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm placeholder-gray-400 dark:placeholder-slate-600"
                            placeholder="Where to?"
                            type="text"
                        />
                    </div>
                    <div className="flex-1 w-full px-6 py-3 text-left border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-slate-800">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-slate-500 mb-1">
                            Length
                        </label>
                        <input
                            name="length"
                            value={formData.length}
                            onChange={handleChange}
                            className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm placeholder-gray-400 dark:placeholder-slate-600"
                            placeholder="How many days?"
                            type="text"
                        />
                    </div>
                    <div className="flex-1 w-full px-6 py-3 text-left">
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-slate-500 mb-1">
                            Budget
                        </label>
                        <input
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm placeholder-gray-400 dark:placeholder-slate-600"
                            placeholder="Approx budget?"
                            type="text"
                        />
                    </div>
                    <button
                        onClick={handleGenerate}
                        className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-2xl lg:rounded-full linear-glow whitespace-nowrap"
                    >
                        Generate My Trip
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
