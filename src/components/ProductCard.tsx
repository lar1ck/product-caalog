import React from 'react'
import { Product } from '../types/indexx';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'
// import { Link } from 'react-router-dom';

interface productCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}


const ProductCard: React.FC<productCardProps> = ({ product, onAddToCart }) => {
    const navigate = useNavigate();
    return (
        <div className='w-[320px] h-auto px-1 '>
            <div
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer relative group overflow-hidden rounded-md"
            >
                <img
                    src={product.image || '../../public/fallback.jpg'}
                    className="h-[300px] w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    alt={product.name}
                />
            </div>
            <div className="pt-3 flex justify-between">
                <div>
                    <p className="font-bold text-orange-800">{/* Category */}{/*Lifestyle*/} {product.category}</p>
                    <p className="font-bold">{/* Product Name */}{/*Nike 930 xr*/} {product.name}</p>
                    <p className=' text-gray-600'>{/*Descrption*/}{product.description}</p>
                    <p className="font-semibold text-gray-600">{/* Product Price */}${product.price}</p>
                </div>
                <div className="">
                    {'⭐'.repeat(Math.floor(product.rating))}
                </div>
            </div>
            <div className='flex w-full justify-between'>
                <div>
                    
                </div>
                <button
                    onClick={() => onAddToCart(product)}
                    className=" mt-2 mb-1  py-1 hover:rounded-md duration-300">
                    <ShoppingCart />
                </button>
            </div>
        </div>
    )
}

export default ProductCard;