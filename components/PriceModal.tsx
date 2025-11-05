import React, { useState, useEffect } from 'react';
import { ShoppingListItem } from '../types';

interface PriceModalProps {
    item: ShoppingListItem | null;
    onClose: () => void;
    onSave: (price: number) => void;
    currency: string;
}

export const PriceModal: React.FC<PriceModalProps> = ({ item, onClose, onSave, currency }) => {
    const [price, setPrice] = useState('');
    const [currencySymbol, setCurrencySymbol] = useState('$');

    useEffect(() => {
        if (item) {
            setPrice(item.price ? String(item.price) : '');
        }
    }, [item]);

    useEffect(() => {
        try {
            const symbol = new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: currency,
                currencyDisplay: 'narrowSymbol'
            })
            .formatToParts(0)
            .find(part => part.type === 'currency')?.value;
            setCurrencySymbol(symbol || '$');
        } catch (e) {
            console.warn(`Could not determine symbol for currency: ${currency}. Defaulting to $.`);
            setCurrencySymbol('$');
        }
    }, [currency]);


    const handleSave = () => {
        const priceValue = parseFloat(price);
        if (!isNaN(priceValue) && priceValue >= 0) {
            onSave(priceValue);
        } else {
            // Optional: show an error for invalid input
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSave();
    };

    if (!item) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
            style={{animationDuration: '0.2s'}}
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                        Enter Price
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-3xl leading-none font-bold">&times;</button>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                    What was the price for:
                </p>
                <p className="font-semibold text-slate-700 dark:text-slate-200 mb-4 truncate">{item.name}</p>
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 dark:text-slate-400">{currencySymbol}</span>
                         <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-7 pr-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                            step="0.01"
                            min="0"
                            required
                            autoFocus
                        />
                    </div>
                   
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all"
                        >
                            Save & Mark Purchased
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};