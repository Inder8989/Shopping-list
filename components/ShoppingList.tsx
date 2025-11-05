
import React from 'react';
import { ShoppingListItem as ShoppingListItemType } from '../types';
import { ListItem } from './ListItem';

interface ShoppingListProps {
    items: ShoppingListItemType[];
    onToggleItem: (item: ShoppingListItemType) => void;
    onRemoveItem: (id: string) => void;
    onEditPrice: (item: ShoppingListItemType) => void;
    currency: string;
}

export const ShoppingList: React.FC<ShoppingListProps> = ({ items, onToggleItem, onRemoveItem, onEditPrice, currency }) => {
    return (
        <ul className="space-y-2">
            {items.map((item, index) => (
                <ListItem
                    key={item.id}
                    item={item}
                    onToggle={onToggleItem}
                    onRemove={onRemoveItem}
                    onEditPrice={onEditPrice}
                    index={index}
                    currency={currency}
                />
            ))}
        </ul>
    );
};