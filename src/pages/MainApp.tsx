import React, { useState, useCallback, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types/indexx';
import FilterPanel from '../components/FilterPanel';
import "../index.css";
import { sampleProducts } from '../data/sampleData';
import { useCart } from '../context/CartContext';
import CartDropdown from '../components/CartDropdown';
import { ShoppingCart } from 'lucide-react';

interface FilterState {
  selectedCategories: string[];
  priceRange: [number, number];
  minRating: number;
}

const MainApp: React.FC = () => {
  const { cartItems, dispatch } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // For mobile
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth); // Track screen width
  const [isDesktop, setIsDesktop] = useState(false); // Track whether it's desktop view

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsDesktop(window.innerWidth >= 1024); // Desktop if width is 1024px or more
    };

    // Set initial state based on screen size
    handleResize();
    
    // Attach resize listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleToggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleToggleFilters = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const isMobileOrTablet = screenWidth <= 768 && screenWidth >= 425; // Mobile/Tablet breakpoint for filter toggle

  return (
    <div className="relative p-4 max-w-screen-xl mx-auto">
      {/* Top Nav */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Products"
          className="p-2 border rounded w-full sm:max-w-sm"
          onChange={(e) => searchProducts(e.target.value)}
        />

        <div className="flex gap-3 items-center">
          {/* Toggle filter on mobile and tablet */}
          {(isMobileOrTablet) && (
            <button
              onClick={handleToggleFilters}
              className="sm:hidden border p-2 rounded-md text-sm text-gray-700"
            >
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={handleToggleCart}
            className="relative p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Cart */}
      {isCartOpen && (
        <div className="absolute top-20 right-4 z-50">
          <CartDropdown onClose={() => setIsCartOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filter Panel */}
        {(isFilterOpen || isDesktop) && (
          <div className="lg:sticky top-4 h-fit lg:block">
            <FilterPanel
              categories={
                [...new Set(sampleProducts.map((p) => p.category).filter(Boolean))] as string[]
              }
              onFilterChange={applyFilters}
              onClearFilters={clearFilters}
            />
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-gray-600 pl-4 pt-2">No Products available for that filter</div>
          ) : (
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
