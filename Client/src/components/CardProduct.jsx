import React from "react";

const CardProduct = ({ product }) => {
    return (
        <>
            <div className="card bg-base-100 shadow-xl" key={product.id}>
                <figure>
                    <img
                        className="max-h-[150px]"
                        src={product.image}
                        alt={product.name}
                    />
                </figure>
                <div className="card-body justify-between">
                    <h2 className="card-title">{product.name}</h2>
                    <p className="font-bold text-blue-400">
                        ${" "}
                        {product.price.toLocaleString("us-US", {
                            styles: "currency",
                            currency: "USD",
                        })}
                    </p>
                    <p>{product.description.substring(0, 50)}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardProduct;
