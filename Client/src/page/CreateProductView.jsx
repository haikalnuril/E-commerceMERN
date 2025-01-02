import React, { useState } from "react";
import FormInput from "../components/Form/FormInput";
import FormSelect from "../components/Form/FormSelect";
import FormTextarea from "../components/Form/FormTextarea";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import customAPI from "../api";

const CreateProductView = () => {
    const categories = ["shoes", "clothes", "tshirt", "pants"];
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        const dataForm = new FormData(e.target)

        const data = Object.fromEntries(dataForm)
        
        try {
            setLoading(true)
            const responseProduct = await customAPI.post("/products", {
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                category: data.category
            })

            console.log(responseProduct)

            const idProduct = responseProduct.data.data.product._id

            const responseFileUpload = await customAPI.post(`/products/file-upload/${idProduct}`, {
                image: data.image
            },{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            toast.success("success create new product")
            navigate("/products")
        } catch (error) {
            toast.error( error?.response?.data?.message || "internal server error")
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
            <label className="form-control">
                <label className="label">
                    <span className="label-text capitalize">Image</span>
                </label>
                <input type="file" name="image" className="file-input file-input-bordered w-full max-w-xs" />
            </label>
            <FormSelect
                name="category"
                label="Choose Category"
                list={categories}
            />
            <FormInput name="name" label="Product Name" type="text" />
            <FormInput name="price" label="Price" type="number" />
            <FormInput name="stock" label="Stock Product" type="number" />
            <FormTextarea name="description" label="Description" />
            <button type="submit" className="btn btn-primary btn-block mt-5 btn-md">
                {loading ? (<span className="loading loading-dots loading-sm"></span>) : ("Create Product")}
            </button>
        </form>
    );
};

export default CreateProductView;
