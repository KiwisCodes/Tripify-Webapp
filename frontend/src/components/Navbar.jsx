import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isDark, setIsDark] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className={`animate-slide-down fixed top-0 w-full z-50 border-b ${
                scrolled
                    ? 'border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-sm'
                    : 'border-transparent bg-white/70 dark:bg-slate-950/70'
            }`}
            style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-600">
                            Tripify
                        </span>
                    </div>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-500 dark:text-slate-400">
                        {['How it Works|#how-it-works', 'Product|#product', 'Reviews|#testimonials', 'Pricing|#pricing'].map((item) => {
                            const [label, href] = item.split('|');
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    className="relative group hover:text-indigo-600 dark:hover:text-cyan-400"
                                    style={{ transition: 'color 0.2s ease' }}
                                >
                                    {label}
                                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-indigo-500 rounded-full group-hover:w-full" style={{ transition: 'width 0.25s ease' }}></span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            aria-label="Toggle Dark Mode"
                            id="theme-toggle"
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
                            style={{ transition: 'background-color 0.2s ease' }}
                        >
                            {isDark ? (
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                        <button
                            className="hidden sm:block text-sm font-semibold px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-md hover:scale-105 active:scale-95"
                            style={{ transition: 'background-color 0.2s ease, transform 0.15s ease' }}
                        >
                            Sign Up Free
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
