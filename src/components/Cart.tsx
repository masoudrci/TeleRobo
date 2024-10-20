import React from 'react';
import { Trash2, DollarSign, Home, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface CartProps {
  items: Product[];
  removeFromCart: (productId: number) => void;
  addToCart: (product: Product) => void;
  onCheckout: () => void;
  goHome: () => void;
}

const Cart: React.FC<CartProps> = ({ items, removeFromCart, addToCart, onCheckout, goHome }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 0 };
    }
    acc[item.id].quantity += 1;
    return acc;
  }, {} as Record<number, Product & { quantity: number }>);

  return (
    <div className="bg-navy rounded-lg shadow-md p-6 border border-gold">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gold">Your Cart</h2>
        <button onClick={goHome} className="text-gold hover:text-yellow-300">
          <Home size={24} />
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          {Object.values(groupedItems).map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b border-gray-600 py-2">
              <div>
                <h3 className="font-semibold text-white">{item.name}</h3>
                <p className="text-gray-300">${item.price.toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 mr-2"
                >
                  <Minus size={20} />
                </motion.button>
                <span className="text-white mx-2">{item.quantity}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(item)}
                  className="text-green-400 hover:text-green-600 ml-2"
                >
                  <Plus size={20} />
                </motion.button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold flex justify-between items-center">
            <span className="text-white">Total:</span>
            <span className="flex items-center text-gold">
              <DollarSign className="mr-1" size={20} />
              {total.toFixed(2)}
            </span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCheckout}
            className="mt-6 w-full bg-gold hover:bg-yellow-500 text-navy font-bold py-2 px-4 rounded"
          >
            Proceed to Checkout
          </motion.button>
        </>
      )}
    </div>
  );
};

export default Cart;