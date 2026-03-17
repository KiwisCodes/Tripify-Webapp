import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const testimonials = [
    {
        name: 'Sarah M.',
        location: 'Austin, TX',
        initials: 'SM',
        color: 'from-pink-500 to-rose-600',
        stars: 5,
        text: 'I planned a 10-day Japan trip in under 5 minutes. The AI knew exactly what I wanted — hidden ramen spots, afternoon tea ceremonies, night photography in Shinjuku. It was like having a local friend plan everything.',
        trip: 'Tokyo & Kyoto, 10 days',
    },
    {
        name: 'James R.',
        location: 'London, UK',
        initials: 'JR',
        color: 'from-blue-500 to-indigo-600',
        stars: 5,
        text: "Genuinely shocked by the quality. I gave it 'romantic Paris weekend with a tight budget' and it came back with an itinerary I never would've found on my own. The budget breakdown alone saved me hours.",
        trip: 'Paris Weekend Escape',
    },
    {
        name: 'Priya K.',
        location: 'Bangalore, India',
        initials: 'PK',
        color: 'from-amber-500 to-orange-600',
        stars: 5,
        text: "Every travel blog gives the same 10 tourist traps. Tripify found the offbeat stuff — a tiny jazz bar in Montmartre, a bookshop café that doesn't show up on any map. 10/10.",
        trip: 'Solo Paris, 5 days',
    },
    {
        name: 'Carlos & Ana',
        location: 'Barcelona, Spain',
        initials: 'CA',
        color: 'from-emerald-500 to-teal-600',
        stars: 5,
        text: 'Used it for our honeymoon in Bali. The itinerary balanced adventure with relaxation perfectly — something that took us weeks to figure out on our own. Absolutely magical.',
        trip: 'Bali Honeymoon, 14 days',
    },
    {
        name: 'Lena F.',
        location: 'Berlin, Germany',
        initials: 'LF',
        color: 'from-violet-500 to-purple-600',
        stars: 5,
        text: "I'm a control freak about travel planning. I tested it against my own hand-crafted Tuscany itinerary and Tripify's version was genuinely better — more efficient, more unique spots.",
        trip: 'Tuscany Wine Tour, 7 nights',
    },
    {
        name: 'Marcus T.',
        location: 'Chicago, IL',
        initials: 'MT',
        color: 'from-cyan-500 to-sky-600',
        stars: 5,
        text: "I travel for work every month and always extend trips by a day or two. Tripify has become my go-to for 48-hour city itineraries. It's incredibly fast and always on point.",
        trip: 'Multiple City Weekends',
    },
];

const Stars = () => (
    <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const Testimonials = () => {
    const { ref: headingRef } = useScrollReveal();
    const { ref: gridRef } = useScrollReveal({ threshold: 0.05 });

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900" id="testimonials">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-100/20 dark:bg-cyan-900/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-4 relative">
                <div ref={headingRef} className="reveal text-center mb-16">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-cyan-400 mb-3">Real Travelers. Real Results.</p>
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">What Our Community Says</h2>
                    <p className="text-gray-500 dark:text-slate-400 max-w-xl mx-auto">
                        Over 100,000 trips planned and counting.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="reveal group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5"
                            style={{
                                transitionDelay: `${i * 0.08}s`,
                                transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, background-color 300ms ease, border-color 300ms ease',
                            }}
                        >
                            <div className="absolute top-5 right-6 text-5xl font-serif text-gray-100 dark:text-slate-800 select-none">"</div>
                            <Stars />
                            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-5 relative z-10">"{t.text}"</p>
                            <div className="flex items-center gap-3 border-t border-gray-100 dark:border-slate-800 pt-4">
                                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                    {t.initials}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold truncate">{t.name}</p>
                                    <p className="text-[11px] text-gray-400 dark:text-slate-500 truncate">{t.location} · {t.trip}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Aggregate rating */}
                <div className="mt-12 flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        <span className="font-bold text-gray-900 dark:text-white">4.9/5</span> from <span className="font-bold text-indigo-500">12,400+</span> verified reviews
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
