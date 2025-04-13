import React, { useState, useCallback } from 'react';
import CartItem from '../components/CartItem';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types/indexx';
import FilterPanel from '../components/FilterPanel';
import "../index.css";
import { sampleProducts } from '../data/sampleData';
import { useCart } from '../context/CartContext';

interface FilterState {
  selectedCategories: string[];
  priceRange: [number, number];
  minRating: number;
}

const MainApp: React.FC = () => {
  const { cartItems, dispatch } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);

  const applyFilters = useCallback((filters: FilterState) => {
    const { selectedCategories, priceRange, minRating } = filters;
    const filtered = sampleProducts.filter((product) => {
      const inCategory =
        selectedCategories.length === 0 ||
        (product.category && selectedCategories.includes(product.category));
      const inPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const meetsRating = product.rating >= minRating;
      return inCategory && inPriceRange && meetsRating;
    });
    setFilteredProducts(filtered);
  }, []);

  const clearFilters = useCallback(() => {
    setFilteredProducts(sampleProducts);
  }, []);

  const searchProducts = (query: string) => {
    const filtered = sampleProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD', product });
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch({ type: 'REMOVE', id });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Products"
          className="p-2 border rounded w-full max-w-sm"
          onChange={(e) => searchProducts(e.target.value)}
        />
      </div>

      <div className="flex">
        <FilterPanel
          categories={
            [...new Set(sampleProducts.map((p) => p.category).filter(Boolean))] as string[]
          }
          onFilterChange={applyFilters}
          onClearFilters={clearFilters}
        />
        {filteredProducts.length === 0 ? (
          <div className='text-gray-600 pl-[300px]'>
            No Products available for that filter
          </div>
        ) : (
          <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        )}
      </div>

      <div className="mt-8">
        <h2 className="font-semibold text-xl">Your Cart</h2>
        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
