import React, { useEffect, useState } from "react";
import { Link, useRevalidator } from "react-router-dom";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { checkAccess } from "../middlewares/ownerMiddleware";
import customAPI from "../api";
import { toast } from "react-toastify";

const CardProduct = ({ product }) => {

    const {revalidate} = useRevalidator()

    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const verifyAccess = async () => {
            try {
                const hasAccess = await checkAccess();
                setIsOwner(hasAccess);
            } catch (error) {
                console.error("Error checking access:", error);
                setIsOwner(false);
            }
        };

        verifyAccess();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await customAPI.delete(`/products/${product._id}`);
            toast.info("Product deleted successfully");
            revalidate()
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="card bg-base-100 shadow-xl" key={product._id}>
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
                        {product.price
                            ? product.price.toLocaleString("us-US", {
                                  style: "currency",
                                  currency: "USD",
                              })
                            : "Loading..."}
                    </p>
                    <p>{product.description.substring(0, 50)}</p>
                    <div className="card-actions justify-end">
                        <Link
                            to={`/product/${product._id}`}
                            className="btn btn-primary"
                        >
                            Buy Now
                        </Link>
                    </div>
                    {isOwner ? (
                        <div className="flex justify-end gap-3 mt-3">
                            <Link
                                to={`/product/${product._id}/edit`}
                                className="btn btn-sm btn-secondary"
                            >
                                <FaPencilAlt />
                            </Link>
                            <button className="btn btn-sm btn-error" onClick={handleDelete}>
                                <FaTrash />
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default CardProduct;
