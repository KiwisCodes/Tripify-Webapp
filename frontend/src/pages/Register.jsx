import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Apple, Globe, User } from "lucide-react";
import Reveal from "../components/ui/Reveal";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center font-sans bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30 px-4 sm:px-6">
      {/* Immersive Bright Background - Changed to 'fixed' to avoid scrolling glitches on small screens */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-90 dark:opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 dark:from-slate-950/40 dark:to-transparent" />
      </div>

      {/* Main Content Flex Wrapper - Pushes footer down, centers form */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-10">
        <Reveal animation="reveal-scale" className="w-full max-w-[500px]">
          {/* Glass Card - Tightened padding (p-6/10 instead of 8/12) */}
          <div className="glass-blur bg-white/80 dark:bg-slate-900/60 border border-white/40 dark:border-white/10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] dark:shadow-[0_32px_128px_-16px_rgba(0,0,0,0.7)] rounded-[2.5rem] p-6 md:p-10 backdrop-blur-2xl">
            {/* Brand Logo - Tightened bottom margin */}
            <div className="flex flex-col items-center text-center mb-8">
              <Link to="/" className="flex items-center gap-2 group mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400">
                  Tripify
                </span>
              </Link>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                Create Account
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-[15px]">
                Join the future of intelligent travel.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            {/* Form - Tightened vertical spacing (space-y-3 instead of 4) */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                    <User size={18} />
                  </div>
                  {/* Inputs - Changed from py-4 to py-3 */}
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-semibold text-slate-700 dark:text-slate-300 ml-1">
                    Confirm
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-4"
              >
                <div className="relative z-10 flex items-center justify-center gap-2 text-[15px]">
                  {isLoading ? (
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Social Auth - Tightened margin */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
              </div>
              <span className="relative z-10 px-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-transparent">
                or join with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-bold text-[13px] shadow-sm"
              >
                <Globe size={16} className="text-indigo-500" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-bold text-[13px] shadow-sm"
              >
                <Apple size={16} className="text-slate-900 dark:text-white" />
                Apple
              </button>
            </div>

            <p className="mt-8 text-center text-[14px] text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-indigo-600 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Reveal>
      </div>

      {/* Footer in flow for perfect appearance */}
      {/* <div className="w-full text-center pb-10 z-10">
        <p className="text-[11px] font-bold text-slate-600 dark:text-slate-500 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} TRIPIFY INTELLIGENCE · REDEFINING
          EXPLORATION
        </p>
      </div> */}
    </div>
  );
}
