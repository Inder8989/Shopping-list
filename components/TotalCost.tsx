import React from 'react';

const DollarSignIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

interface TotalCostProps {
    total: number;
    currency: string;
}

export const TotalCost: React.FC<TotalCostProps> = ({ total, currency }) => {
    
    const formattedTotal = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency,
    }).format(total);
    
    return (
        <div className="mt-2 p-4 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/50 p-2 rounded-full">
                    <DollarSignIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">Total Cost</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Estimated cost of purchased items</p>
                </div>
            </div>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formattedTotal}
            </p>
        </div>
    );
};