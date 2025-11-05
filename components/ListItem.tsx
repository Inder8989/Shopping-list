import React from 'react';
import { ShoppingListItem } from '../types';

const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

const EditIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);


interface ListItemProps {
    item: ShoppingListItem;
    onToggle: (item: ShoppingListItem) => void;
    onRemove: (id: string) => void;
    onEditPrice: (item: ShoppingListItem) => void;
    index: number;
    currency: string;
}

export const ListItem: React.FC<ListItemProps> = ({ item, onToggle, onRemove, onEditPrice, index, currency }) => {
    const animationDelay = `${index * 50}ms`;
    
    const formatCurrency = (value: number) => {
        try {
            return new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: currency
            }).format(value);
        } catch (e) {
            return `$${value.toFixed(2)}`; // Fallback
        }
    };

    return (
        <li
            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg animate-fade-in"
            style={{ animationDelay }}
        >
            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <button
                    onClick={() => onToggle(item)}
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                        item.purchased
                            ? 'bg-primary-600 border-primary-600'
                            : 'border-slate-300 dark:border-slate-500 hover:border-primary-500'
                    }`}
                    aria-label={item.purchased ? `Mark ${item.name} as not purchased` : `Mark ${item.name} as purchased`}
                >
                    {item.purchased && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
                <div className="flex-1 overflow-hidden">
                    <span
                        className={`font-medium text-slate-700 dark:text-slate-200 truncate block transition-all ${
                            item.purchased ? 'line-through text-slate-400 dark:text-slate-500' : ''
                        }`}
                    >
                        {item.name}
                    </span>
                    {item.quantity && (
                        <span className={`text-sm text-slate-500 dark:text-slate-400 truncate block transition-all ${
                            item.purchased ? 'line-through' : ''
                        }`}>
                            {item.quantity}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 ml-2">
                 {item.purchased && item.price != null && (
                    <button 
                        onClick={() => onEditPrice(item)} 
                        className="flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 px-2 py-1 rounded-md hover:bg-primary-200 dark:hover:bg-primary-900"
                    >
                        <span>{formatCurrency(item.price)}</span>
                        <EditIcon className="w-3 h-3" />
                    </button>
                )}
                <button
                    onClick={() => onRemove(item.id)}
                    className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    aria-label={`Remove ${item.name}`}
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
            </div>
        </li>
    );
};