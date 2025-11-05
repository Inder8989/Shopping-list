import React, { useState, useCallback, Fragment } from 'react';
import { extractIngredientsFromRecipe } from '../services/aiService';
import { ShoppingListItem } from '../types';

const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2L14.39 8.36L21 9.61L16.32 14.24L17.61 21L12 17.77L6.39 21L7.68 14.24L3 9.61L9.61 8.36L12 2z"></path>
    </svg>
);


interface RecipeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddItems: (items: Omit<ShoppingListItem, 'id' | 'purchased'>[]) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, onAddItems }) => {
    const [recipeText, setRecipeText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [extractedItems, setExtractedItems] = useState<Omit<ShoppingListItem, 'id' | 'purchased'>[] | null>(null);

    const handleClose = () => {
        setRecipeText('');
        setIsLoading(false);
        setError(null);
        setExtractedItems(null);
        onClose();
    };

    const handleExtract = useCallback(async () => {
        if (!recipeText.trim()) {
            setError('Please paste a recipe first.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const items = await extractIngredientsFromRecipe(recipeText);
            setExtractedItems(items);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [recipeText]);

    const handleAddAll = () => {
        if (extractedItems) {
            onAddItems(extractedItems);
            handleClose();
        }
    };
    
    const handleBack = () => {
        setExtractedItems(null);
        setError(null);
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
            style={{animationDuration: '0.2s'}}
            onClick={handleClose}
        >
            <div
                className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                        {extractedItems ? 'Confirm Ingredients' : 'Import from Recipe'}
                    </h2>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-3xl leading-none font-bold">&times;</button>
                </div>

                {!extractedItems ? (
                    <Fragment>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Paste your recipe below and let AI's magic extract the ingredients for you!
                        </p>
                        <textarea
                            value={recipeText}
                            onChange={(e) => setRecipeText(e.target.value)}
                            placeholder="e.g., 2 cups flour, 1 cup sugar, 2 large eggs..."
                            className="w-full h-48 p-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                            disabled={isLoading}
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition"
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleExtract}
                                className="flex items-center justify-center gap-2 w-48 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isLoading || !recipeText.trim()}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : <SparklesIcon className="w-5 h-5" />}
                                <span>{isLoading ? 'Extracting...' : 'Extract Ingredients'}</span>
                            </button>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Review the ingredients below. Click "Add All" to add them to your list.
                        </p>
                        <ul className="h-48 overflow-y-auto space-y-2 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                            {extractedItems.length > 0 ? extractedItems.map((item, index) => (
                                <li key={index} className="flex justify-between items-center text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700/50 p-2 rounded">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-slate-500 dark:text-slate-400">{item.quantity}</span>
                                </li>
                            )) : (
                                <li className="text-center text-slate-500 dark:text-slate-400 p-4">No ingredients found.</li>
                            )}
                        </ul>
                         {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleBack}
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleAddAll}
                                className="flex items-center justify-center gap-2 w-36 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={extractedItems.length === 0}
                            >
                                Add All ({extractedItems.length})
                            </button>
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    );
};