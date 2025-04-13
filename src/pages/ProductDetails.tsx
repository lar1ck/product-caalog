// import React from 'react';
import { sampleProducts } from '../data/sampleData';
import { useParams } from 'react-router-dom';
import { Product } from '../types/indexx';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();

  const product: Product | undefined = sampleProducts.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <div>
        Product not found
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: "ADD", product });
  };

  return (
    <div className="p-4 flex flex-col lg:flex-row gap-10">
      {/* Image Section */}
      <div
        style={{
          backgroundImage: `url(${product.image || '../../public/fallback.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="w-full lg:w-[40%] h-[350px] lg:h-[610px] rounded-lg mb-6 lg:mb-0 mx-auto lg:ml-20 border border-gray-400"
      ></div>

      {/* Product Details Section */}
      <div className="w-full lg:w-[40%] p-5 mx-auto">
        <p className="text-3xl lg:text-6xl font-bold text-gray-700">
          {product.name}
        </p>
        <p className="font-bold text-orange-900 mt-4 lg:mt-10 text-xl lg:text-2xl">
          {product.category}
        </p>
        <p className="mt-5 text-gray-700 text-sm lg:text-base">
          {product.description}
        </p>
        <p className="mt-5 text-gray-700 font-bold text-lg lg:text-xl">
          ${product.price}
        </p>
        <div className="mt-5">
          <button
            onClick={handleAddToCart}
            className="px-8 py-3 text-white font-bold bg-black border-2 border-white hover:border-black duration-[500ms] rounded-2xl w-full sm:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
