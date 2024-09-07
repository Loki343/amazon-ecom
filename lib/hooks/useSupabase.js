import { useState, useEffect } from "react";
import { supabase } from "../products";

export const useSupabase = () => {
   //for get all data
   const [products, setProducts] = useState([]);
   const getProducts = async () => {
      let { data, error } = await supabase.from("products").select("*");
      if (data) {
         setProducts(data);
      }
      if (error) {
         console.log(error);
      }
   };
   //for get only query search data
   const [filteredData, setFilteredData] = useState([]);
   const getFilteredData = async (query) => {
      let { data, error } = await supabase
         .from("products")
         .select("*")
         .or(
            `title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
         );
      if (data) {
         setFilteredData(data);
      }
      if (error) {
         console.log(error);
      }
   };
   //for get single product
   const [singleProduct, setSingleProduct] = useState([]);
   const getSingleProduct = async (id) => {
      let { data, error } = await supabase
         .from("products")
         .select("*")
         .eq("id", id);
      if (data) {
         setSingleProduct(data);
      }
      if (error) {
         console.log(error);
      }
   };
   // get mens products
   const [mensProducts, setMensProducts] = useState([]);
   const getMensProducts = async () => {
      let { data, error } = await supabase.from("products").select("*").ilike("category", `men's clothing`)
      if (data) {
         setMensProducts(data);
      }
      if (error) {
         console.log(error);
      }
   };
   // get womens products
   const [womensProducts, setWomensProducts] = useState([]);
   const getWomensProducts = async (category) => {
      let { data, error } = await supabase.from("products").select("*").ilike("category", `women's clothing`)
      if (data) {
         setWomensProducts(data);
      }
      if (error) {
         console.log(error);
      }
   };

   return {
      products,
      getProducts,
      filteredData,
      getFilteredData,
      singleProduct,
      getSingleProduct,
      mensProducts,
      getMensProducts,
      womensProducts,
      getWomensProducts
   };
};
