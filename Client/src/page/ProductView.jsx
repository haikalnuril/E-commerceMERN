import { useLoaderData } from "react-router-dom";
import customAPI from "../api";
import Filter from "../components/Filter";
import CardProduct from "../components/CardProduct";

export const loader = async ({ request }) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
    ]);
    const { data } = await customAPI.get("/products", { params: params });
    const products = data.data;

    return { products, params };
};

const ProductView = () => {
    const { products } = useLoaderData();
    return (
        <>
            <Filter />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {!products.length ? (
                    <h1 className="text-xl font-bold mt-5">tidak ada product!</h1>
                ) : (
                    products.map((product) => (
                        <CardProduct product={product} key={product._id} />
                    ))
                )}
            </div>
        </>
    );
};

export default ProductView;
