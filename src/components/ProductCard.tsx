import React from 'react'
import { Product } from '../types/indexx';

interface productCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<productCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className='w-[320px] h-auto px-1 '>
            <img src={product.image} className="h-[300px] w-full " />
            <div className="pt-3 flex justify-between">
                <div>
                    <p className="font-bold text-orange-800">{/* Category */}{/*Lifestyle*/} {product.category}</p>
                    <p className="font-bold">{/* Product Name */}{/*Nike 930 xr*/} {product.name}</p>
                    <p className=' text-gray-600'>{/*Descrption*/}{product.description}</p>
                    <p className="font-semibold text-gray-600">{/* Product Price */}${product.price}</p>
                </div>
                <div className="">
                    {'⭐'.repeat(Math.floor(product.rating))}
                    <p>
                        {/* {product.rating} */}
                    </p>
                </div>
            </div>
            <button
                onClick={() => onAddToCart(product)}
                className=" mt-2 mb-1 px-2 py-1 hover:rounded-md duration-300 border border-1 border-black">
                Add to Chart
            </button>
        </div>
    )
}

export default ProductCard;