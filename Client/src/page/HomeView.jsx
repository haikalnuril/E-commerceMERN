import axios from "axios";
import customAPI from "../api";
import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
    const response = await customAPI.get("/products");
    const products = response.data.data;
    return { products };
}

const HomeView = () => {
    const { products } = useLoaderData()
    return (
        <>
        <div>
            <h1 className="text-3xl font-bold mb-3">All Product</h1>
            <hr className="mb-12"/>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
                <CardProduct product={product} key={product._id}/>
        ))}
        </div>
        </>
    );
};

export default HomeView;
