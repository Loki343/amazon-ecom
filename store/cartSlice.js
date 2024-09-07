import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cart: [],
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   // multiple actions goes in reducers
   reducers: {
      addToCart: (state, { type, payload }) => {
         const findId = state.cart.find((el) => {
            return el.id === payload.id;
         });
         if (findId) {
            state.cart = state.cart.map((el) => {
               return el.id === payload.id ? { ...el, quantity: el.quantity + 1 } : el;
            });
         } else {
            state.cart.push({ ...payload, quantity: 1 });
         }
      },
      incrementQuantity: (state, { type, payload }) => {
         state.cart = state.cart.map((el) => {
            return el.id === payload.id ? { ...el, quantity: el.quantity + 1 } : el;
         });
      },
      decrementQuantity: (state, { type, payload }) => {
         state.cart = state.cart.map((el) => {
            return el.id === payload.id ? { ...el, quantity: el.quantity - 1 } : el;
         });
      },
      removeFromCart: (state, { type, payload }) => {
         state.cart = state.cart.filter((el) => {
            return el.id !== payload;
         });
      },
      clearAllCart: (state) => {
         state.cart = []
      }
   },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearAllCart } = cartSlice.actions;
export default cartSlice.reducer;

// export const getCart = (store) => store.cart.cart;
