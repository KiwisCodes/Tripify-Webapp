import React, { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import HeroSearch from "../components/dashboard/HeroSearch";
import DashboardMap from "../components/dashboard/DashboardMap";
import TourTypeGrid from "../components/dashboard/TourTypeGrid";
import SuggestionsGrid from "../components/dashboard/SuggestionsGrid";
import TripResultView from "../components/dashboard/TripResultView";
import Footer from "../components/dashboard/Footer";
import Reveal from "../components/ui/Reveal";
import { History, Sparkles, Loader2, AlertCircle, X } from "lucide-react";
import tripService from "../api/tripService";

export default function Dashboard() {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creditRefreshTrigger, setCreditRefreshTrigger] = useState(0);

  const handleGenerateTrip = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await tripService.generateTrip(formData);
      setCurrentTrip(result);
      setCreditRefreshTrigger(prev => prev + 1); // Trigger credit refresh
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('trip-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error("Failed to generate trip:", err);
      setError("Failed to generate your itinerary. Please check your credits or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const mapMarkers = currentTrip?.dayItineraries?.flatMap(day => 
    day.items.map(item => ({
      id: `${day.dayNumber}-${item.orderIndex}`,
      name: item.placeName,
      pos: [item.latitude, item.longitude],
      category: item.placeType,
      time: item.time,
      day: day.dayNumber
    }))
  ) || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500/30 transition-colors duration-500 overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 dark:bg-cyan-500/10 blur-[120px]" />
      </div>

      <Navbar refreshTrigger={creditRefreshTrigger} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-2 pb-20 space-y-16">
        {/* Welcome Header - More Compact */}
        <Reveal animation="reveal" className="space-y-1">
          <h2 className="text-[10px] font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-[0.3em] ml-1">
            Traveler Dashboard
          </h2>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {currentTrip ? "Your Curated Journey" : "Where to, "}
            {!currentTrip && (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-500">
                Explorer?
              </span>
            )}
          </h1>
        </Reveal>

        {/* Hero Section: Map with Floating Search */}
        <section className="relative w-full h-[500px] lg:h-[620px] -top-10 rounded-[3rem] overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <DashboardMap markers={mapMarkers} />
          </div>

          {/* Floating Search Widget */}
          <div className="absolute top-6 left-6 bottom-6 z-10 w-full max-w-[320px] sm:max-w-[420px] pointer-events-none">
            <div className="pointer-events-auto max-h-full flex flex-col">
              <HeroSearch onGenerate={handleGenerateTrip} isLoading={isLoading} />
            </div>
          </div>

          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-x-0 top-0 z-50 p-4 animate-slide-down">
              <div className="max-w-md mx-auto bg-red-500 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle size={20} />
                  <p className="text-sm font-bold">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Conditional Content: Results displayed alongside Dashboard components */}
        {currentTrip && (
          <div id="trip-results" className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8 px-2">
              <button 
                onClick={() => setCurrentTrip(null)}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <X size={16} />
                Clear Results
              </button>
            </div>
            <TripResultView tripData={currentTrip} />
          </div>
        )}

        {/* Always Visible Dashboard Components */}
        <section>
          <Reveal animation="reveal" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Curated Experiences
            </h2>
          </Reveal>
          <TourTypeGrid />
        </section>

        <section className="bg-white/40 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <History size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Your Saved Itineraries
              </h2>
            </div>
            <button className="text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:underline transition-all">
              View All Trips
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="aspect-[4/3] rounded-[2rem] bg-slate-100/50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center text-center p-6 transition-all hover:bg-slate-100 dark:hover:bg-white/[0.08] cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="text-slate-400 dark:text-slate-500" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                No trips saved yet.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-widest">
                Generate your first journey
              </p>
            </div>
          </div>
        </section>

        <section>
          <SuggestionsGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
}
