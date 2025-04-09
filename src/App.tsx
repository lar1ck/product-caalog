import React, { useState, useContext, createContext } from 'react';
import CartItem from './components/CartItem';
import ProductGrid from './components/ProductGrid'; // Import ProductGrid component
import { CartItem as CartItemType, Product } from './types/indexx'; // Import both CartItem and Product

const CartContext = createContext<{
  cart: CartItemType[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (product: Product) => {
    const newItem: CartItemType = { ...product, quantity: 1 }; // Set default quantity of 1
    setCart((prevCart) => [...prevCart, newItem]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Sample product data (you would probably fetch this from an API or backend)
const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'T-shirt',
    price: 20.99,
    image: 'https://via.placeholder.com/150',
    category: 'Clothing',
    rating: 4.5,
    description: 'A comfortable cotton t-shirt',
  },
  {
    id: 2,
    name: 'Laser mouse 23XX',
    price: 1999,
    image: "https://via.placeholder.com/600/24f355",
    category: 'Electronics',
    rating: 3,
    description: 'High quality mouse',
  },
  // Add more products as needed
];

const App: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);

  // Handle product filtering logic (e.g., by category or price range)
  const filterProducts = (category: string) => {
    const filtered = sampleProducts.filter((product) =>
      product.name.toLowerCase().includes(category.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="container mx-auto">
      {/* Product filtering */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Products"
          className="p-2 border rounded"
          onChange={(e) => filterProducts(e.target.value)}
        />
      </div>

      {/* Product List - Using ProductGrid Component */}
      <ProductGrid products={filteredProducts} onAddToCart={addToCart} />

      {/* Cart Section */}
      <div className="mt-8">
        <h2 className="font-semibold text-xl">Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const Root: React.FC = () => (
  <CartProvider>
    <App />
  </CartProvider>
);

export default Root;
