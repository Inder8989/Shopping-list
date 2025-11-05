import React, { useState, useRef, useEffect } from 'react';
import { Theme } from '../hooks/useAppSettings';

const CalendarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const PaletteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.47-1.125-.29-.289-.47-.688-.47-1.125 0-.437.18-.835.47-1.125.29-.289.47-.688.47-1.125 0-.437-.18-.835-.47-1.125-.29-.289-.47-.688-.47-1.125 0-.437.18-.835.47-1.125.29-.289.47-.688.47-1.125 0-.942.722-1.688 1.648-1.688.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.47-1.125-.29-.289-.47-.688-.47-1.125 0-.437.18-.835.47-1.125.29-.289.47-.688.47-1.125C22 6.5 17.5 2 12 2z"></path>
    </svg>
);

const GlobeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);


interface TopBarProps {
    shoppingDate: string | null;
    setShoppingDate: (date: string | null) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    currency: string;
    setCurrency: (code: string) => void;
}

const themes: { name: Theme, color: string }[] = [
    { name: 'indigo', color: 'bg-indigo-500' },
    { name: 'emerald', color: 'bg-emerald-500' },
    { name: 'rose', color: 'bg-rose-500' },
];

const currencies: { code: string; name: string }[] = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
];

export const TopBar: React.FC<TopBarProps> = ({ shoppingDate, setShoppingDate, theme, setTheme, currency, setCurrency }) => {
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const themeMenuRef = useRef<HTMLDivElement>(null);
    const currencyMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
                setIsThemeOpen(false);
            }
            if (currencyMenuRef.current && !currencyMenuRef.current.contains(event.target as Node)) {
                setIsCurrencyOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShoppingDate(e.target.value || null);
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 z-40">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                <div className="relative flex items-center">
                    <label htmlFor="shopping-date" className="cursor-pointer">
                        <CalendarIcon className="w-5 h-5 text-slate-500" />
                    </label>
                    <input
                        id="shopping-date"
                        type="date"
                        value={shoppingDate || ''}
                        onChange={handleDateChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                     <span className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                        {shoppingDate ? new Date(shoppingDate + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Set Shopping Date'}
                    </span>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="relative" ref={currencyMenuRef}>
                        <button 
                            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} 
                            className="flex items-center gap-1 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Change currency"
                        >
                            <GlobeIcon className="w-5 h-5 text-slate-500" />
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{currency}</span>
                        </button>
                        {isCurrencyOpen && (
                             <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-2 animate-fade-in z-10" style={{animationDuration: '150ms'}}>
                               <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 mb-1">Currency</p>
                                <div className="max-h-60 overflow-y-auto">
                                {currencies.map(c => (
                                    <button
                                        key={c.code}
                                        onClick={() => { setCurrency(c.code); setIsCurrencyOpen(false); }}
                                        className={`w-full text-left flex items-center justify-between gap-3 px-2 py-1.5 rounded-md text-sm transition-colors ${
                                            currency === c.code 
                                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400 font-semibold' 
                                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        <span>{c.name}</span>
                                        <span className="font-mono text-xs text-slate-400 dark:text-slate-500">{c.code}</span>
                                    </button>
                                ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative" ref={themeMenuRef}>
                        <button 
                            onClick={() => setIsThemeOpen(!isThemeOpen)} 
                            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Change theme"
                        >
                            <PaletteIcon className="w-5 h-5 text-slate-500" />
                        </button>
                        {isThemeOpen && (
                            <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-2 animate-fade-in" style={{animationDuration: '150ms'}}>
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-2 mb-1">Theme Color</p>
                                {themes.map(t => (
                                    <button
                                        key={t.name}
                                        onClick={() => { setTheme(t.name); setIsThemeOpen(false); }}
                                        className={`w-full text-left flex items-center gap-3 px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                            theme === t.name 
                                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400' 
                                                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        <span className={`w-4 h-4 rounded-full ${t.color}`}></span>
                                        <span className="capitalize">{t.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};