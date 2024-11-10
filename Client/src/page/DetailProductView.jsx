import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import customAPI from "../api";
import { MdOutlineShoppingCart } from "react-icons/md";

const DetailProduct = () => {
    let { id } = useParams();
    const [product, setProduct] = useState({});

    const productData = async () => {
        try {
            const response = await customAPI.get(`/products/${id}`);
            setProduct(response.data.data);
        } catch (err) {
            setError("Error fetching product data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        productData();
    }, []);

    console.log(product);
    return (
        <>
            <div
                className="card lg:card-side bg-base-300 shadow-xl"
                key={product._id}
            >
                <figure>
                    <img src={product.image} alt={product.name} className="w-[400px] h-[500px] object-cover" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <span className="text-3xl text-accent font-bold mt-2">
                        $ {product.price}
                    </span>
                    <span className="badge badge-primary">{product.category}</span>
                    <span className="font-bold">
                        Stock : {product.stock}
                    </span>
                    <p>{product.description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary"><MdOutlineShoppingCart /> Keranjang</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailProduct;
