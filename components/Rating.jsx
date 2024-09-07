import React, { Fragment } from 'react';
import ratingImg from "../public/star-icon.png"
import Image from 'next/image';

const Rating = ({ product }) => {
    const rating = JSON.parse(product.rating);
    return (
        <div className='flex items-center gap-1'>
            {
                Array(Math.round(rating.rate)).fill(1).map((_, idx) => (
                    <Image src={ratingImg} height={20} width={20} alt='star' key={idx} />
                ))
            }
            <h1 className='ml-2 font-medium text-[#007185]'>{rating.count} ratings</h1>
        </div>
    )
}

export default Rating;
