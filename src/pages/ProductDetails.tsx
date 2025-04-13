// import React from 'react'
import { sampleProducts } from '../data/sampleData'
import { useParams } from 'react-router-dom'
import { Product } from '../types/indexx'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const {dispatch} = useCart();

    const product: Product | undefined = sampleProducts.find(
        (p) => p.id === Number(id)
    );

    if (!product) {
        return (
            <div>
                Product not found
            </div>
        )
    }

    const handleAddToCart = () => {
        dispatch({ type: "ADD", product})
    }

    return (
        <div className='p-1 flex w-full gap-10'>
            {/* This is the image's div */}
            <div
                style={{
                    backgroundImage: `url(${product.image || '../../public/fallback.jpg'})`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat',
                }}
                className='w-[40%] h-[610px] rounded-lg ml-20 border border-gray-400 '>

            </div>
            <div className='w-[40%] h-[610px] p-5 '>
                <p className='text-6xl font-bold text-gray-700'>
                    {product.name}
                </p>
                <p className='font-bold text-orange-900 mt-10 text-2xl'>
                    {product.category}
                </p>
                <p className='mt-5 text-gray-700'>
                    {product.description}
                </p>
                <p className='mt-5 text-gray-700 font-bold'>
                    ${product.price}
                </p>
                <div className='mt-5'>
                    <button 
                    onClick={handleAddToCart} 
                    className='px-12 py-3 text-white font-bold bg-black border-2 border-white hover:border-black duration-[500ms] rounded-2xl'>
                        Add to chart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails