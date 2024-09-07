import Image from 'next/image';
import React from 'react';
import Rating from './Rating';
import AddToCartContainer from './AddToCartContainer';

const SingleProduct = ({ singleProduct }) => {
    return (
        <div className='w-[90%] mx-auto mt-10'>
            <div className='flex justify-between'>

                {singleProduct.map((el) => (
                    <div className='flex'>
                        <div className='flex'>
                            <div className='bg-gray-100 h-fit'>
                                <Image src={el.image} width={200} height={200} alt={el.title} className='mix-blend-multiply p-4' />
                            </div>
                            <div className='mx-auto w-[70%]'>
                                <h1 className='font-bold text-lg'>{el.title}</h1>
                                <p>{el.description.substring(0, 50)}...</p>
                                <Rating product={el} />
                                <h1 className='font-bold text-2xl'>${el.price}</h1>
                                <div>
                                    <h1 className='font-bold'>About this item :</h1>
                                    <li>{el.description}</li>
                                    <li>{el.description}</li>
                                    <li>{el.description}</li>
                                </div>
                            </div>
                        </div>
                        <AddToCartContainer product={el} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleProduct;
