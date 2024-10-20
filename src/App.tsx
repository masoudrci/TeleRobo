import React, { useState, useEffect } from 'react';
import { ShoppingCart, BarChart, Search, Home, ArrowLeft } from 'lucide-react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import SearchBar from './components/SearchBar';
import { Product } from './types';
import { TelegramWebApp } from './telegram';

const App: React.FC = () => {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
    setSelectedProduct(null);
  };

  const showProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowCart(false);
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    TelegramWebApp.openInvoice(total);
  };

  const goHome = () => {
    setShowCart(false);
    setSelectedProduct(null);
  };

  const goBack = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    } else if (showCart) {
      setShowCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="bg-navy text-white p-4 shadow-lg border-b border-gold">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {(showCart || selectedProduct) && (
              <button onClick={goBack} className="mr-4 text-gold hover:text-yellow-300">
                <ArrowLeft size={24} />
              </button>
            )}
            <h1 className="text-2xl font-bold flex items-center">
              <BarChart className="mr-2 text-gold" /> Expert Advisor Shop
            </h1>
          </div>
          <div className="flex items-center">
            <SearchBar setSearchTerm={setSearchTerm} />
            <button
              onClick={toggleCart}
              className="flex items-center bg-gold hover:bg-yellow-500 text-navy px-4 py-2 rounded ml-4"
            >
              <ShoppingCart className="mr-2" />
              Cart ({cart.length})
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {showCart ? (
          <Cart items={cart} removeFromCart={removeFromCart} addToCart={addToCart} onCheckout={handleCheckout} goHome={goHome} />
        ) : selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart}
            goHome={goHome} 
            quantityInCart={cart.filter(item => item.id === selectedProduct.id).length}
          />
        ) : (
          <ProductList 
            addToCart={addToCart} 
            removeFromCart={removeFromCart}
            showProductDetails={showProductDetails} 
            searchTerm={searchTerm}
            cart={cart}
          />
        )}
      </main>

      <footer className="bg-navy p-4 mt-8 border-t border-gold">
        <div className="container mx-auto text-center text-gold">
          &copy; 2024 Expert Advisor Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;