import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const Footer = () => {
    const { ref } = useScrollReveal({ threshold: 0.2 });

    return (
        <footer ref={ref} className="reveal py-10 border-t border-gray-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 opacity-60 hover:opacity-100" style={{ transition: 'opacity 0.25s ease' }}>
                    <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className="font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-600">Tripify</span>
                    <span className="text-xs ml-3 text-gray-400">© 2026 Tripify Inc.</span>
                </div>
                <div className="flex gap-6 text-sm text-gray-400">
                    {['Twitter', 'Instagram', 'Privacy', 'Terms'].map((link) => (
                        <a
                            key={link}
                            href="#"
                            className="hover:text-indigo-500 hover:-translate-y-0.5 inline-block"
                            style={{ transition: 'color 0.2s ease, transform 0.2s ease' }}
                        >
                            {link}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
