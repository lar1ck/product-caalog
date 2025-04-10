import React from 'react';
import type { CartItem } from '../types/indexx';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow mb-3">
      <img src={item.image} className="w-16 h-16 object-cover rounded bg-slate-400" />
      <div className="flex-1 ml-4">
        <h4 className="font-semibold text-sm">{item.name}</h4>
        <p className="text-xs text-gray-500">${item.price} × {item.quantity}</p>
        <div className="flex items-center mt-2">
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="px-2 py-1 bg-gray-200 rounded">-</button>
          <span className="mx-2 text-sm">{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
          <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500 hover:underline text-sm">Remove</button>
        </div>
      </div>
      <div className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;