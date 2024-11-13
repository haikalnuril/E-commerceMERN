import React from "react";
import { useSelector } from "react-redux";

const CartTotal = () => {
    const { cartTotal } = useSelector((state) => state.cartState);
    return (
        <div className="card bg-base-300">
            <div className="card-body">
                <p className="flex justify-between text-sm pb-2">
                    <span>Total</span>
                    <span className="font-bold">
                        {cartTotal
                            ? cartTotal.toLocaleString("us-US", {
                                style: "currency",
                                currency: "USD",
                              })
                            : "Loading..."}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default CartTotal;
