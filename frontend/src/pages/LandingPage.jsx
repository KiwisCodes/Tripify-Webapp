import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PopularThemes from '../components/PopularThemes';
import HowItWorks from '../components/HowItWorks';
import ProductShowcase from '../components/ProductShowcase';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';

const LandingPage = () => {
    const { ref: ctaRef } = useScrollReveal({ threshold: 0.2 });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <Navbar />
            <main>
                <Hero />
                <PopularThemes />
                <HowItWorks />
                <ProductShowcase />
                <Testimonials />
                <Pricing />

                {/* CTA Section */}
                <section className="py-24 px-4">
                    <div
                        ref={ctaRef}
                        className="reveal-scale max-w-5xl mx-auto p-12 lg:p-20 rounded-[3.5rem] text-center relative overflow-hidden shadow-2xl animate-gradient-shift"
                        style={{
                            background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #06b6d4 100%)',
                            backgroundSize: '300% 300%',
                            animation: 'gradientShift 8s ease infinite',
                        }}
                    >
                    {/* Glow blob */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                                Your next great adventure is exactly one click away.
                            </h2>
                            <p className="text-indigo-100/90 text-lg mb-10 max-w-xl mx-auto">
                                Join 100,000+ travelers who are ditching the spreadsheets for smarter, faster planning.
                            </p>
                            <button
                                className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-50 active:scale-95"
                                style={{ transition: 'background-color 0.2s ease, transform 0.15s ease' }}
                            >
                                Start Planning for Free 🚀
                            </button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
