import React, { useState, useEffect, useCallback } from 'react';

export interface FilterState {
  selectedCategories: string[];
  priceRange: [number, number];
  minRating: number;
}

interface FilterPanelProps {
  categories: string[];
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  onFilterChange,
  onClearFilters,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    onFilterChange({ selectedCategories, priceRange, minRating });
  }, [selectedCategories, priceRange, minRating, onFilterChange]);

  // handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  // handle minimum price change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange(([, max]) => [Math.min(value, max), max]);
  };

  // handle maximum price change
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange(([min]) => [min, Math.max(value, min)]);
  };

  // handle clear filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setMinRating(0);
    onClearFilters();
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold mb-2">Filter Products</h3>

      {/* Category Filter */}
      <div className="mb-4">
        <h4 className="font-medium">Category</h4>
        {categories.map((category) => (
          <label key={category} className="block">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <h4 className="font-medium mb-2">Price Range (${priceRange[0]} - ${priceRange[1]})</h4>
        <div className="flex flex-col gap-2 w-[200px]">
          <label>Min</label>
          <input
            type="range"
            min={0}
            max={5000}
            value={priceRange[0]}
            onChange={handleMinPriceChange}
            className="w-full"
          />
          <label>Max</label>
          <input
            type="range"
            min={0}
            max={5000}
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Minimum Rating Filter */}
      <div className="mb-4">
        <h4 className="font-medium">Minimum Rating</h4>
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="border p-1 rounded"
        >
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}+
            </option>
          ))}
        </select>
      </div>

      {/* Clear Filters Button */}
      <button
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;
