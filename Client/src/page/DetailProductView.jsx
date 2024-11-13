import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import customAPI from "../api";
import { MdOutlineShoppingCart } from "react-icons/md";
import { generateSelectAmount } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

const DetailProduct = () => {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [amount, setAmount] = useState(1);

    const dispatch = useDispatch();

    const productCart = {
        cartId: product._id + product.name,
        productId: product._id,
        image: product.image,
        name: product.name,
        price: product.price,
        stock: product.stock,
        amount
    }

    const handleAmount = (e) => {
        setAmount(parseInt(e.target.value));
    };

    const handleCart = () => {
        dispatch(addItem({product: productCart}));
    };

    const productData = async () => {
        try {
            const response = await customAPI.get(`/products/${id}`);
            setProduct(response.data.data);
        } catch (err) {
            setError("Error fetching product data");
        }
    };

    useEffect(() => {
        productData();
    }, []);

    useEffect(() => {
        document.title = product.name;
    }, [product]);

    console.log(product.name);
    return (
        <>
            <div
                className="card lg:card-side bg-base-300 shadow-xl"
                key={product._id}
            >
                <figure>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-[400px] h-[500px] object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <span className="text-3xl text-accent font-bold mt-2">
                        {product.price
                            ? product.price.toLocaleString("us-US", {
                                style: "currency",
                                currency: "USD",
                            })
                            : "Loading..."}
                    </span>
                    <span className="badge badge-primary">
                        {product.category}
                    </span>
                    <span className="font-bold">Stock : {product.stock}</span>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <div className="p-8 flex flex-col gap-y-4">
                            <label className="form-control">
                                <label className="label">
                                    <span className="capitalize label-text">
                                        Amount
                                    </span>
                                </label>
                                <select
                                    name="amount"
                                    id="amount"
                                    className="select select-bordered"
                                    onChange={handleAmount}
                                >
                                    {generateSelectAmount(product.stock)}
                                </select>
                            </label>
                            <button
                                className="btn btn-primary"
                                onClick={handleCart}
                            >
                                <MdOutlineShoppingCart /> Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailProduct;
