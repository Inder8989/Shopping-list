import React from 'react';

const ShoppingCartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <div className="flex items-center justify-center gap-3">
                <ShoppingCartIcon className="w-10 h-10 text-primary-500" />
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white">
                    Smart Shopping List
                </h1>
            </div>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
                Your intelligent assistant for grocery planning.
            </p>
        </header>
    );
};