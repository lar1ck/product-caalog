import React from 'react';

interface FilterPanelProps {
  categories: string[];
  filters: {
    categories: string[];
    maxPrice: number;
    minRating: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    categories: string[];
    maxPrice: number;
    minRating: number;
  }>>;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ categories, filters, setFilters }) => {
  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      {/* Category Filter */}
      <div>
        <h3 className="font-medium mb-2">Category</h3>
        {categories.map(cat => (
          <label key={cat} className="block text-sm">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mt-4">
        <h3 className="font-medium mb-2">Max Price: ${filters.maxPrice}</h3>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Minimum Rating */}
      <div className="mt-4">
        <h3 className="font-medium mb-2">Minimum Rating</h3>
        <input
          type="number"
          min="0"
          max="5"
          step="0.5"
          value={filters.minRating}
          onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <button
        onClick={() => setFilters({ categories: [], maxPrice: 500, minRating: 0 })}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;