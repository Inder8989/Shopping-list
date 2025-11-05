import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { AddItemForm } from './components/AddItemForm';
import { ShoppingList } from './components/ShoppingList';
import { ProgressBar } from './components/ProgressBar';
import { ActionButtons } from './components/ActionButtons';
import { RecipeModal } from './components/RecipeModal';
import { useShoppingList } from './hooks/useShoppingList';
import { useAppSettings } from './hooks/useAppSettings';
import { EmptyState } from './components/EmptyState';
import { Confetti } from './components/Confetti';
import { ShoppingListItem } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PriceModal } from './components/PriceModal';
import { TotalCost } from './components/TotalCost';
import { TopBar } from './components/TopBar';

const App: React.FC = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [isExitingWelcome, setIsExitingWelcome] = useState(false);

    useEffect(() => {
        const exitTimer = setTimeout(() => {
            setIsExitingWelcome(true);
        }, 3000);

        const hideTimer = setTimeout(() => {
            setShowWelcome(false);
        }, 3500);

        return () => {
            clearTimeout(exitTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const {
        items,
        addItem,
        updateItem,
        removeItem,
        clearList,
        addMultipleItems
    } = useShoppingList();

    const {
        theme,
        setTheme,
        shoppingDate,
        setShoppingDate,
        currency,
        setCurrency,
    } = useAppSettings();

    const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
    const [itemToPrice, setItemToPrice] = useState<ShoppingListItem | null>(null);

    const completedItems = useMemo(() => items.filter(item => item.purchased).length, [items]);
    const totalItems = items.length;
    const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    const allItemsCompleted = totalItems > 0 && completedItems === totalItems;
    const totalCost = useMemo(() => items.reduce((sum, item) => sum + (item.price || 0), 0), [items]);

    const handleAddFromRecipe = (recipeItems: Omit<ShoppingListItem, 'id' | 'purchased' | 'price'>[]) => {
        addMultipleItems(recipeItems);
        setIsRecipeModalOpen(false);
    };

    const handleToggleItem = (item: ShoppingListItem) => {
        if (item.purchased) {
            updateItem(item.id, { purchased: false, price: undefined });
        } else {
            setItemToPrice(item);
        }
    };
    
    const handleEditPrice = (item: ShoppingListItem) => {
        setItemToPrice(item);
    };

    const handleSavePrice = (price: number) => {
        if (itemToPrice) {
            updateItem(itemToPrice.id, { purchased: true, price: price });
            setItemToPrice(null);
        }
    };

    if (showWelcome) {
        return <WelcomeScreen isExiting={isExitingWelcome} />;
    }

    return (
        <>
            <TopBar
                theme={theme}
                setTheme={setTheme}
                shoppingDate={shoppingDate}
                setShoppingDate={setShoppingDate}
                currency={currency}
                setCurrency={setCurrency}
            />
            <div className="min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 font-sans animate-fade-in">
                {allItemsCompleted && <Confetti />}
                <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 transition-colors duration-300">
                    <Header />
                    <main>
                        <AddItemForm onAddItem={addItem} />
                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between items-center gap-4">
                                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                                    Your List
                                </h2>
                                <ActionButtons 
                                    onClearList={clearList}
                                    onOpenRecipeModal={() => setIsRecipeModalOpen(true)}
                                    hasItems={items.length > 0}
                                />
                            </div>
                            <ProgressBar progress={progress} />
                            <TotalCost total={totalCost} currency={currency} />
                            {items.length > 0 ? (
                                <ShoppingList 
                                    items={items} 
                                    onToggleItem={handleToggleItem} 
                                    onRemoveItem={removeItem}
                                    onEditPrice={handleEditPrice}
                                    currency={currency}
                                />
                            ) : (
                                <EmptyState />
                            )}
                        </div>
                    </main>
                </div>
                <RecipeModal
                    isOpen={isRecipeModalOpen}
                    onClose={() => setIsRecipeModalOpen(false)}
                    onAddItems={handleAddFromRecipe}
                />
                <PriceModal
                    item={itemToPrice}
                    onClose={() => setItemToPrice(null)}
                    onSave={handleSavePrice}
                    currency={currency}
                />
            </div>
        </>
    );
};

export default App;