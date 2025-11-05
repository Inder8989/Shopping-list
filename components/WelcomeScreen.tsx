import React from 'react';

const ShoppingCartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);

interface WelcomeScreenProps {
    isExiting: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ isExiting }) => {
    return (
        <div className={`fixed inset-0 bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center z-[100] ${isExiting ? 'animate-fade-out' : 'opacity-100'}`}>
            <div className="text-center">
                <div className="relative mb-6 animate-float">
                    <div className="absolute -inset-2 bg-primary-500 rounded-full opacity-20 blur-2xl"></div>
                     <ShoppingCartIcon className="relative w-24 h-24 text-primary-500" />
                </div>
               
                <h1 
                    className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-white opacity-0 animate-fade-in-up"
                    style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                >
                    Smart Shopping List
                </h1>
                <p 
                    className="mt-3 text-lg text-slate-500 dark:text-slate-400 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                >
                    Your intelligent assistant for grocery planning.
                </p>
            </div>
        </div>
    );
};