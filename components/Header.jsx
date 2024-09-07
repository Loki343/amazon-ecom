'use client';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import amazonLogo from "../public/amazon-logo-2.webp";
import { BiCart } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { supabase } from "@/lib/products";

const itemList = [
   "All", "Fresh", "Amazon miniTV", "Sell", "Gift Cards", "Baby", "Buy Again", "Browsing History", "Amazon Pay", "Gift Ideas", "Health, Household & Personal Care"
];

const Header = () => {
   const [query, setQuery] = useState("");
   const router = useRouter();

   const cart = useSelector((store) => {
      return store.cart.cart;
   })

   const handleSearch = () => {
      router.push(`/search/${query}`);
   }

   const handleCart = () => {
      router.push("/cart");
   }

   const handleSignout = async () => {
      const { error } = await supabase.auth.signOut()
      router.push("/signin");
   }

   const [user, setUser] = useState({})
   useEffect(() => {
      const getUserData = async () => {
         const { data: user } = await supabase.auth.getUser();
         setUser(user)
      }
      getUserData()
   }, [])
   
   return (
      <>
         <div className="bg-[#131921] py-2 text-white top-0 sticky z-10">
            <div className="flex items-center justify-between w-[90%] mx-auto">
               <Link href={"/"} className="w-[10%]">
                  <Image height={150} width={150} src={amazonLogo} alt={"Logo"} />
               </Link>
               <div className="w-[60%] flex items-center">
                  <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className="w-full px-2 py-2 rounded-l-md text-black outline-none" placeholder="Search Amazon.in" />
                  <div onClick={handleSearch} className="bg-[#FEBD69] p-2 text-black rounded-r-md cursor-pointer">
                     <CgSearch size={"24px"} />
                  </div>
               </div>
               <div className="flex items-center w-[20%] justify-around">
                  <div className="cursor-pointer" onClick={() => router.push("/signin")}>
                     <h1 className="text-xs hover:underline">{user.user ? user.user?.identities[0]?.identity_data?.full_name : "Signin"}</h1>
                     <h1 className="font-medium text-sm">Account & Lists</h1>
                  </div>
                  <div>
                     <p className="text-xs">Returns</p>
                     <h1 className="font-medium text-sm">& Orders</h1>
                  </div>
                  <div className="cursor-pointer" onClick={handleCart}>
                     <p className="relative top-3 left-5">{cart.length}</p>
                     <div className="flex">
                        <div>
                           <BiCart size={40} />
                        </div>
                        <h1 className="mt-3">Cart</h1>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="bg-[#232F3E] w-full text-white p-2 flex justify-between items-center">
            <div>
               {
                  itemList.map((link, idx) => {
                     return (
                        <Link key={idx} href={`/${link}`} className="mx-1 hover:border border border-transparent hover:border-white p-1">
                           {link}
                        </Link>
                     )
                  })
               }
            </div>
            {user.user && <div className="mr-5">
               <h1 onClick={handleSignout} className="text-[#FEBD69] font-bold cursor-pointer hover:underline">Sign out</h1>
            </div>}
         </div>
      </>
   );
};

export default Header;
