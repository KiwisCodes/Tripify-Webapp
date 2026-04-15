import React from 'react';
import Navbar from '../components/dashboard/Navbar';
import HeroSearch from '../components/dashboard/HeroSearch';
import DashboardMap from '../components/dashboard/DashboardMap';
import TourTypeGrid from '../components/dashboard/TourTypeGrid';
import SuggestionsGrid from '../components/dashboard/SuggestionsGrid';
import Footer from '../components/dashboard/Footer';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary-light/30">
      {/* Navigation */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16 space-y-16">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-stretch h-auto lg:h-[600px]">
          <HeroSearch />
          <DashboardMap />
        </section>

        {/* Tour Type Section */}
        <section>
          <TourTypeGrid />
        </section>

        {/* Tour Suggestion Section */}
        <section>
          <SuggestionsGrid />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
