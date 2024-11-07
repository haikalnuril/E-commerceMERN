import axios from "axios";
import customAPI from "../api";
import { useEffect, useState } from "react";
import CardProduct from "../components/CardProduct";

const HomeView = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const { data } = await customAPI.get("/products/?limit=3");
            setProducts(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
        <div>
            <h1 className="text-3xl font-bold mb-3">All Product</h1>
            <hr className="mb-12"/>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map((product) => (
                <CardProduct product={product}/>
        ))}
        </div>
        </>
    );
};

export default HomeView;
