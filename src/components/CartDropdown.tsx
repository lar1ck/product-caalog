import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { X } from 'lucide-react';

interface CartDropdownProps {
  onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ onClose }) => {
  const { cartItems, dispatch } = useCart();

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE', id });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-lg p-4 z-50 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Your Cart</h3>
        <button onClick={onClose} className="hover:text-red-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
      ) : (
        <div className="max-h-80 overflow-y-auto space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
            />
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-4">
          <button className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;