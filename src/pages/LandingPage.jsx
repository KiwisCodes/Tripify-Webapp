import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PopularThemes from '../components/PopularThemes';
import HowItWorks from '../components/HowItWorks';
import ProductShowcase from '../components/ProductShowcase';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Hero />
                <PopularThemes />
                <HowItWorks />
                <ProductShowcase />
                <Pricing />

                {/* CTA Section */}
                <section className="py-24 px-4">
                    <div className="max-w-5xl mx-auto p-12 lg:p-20 rounded-[3.5rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-500 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                                Your next great adventure is exactly one click away.
                            </h2>
                            <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">Join 100,000+ travelers who are ditching the spreadsheets for smarter, faster planning.</p>
                            <button className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:scale-105 active:scale-95">
                                Start Planning for Free
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
