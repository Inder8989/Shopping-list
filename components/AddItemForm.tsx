import React, { useState } from 'react';

const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

interface AddItemFormProps {
    onAddItem: (name: string, quantity: string) => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddItem(name, quantity);
        setName('');
        setQuantity('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item name (e.g., Milk)"
                className="flex-grow w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                required
            />
            <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity (e.g., 1 gallon)"
                className="sm:w-48 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
            />
            <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-transform transform hover:scale-105"
            >
                <PlusIcon className="w-5 h-5" />
                <span>Add</span>
            </button>
        </form>
    );
};