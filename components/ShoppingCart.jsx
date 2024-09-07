"use client";
import { clearAllCart, decrementQuantity, incrementQuantity, removeFromCart } from '@/store/cartSlice';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const cart = useSelector((store) => {
        return store.cart.cart;
    })

    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleIncrement = (Prod) => {
        dispatch(incrementQuantity(Prod))
    }

    const handleDecrement = (Prod) => {
        if (Prod.quantity > 1) dispatch(decrementQuantity(Prod));
        else dispatch(removeFromCart(Prod.id))
    }

    let totalPrice = 0;
    cart.forEach((el) => {
        totalPrice += el.price * el.quantity;
    })

    return (
        <div className="flex justify-between">
            <div>
                <div className='flex justify-between items-center border-b border-gray-300'>
                    <h1 className='font-bold text-2xl'>Shopping Cart</h1>
                    <h1 className='font-medium '>Price</h1>
                </div>
                {
                    cart.map((el) => {
                        return (
                            <div key={el.id} className='flex justify-between py-4 border-b border-gray-200'>
                                <div className='flex'>
                                    <div>
                                        <Image src={el.image} height={100} width={100} alt={el.title} />
                                    </div>
                                    <div className='ml-4'>
                                        <h1 className='font-medium'> {el.title} </h1>
                                        <p className='text-[#007600] text-xs my-1'>In Stock</p>
                                        <h1 className='font-bold text-red-600 cursor-pointer' onClick={() => handleRemove(el.id)}>REMOVE</h1>
                                        <div className='flex text-xl my-2 font-medium justify-between items-center w-fit bg-gray-200 rounded-md px-5 py-1'>
                                            <div className='cursor-pointer mr-4' onClick={() => handleDecrement(el)}>-</div>
                                            <div>{el.quantity}</div>
                                            <div className='cursor-pointer ml-4' onClick={() => handleIncrement(el)}>+</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className='font-bold text-xl'>{el.price}</h1>
                                    <p className='text-xs line-through py-1'>M.R.P.:$3,995.00</p>
                                </div>
                            </div>
                        )
                    })
                }
                <h1 className='text-red-600 font-bold cursor-pointer mt-4' onClick={()=>dispatch(clearAllCart())}>REMOVE ALL</h1>
                <h1 className='text-right'>Subtotal ({cart.length} items) <span className='font-bold'> ${totalPrice}</span> </h1>
            </div>
            <div className='border border-gray-200 w-[25%] p-2 h-fit'>
                <span className='text-[#067C63] text-sm'>Your order is eligible for FREE Delivery.</span> Choose FREE Delivery option at checkout.
                <h1 className='text-center'>Subtotal ({cart.length} items) <span className='font-bold'> ${totalPrice}</span> </h1>
                <button onClick={() => router.push("/checkout")} className='bg-[#FEA41D] w-full rounded-full py-2 my-2'>Proceed to buy</button>
            </div>
        </div>
    )
}

export default ShoppingCart
