"use client"
import Image from 'next/image';
import React from 'react';
import amazonLogo from "@/public/amazon-logo.png";
import { FaLock } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/lib/products';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY)

const Checkout = () => {
    const router = useRouter()
    const cart = useSelector((store) => {
        return store.cart.cart;
    })

    let totalPrice = 0;
    cart.forEach((el) => {
        totalPrice += el.price * el.quantity;
    })

    // for payment with stripe
    const createStripeSession = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        const stripe = await stripePromise;
        const checkoutSession = await axios.post("/api/checkout-session", {
            items: cart,
            email: user?.email
        })

        // redirect to checkout session
        const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result?.error) {
            console.log(result.error.message)
        }
    }

    return (
        <div>
            <div className='border-gray-200 border-b'>
                <div className='w-[80%] mx-auto p-8 flex items-center justify-between '>
                    <div className='cursor-pointer' onClick={() => router.push("/")}>
                        <Image src={amazonLogo} height={150} width={150} alt='' />
                    </div>
                    <div>
                        <h1 className='font-bold text-2xl'>Checkout</h1>
                    </div>
                    <div className='text-gray-400'>
                        <FaLock size={"20px"} />
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-24'>
                <div>
                    <div className=' border-b border-gray-200 py-4'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold text-lg'>1. Delivery Address </h1>
                            <p className='text-sm'>
                                Kausik Bhaumik <br />
                                N-D5/1 <br />
                                Dwarik Jungle Road <br />
                                KONNAGAR, WEST BENGAL 712235 <br />
                                Add delivery instructions
                            </p>
                        </div>
                    </div>
                    <div className=' border-b border-gray-200 py-4'>
                        <div className='flex justify-between'>
                            <h1 className='font-bold text-lg'>2. Items and delivery </h1>
                        </div>
                        {cart.map((el) => {
                            return (
                                <div className='my-4'>
                                    <div className='flex'>
                                        <Image src={el.image} width={100} height={100} alt='...' />
                                        <div className='ml-4'>
                                            <h1 className='font-bold'>{el.title}</h1>
                                            <p className='text-2xl font-bold py-2'>${el.price}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='border border-gray p-4 mt-5 h-fit'>
                    <div>
                        <h1 className='font-bold text-xl mb-4'>Order Summary</h1>
                        <div className='text-xs'>
                            <div className='flex items-center justify-between mt-2'>
                                <p>Items</p>
                                <p>${totalPrice}</p>
                            </div>
                            <div className='flex items-center justify-between mt-2'>
                                <p>Delivery</p>
                                <p>$40.00</p>
                            </div>
                            <div className='flex items-center justify-between mt-2'>
                                <p>Total:</p>
                                <p>${totalPrice + 20}</p>
                            </div>
                            <div className='flex items-center justify-between mt-2'>
                                <p>Promotion Applied</p>
                                <p>-$20.00</p>
                            </div>
                            <div className='flex text-xl font-bold text-[#812704] py-2 border-t border-b border-gray-300 my-3'>
                                <h1>Order Total:</h1>
                                <h1>${totalPrice}</h1>
                            </div>
                        </div>
                        <button onClick={createStripeSession} className='bg-[#FFB014] w-full rounded-md px-4 py-1'>Place Your Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
