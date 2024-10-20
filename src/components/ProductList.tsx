import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductListProps {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  showProductDetails: (product: Product) => void;
  searchTerm: string;
  cart: Product[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Trend Master EA",
    price: 199.99,
    description: "Advanced trend-following Expert Advisor for major currency pairs.",
    category: "Trend Following",
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"]
  },
  {
    id: 2,
    name: "Scalper Pro",
    price: 149.99,
    description: "High-frequency trading EA designed for quick profits in volatile markets.",
    category: "Scalping",
    images: ["https://images.unsplash.com/photo-1613442301239-ea2478101ea7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"]
  },
  {
    id: 3,
    name: "News Trader",
    price: 249.99,
    description: "EA that capitalizes on market movements during major economic news releases.",
    category: "News Trading",
    images: ["https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"]
  },
];

const ProductList: React.FC<ProductListProps> = ({ addToCart, removeFromCart, showProductDetails, searchTerm, cart }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const getQuantityInCart = (productId: number) => {
    return cart.filter(item => item.id === productId).length;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <div key={product.id} className="bg-navy rounded-lg shadow-md p-6 border border-gold">
          <Slider {...sliderSettings}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              </div>
            ))}
          </Slider>
          <h2 className="text-xl font-semibold mb-2 text-gold">{product.name}</h2>
          <p className="text-gray-300 mb-2">{product.description}</p>
          <p className="text-sm text-yellow-400 mb-4">Category: {product.category}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gold flex items-center">
              <DollarSign className="mr-1" size={20} />
              {product.price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <button
                onClick={() => showProductDetails(product)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Details
              </button>
              <div className="w-28 h-10 relative overflow-hidden">
                <AnimatePresence initial={false}>
                  {getQuantityInCart(product.id) > 0 ? (
                    <motion.div
                      key="quantity"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween', duration: 0.3 }}
                      className="absolute inset-0 flex"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-l flex-1 flex items-center justify-center"
                      >
                        <Minus size={20} />
                      </motion.button>
                      <span className="bg-gold text-navy font-bold py-2 px-3 flex items-center justify-center">
                        {getQuantityInCart(product.id)}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-r flex-1 flex items-center justify-center"
                      >
                        <Plus size={20} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="order"
                      initial={{ x: '-100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '-100%' }}
                      transition={{ type: 'tween', duration: 0.3 }}
                      onClick={() => addToCart(product)}
                      className="absolute inset-0 bg-gold hover:bg-yellow-500 text-navy font-bold py-2 px-4 rounded"
                    >
                      Order
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;