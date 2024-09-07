"use client"
import { useSupabase } from '@/lib/hooks/useSupabase'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import CategoryWiseProduct from './CategoryWiseProduct'

const HomePage = () => {
  const { mensProducts, getMensProducts, womensProducts, getWomensProducts } = useSupabase()
  useEffect(() => {
    getMensProducts();
    getWomensProducts();
  }, [])

  return (
    <div>
      <Image style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)" }} src={"https://images-eu.ssl-images-amazon.com/images/G/31/img24hp/urec/hero/Under1499_Tallhero_3000x1200._CB568928188_.jpg"} width={10000} height={1000} alt='' />
      <div className='w-[80%] mx-auto grid grid-cols-4 gap-2 relative -top-72'>
        {
          mensProducts.map((el) => (
            <div>
              <CategoryWiseProduct data={el} />
            </div>
          ))
        }
        {
          womensProducts.map((el) => (
            <div>
              <CategoryWiseProduct data={el} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HomePage;
