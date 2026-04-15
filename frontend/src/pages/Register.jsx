import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Mock Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Mock API call to Spring Boot backend
    // setTimeout(() => {
    //   // Mock token generation after registration
    //   const mockJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MockPayload.MockSignature_456';
    //   localStorage.setItem('tripify_token', mockJwt);
    //   // Redirect to dashboard
    //   navigate('/dashboard');
    // }, 500);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Left Image Section */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Start your journey today.</h2>
          <p className="text-lg text-slate-200">Unlock intelligent travel tools and curated itineraries instantly.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 py-10 md:px-16 lg:px-24 justify-between">
        <div className="flex justify-start">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tighter text-slate-900">Tripify</span>
          </Link>
        </div>

        <div className="flex-grow flex flex-col justify-center max-w-md w-full mx-auto my-12">
          <h1 className="text-3xl font-bold text-slate-950 mb-2">Create an Account</h1>
          <p className="text-slate-500 mb-8">Join Tripify to plan your next adventure.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light/30 focus:border-primary-light transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light/30 focus:border-primary-light transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light/30 focus:border-primary-light transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light/30 focus:border-primary-light transition-all shadow-sm"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 px-4 mt-2 bg-primary-dark hover:bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500">
            Already have an account? <Link to="/login" className="font-semibold text-primary-dark hover:text-indigo-600">Sign In</Link>
          </p>
        </div>

        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} Tripify. All rights reserved.
        </div>
      </div>
    </div>
  );
}
