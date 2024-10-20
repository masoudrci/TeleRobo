import React from 'react';
import { DollarSign, Home, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductDetailsProps {
  product: Product;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  goHome: () => void;
  quantityInCart: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, addToCart, removeFromCart, goHome, quantityInCart }) => {
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
    <div className="bg-navy rounded-lg shadow-md p-6 border border-gold">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gold">{product.name}</h2>
        <button onClick={goHome} className="text-gold hover:text-yellow-300">
          <Home size={24} />
        </button>
      </div>
      <Slider {...sliderSettings}>
        {product.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={product.name} className="w-full h-64 object-cover rounded-md mb-4" />
          </div>
        ))}
      </Slider>
      <p className="text-gray-300 mb-4">{product.description}</p>
      <p className="text-sm text-yellow-400 mb-4">Category: {product.category}</p>
      <div className="flex justify-between items-center">
        <span className="text-3xl font-bold text-gold flex items-center">
          <DollarSign className="mr-1" size={24} />
          {product.price.toFixed(2)}
        </span>
        <div className="w-36 h-12 relative overflow-hidden">
          <AnimatePresence initial={false}>
            {quantityInCart > 0 ? (
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
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-l text-lg flex-1 flex items-center justify-center"
                >
                  <Minus size={24} />
                </motion.button>
                <span className="bg-gold text-navy font-bold py-3 px-4 text-lg flex items-center justify-center">
                  {quantityInCart}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(product)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-r text-lg flex-1 flex items-center justify-center"
                >
                  <Plus size={24} />
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
                className="absolute inset-0 bg-gold hover:bg-yellow-500 text-navy font-bold py-3 px-6 rounded text-lg"
              >
                Order
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;