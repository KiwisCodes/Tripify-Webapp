import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Apple, Globe } from "lucide-react";
import Reveal from "../components/ui/Reveal";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please provide both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('credits', res.data.remainingCredit);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center font-sans bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30 px-4 sm:px-6">
      {/* Immersive Bright Background - Fixed to avoid scrolling glitches */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-90 dark:opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-white/20 dark:from-slate-950/50 dark:to-transparent" />
      </div>

      {/* Main Content Flex Wrapper - Centers form and pushes footer down */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-10">
        <Reveal animation="reveal-scale" className="w-full max-w-[500px]">
          {/* Glass Card - Tightened padding to match Register form */}
          <div className="glass-blur bg-white/90 dark:bg-slate-900/70 border border-white/60 dark:border-white/10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_128px_-16px_rgba(0,0,0,0.6)] rounded-[2.5rem] p-6 md:p-10 backdrop-blur-3xl">
            {/* Brand Logo */}
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
                Welcome Back
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-[15px]">
                The world is waiting for your next move.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-medium animate-shake">
                {error}
              </div>
            )}

            {/* Form - Tightened vertical spacing to match Register */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-[13px] font-semibold text-slate-800 dark:text-slate-200 ml-1">
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
                    className="w-full pl-11 pr-4 py-3 bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-[13px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
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
                    className="w-full pl-11 pr-4 py-3 bg-white/60 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden mt-4"
              >
                <div className="relative z-10 flex items-center justify-center gap-2 text-[15px]">
                  {isLoading ? (
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Social Auth */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
              </div>
              <span className="relative z-10 px-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-transparent">
                or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-bold text-[13px] shadow-sm"
              >
                <Globe
                  size={16}
                  className="text-indigo-600 dark:text-indigo-400"
                />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-3 bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-bold text-[13px] shadow-sm"
              >
                <Apple size={16} className="text-slate-900 dark:text-white" />
                Apple
              </button>
            </div>

            <p className="mt-8 text-center text-[14px] text-slate-600 dark:text-slate-400">
              New to Tripify?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </Reveal>
      </div>

      {/* Footer - Pushed to bottom with mt-auto */}
      {/* <div className="relative z-10 w-full mt-auto pb-6 text-center">
        <p className="text-[10px] font-bold text-slate-600 dark:text-slate-500/70 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Tripify Intelligence · Redefining
          Exploration
        </p>
      </div> */}
    </div>
  );
}
