import React from "react";
import { useSelector } from "react-redux";
import CartListItems from "./CartListItems";

const CartList = () => {
    const carts = useSelector((state) => state.cartState.CartItems);
    return (
        <>
            {carts.map((cart) => {
                return <CartListItems  key={cart.cartId} cartItem={cart} />;
            })}
        </>
    );
};

export default CartList;
