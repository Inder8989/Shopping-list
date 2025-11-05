
import React from 'react';

const ClipboardListIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <path d="M12 11h4"></path>
        <path d="M12 16h4"></path>
        <path d="M8 11h.01"></path>
        <path d="M8 16h.01"></path>
    </svg>
);


export const EmptyState: React.FC = () => {
    return (
        <div className="text-center py-10 px-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
            <ClipboardListIcon className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500" />
            <h3 className="mt-2 text-lg font-semibold text-slate-800 dark:text-slate-100">Your list is empty</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Add items above or import a recipe to get started!
            </p>
        </div>
    );
};
