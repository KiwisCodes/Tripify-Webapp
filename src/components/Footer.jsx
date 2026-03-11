import React from 'react';

const Footer = () => {
    return (
        <footer className="py-12 border-t border-gray-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2 opacity-50">
                    <div className="w-6 h-6 bg-gray-400 rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className="font-bold tracking-tighter">Trippy</span>
                    <span className="text-xs ml-4">© 2023 Trippy Inc. Built for adventurers.</span>
                </div>
                <div className="flex gap-6 text-sm text-gray-400">
                    <a className="hover:text-indigo-500" href="#">Twitter</a>
                    <a className="hover:text-indigo-500" href="#">Instagram</a>
                    <a className="hover:text-indigo-500" href="#">Privacy</a>
                    <a className="hover:text-indigo-500" href="#">Terms</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
