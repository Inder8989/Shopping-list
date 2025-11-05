import React from 'react';

const ClipboardIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
);

const XCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
);


interface ActionButtonsProps {
    onClearList: () => void;
    onOpenRecipeModal: () => void;
    hasItems: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onClearList, onOpenRecipeModal, hasItems }) => {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onOpenRecipeModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 rounded-md hover:bg-primary-200 dark:hover:bg-primary-900 transition-colors"
                title="Import from Recipe"
            >
                <ClipboardIcon className="w-4 h-4" />
                <span>Import</span>
            </button>
            {hasItems && (
                 <button
                    onClick={onClearList}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50 rounded-md hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                    title="Clear List"
                >
                    <XCircleIcon className="w-4 h-4" />
                    <span>Clear</span>
                </button>
            )}
        </div>
    );
};