import { Link, useLoaderData } from "react-router-dom";
import customAPI from "../api";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { checkAccess } from "../middlewares/ownerMiddleware";

export const loader = async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customAPI.get("/products", { params: params });
    const products = data.data;
    const pagination = data.pagination;
    console.log(pagination);

    return { products, params, pagination };
};

const ProductView = () => {
    const [loading, setLoading] = useState(true);

    const { products, pagination } = useLoaderData();

    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const verifyAccess = async () => {
            try {
                const hasAccess = await checkAccess();
                setIsOwner(hasAccess);
                setLoading(false);
            } catch (error) {
                console.error("Error checking access:", error);
                setIsOwner(false);
            }
        };

        verifyAccess();
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <Filter />
                    {isOwner ? (
                        <div className="flex justify-end mt-4">
                            <Link
                                to="/product/create"
                                className="btn btn-secondary"
                            >
                                Add Product
                            </Link>
                        </div>
                    ) : (
                        <></>
                    )}
                    <h3 className="text-3xl text-primary font-bold text-right my-3">
                        Total : {pagination.totalProduct} Products
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {!products.length ? (
                            <h1 className="text-xl font-bold mt-5">
                                tidak ada product!
                            </h1>
                        ) : (
                            products.map((product) => (
                                <CardProduct
                                    product={product}
                                    key={product._id}
                                />
                            ))
                        )}
                    </div>
                    <div className="mt-5 flex justify-center">
                        <Pagination />
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-center items-center h-[50vh] mt-10">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductView;
