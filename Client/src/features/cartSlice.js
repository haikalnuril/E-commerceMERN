import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
    CartItems: [],
    numItemsInCart: 0,
    cartTotal: 0

}

const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cart")) || defaultValue;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: getCartFromLocalStorage(),
    reducers:{
        addItem: (state, action) => {
            const {product} = action.payload;

            const item = state.CartItems.find((i) => i.cartId === product.cartId)
            if(item){
                item.amount += product.amount
            }else{
                state.CartItems.push(product)
            }

            state.numItemsInCart += product.amount
            state.cartTotal += product.amount * product.price

            localStorage.setItem("cart", JSON.stringify(state))

            toast.success("Product added to cart")
        },
        editItem: (state, action) => {
            const {cartId, amount} = action.payload

            const item = state.CartItems.find((i) => i.cartId === cartId)
            if(item){
                state.numItemsInCart += amount - item.amount
                state.cartTotal += amount * item.price - item.amount * item.price
                item.amount = amount
            }

            localStorage.setItem("cart", JSON.stringify(state))
            toast.info("Cart updated")
        },
        removeItem : (state, action) => {
            const {cartId} = action.payload

            const item = state.CartItems.find((i) => i.cartId === cartId)
            state.CartItems = state.CartItems.filter((i) => i.cartId !== cartId)
            state.numItemsInCart -= item.amount
            state.cartTotal -= item.amount * item.price

            localStorage.setItem("cart", JSON.stringify(state))
            toast.success("Product removed from cart")
        }
    }
})

export const { addItem, editItem, removeItem } = cartSlice.actions
export default cartSlice.reducer