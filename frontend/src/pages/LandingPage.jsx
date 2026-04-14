import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PopularThemes from "../components/PopularThemes";
import HowItWorks from "../components/HowItWorks";
import GlobeSection from "../components/GlobeSection";
import ProductShowcase from "../components/ProductShowcase";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import Reveal from "../components/ui/Reveal";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <PopularThemes />
        <HowItWorks />
        {/* <GlobeSection /> */}
        <ProductShowcase />
        <Testimonials />
        <Pricing />

        {/* CTA Section */}
        <section className="py-24 px-4">
          <Reveal
            animation="reveal-scale"
            className="max-w-5xl mx-auto p-12 lg:p-20 rounded-[3.5rem] text-center relative overflow-hidden shadow-2xl group"
          >
            {/* Background Layers for performant animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 via-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* Glow blob */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                Your next great adventure is exactly one click away.
              </h2>
              <p className="text-indigo-100/90 text-lg mb-10 max-w-xl mx-auto">
                Join 100,000+ travelers who are ditching the spreadsheets for
                smarter, faster planning.
              </p>
              <button
                className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-50 active:scale-95"
                style={{
                  transition:
                    "background-color 0.2s ease, transform 0.15s ease",
                }}
              >
                Start Planning for Free 🚀
              </button>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

