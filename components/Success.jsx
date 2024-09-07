"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import successGif from "@/public/success-gif.gif"
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { clearAllCart } from '@/store/cartSlice'

const Success = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 3000)
        dispatch(clearAllCart())
    }, [])
    return (
        <div className='w-[30%] mx-auto'>
            <Image src={successGif} height={"100%"} width={"100%"} alt='...' />
            <p className='text-center font-bold '>Thank you for ordering!</p>
        </div>
    )
}

export default Success
