export interface Product {
    id: number,
    name: string,
    category?: string;
    price: number,
    rating: number,
    image: string,
    description: string
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;  // Optional field
    rating?: number;  // Optional field
    description?: string;  // Optional field
  }