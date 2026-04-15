import React from 'react';
import { Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 pt-16 pb-8 px-4 md:px-8 -mx-4 md:-mx-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Brand */}
        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Tripify</h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Curating bespoke travel experiences for the modern global citizen through intelligent design.
          </p>
        </div>
        
        {/* Links */}
        <div className="md:w-1/3 flex gap-12 md:justify-center">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-primary-dark text-sm transition-colors">Tour Types</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-dark text-sm transition-colors">City Guides</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-dark text-sm transition-colors">AI Planner</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-primary-dark text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary-dark text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:w-1/3">
          <h3 className="font-semibold text-slate-900 mb-4">Newsletter</h3>
          <p className="text-slate-500 text-sm mb-4">Subscribe to our latest travel inspirations.</p>
          <div className="relative group">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/30 focus:border-primary-light transition-all shadow-sm"
            />
            <button className="absolute right-1 top-1 bottom-1 w-10 bg-primary-dark text-white rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-slate-200 mt-12 pt-8 text-center md:text-left text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} Tripify. All rights reserved.</p>
      </div>
    </footer>
  );
}
