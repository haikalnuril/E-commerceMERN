import React, { useEffect, useState } from "react";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextarea from "../components/Form/FormTextarea";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import customAPI from "../api";

const EditProductView = () => {
    const categories = ["shoes", "clothes", "tshirt", "pants"];
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});

    let { id } = useParams();

    const getProduct = async () => {
        try {
            const response = await customAPI.get(`/products/${id}`);
            setProduct(response.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Internal server error");
            console.error(error);
        }
    }

    useEffect(()=> {
        getProduct();
    }, [])

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData(e.target);
        const data = Object.fromEntries(dataForm);
        
        try {
            setLoading(true);
    
            // First update the product details
            const responseProduct = await customAPI.put(`/products/${id}`, {
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                category: data.category
            });
    
            const idProduct = responseProduct.data.data.updateProduct._id;
    
            const imageFile = e.target.image.files[0];
            if (imageFile) {
                const fileFormData = new FormData();
                fileFormData.append('image', imageFile);
                
                await customAPI.post(`/products/file-upload/${idProduct}`, fileFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            }
    
            toast.success("Success update product");
            navigate("/products");
    
        } catch (error) {
            toast.error(error?.response?.data?.message || "Internal server error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <img src={product.image} alt="" className="w-[20vw] mx-auto"/>
            <label className="form-control">
                <label className="label">
                    <span className="label-text capitalize">Image</span>
                </label>
                <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered w-full max-w-xs"
                />
            </label>
            <FormSelect
                name="category"
                label="Choose Category"
                list={categories}
            />
            <FormInput name="name" label="Product Name" type="text" defaultValue={product.name}/>
            <FormInput name="price" label="Price" type="number" defaultValue={product.price}/>
            <FormInput name="stock" label="Stock Product" type="number" defaultValue={product.stock} />
            <FormTextarea name="description" label="Description" defaultValue={product.description}/>
            <button
                type="submit"
                className="btn btn-primary btn-block mt-5 btn-md"
            >
                {loading ? (
                    <span className="loading loading-dots loading-sm"></span>
                ) : (
                    "Update Product"
                )}
            </button>
        </form>
    );
};

export default EditProductView;
