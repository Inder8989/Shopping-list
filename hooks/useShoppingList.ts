
import { useState, useEffect, useCallback } from 'react';
import { ShoppingListItem } from '../types';

const STORAGE_KEY = 'shoppingList';

export const useShoppingList = () => {
    const [items, setItems] = useState<ShoppingListItem[]>(() => {
        try {
            const storedItems = window.localStorage.getItem(STORAGE_KEY);
            return storedItems ? JSON.parse(storedItems) : [];
        } catch (error) {
            console.error("Error reading from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }, [items]);

    const addItem = useCallback((name: string, quantity: string) => {
        if (!name.trim()) return;
        const newItem: ShoppingListItem = {
            id: crypto.randomUUID(),
            name: name.trim(),
            quantity: quantity.trim() || '1',
            purchased: false,
        };
        setItems(prevItems => [newItem, ...prevItems]);
    }, []);

    const addMultipleItems = useCallback((newItems: Omit<ShoppingListItem, 'id' | 'purchased'>[]) => {
        const itemsToAdd: ShoppingListItem[] = newItems.map(item => ({
            ...item,
            id: crypto.randomUUID(),
            purchased: false
        }));
        setItems(prevItems => [...itemsToAdd, ...prevItems]);
    }, []);

    const updateItem = useCallback((id: string, updates: Partial<Omit<ShoppingListItem, 'id'>>) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, ...updates } : item
            )
        );
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const clearList = useCallback(() => {
        setItems([]);
    }, []);

    return { items, addItem, updateItem, removeItem, clearList, addMultipleItems };
};