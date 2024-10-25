import product from '../models/productModel.js';
// import jwt from 'jsonwebtoken';
import asyncHandler from '../middlewares/asyncHandler.js';

export const createProduct = asyncHandler(async (req, res) => {
    const newProduct = await product.create(req.body);

    res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: {
            product: newProduct
        }
    })
})

export const allProducts = asyncHandler(async (req, res) => {
    const queryObj = { ...req.query };

    //fungsi untuk mengabaikan req.query.page dan limit
    const excludedFields = ['page', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = product.find(queryObj);

    //pagination
    const page = req.query.page * 1 || 1;
    const limitData = req.query.limit * 1 || 10;
    const skipData = (page-1) * limitData

    query = query.skip(skipData).limit(limitData);

    if(req.query.page) {
        const totalData = await product.countDocuments();
        if(skipData >= totalData) {
            throw new Error("This page does not exist");
        }
    }

    const data = await query;

    res.status(200).json({
        status: "success",
        message: "All products",
        data
    })
})

export const detailProduct = asyncHandler(async (req, res) => {
    const productDetail = await product.findById(req.params.id);

    if (!productDetail) {
        res.status(404).json({
            status: "failed",
            message: "Product not found"
        })
    }

    res.status(200).json({
        status: "success",
        message: "Product detail",
        data: {
            product: productDetail
        }
    })
})

export const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, stock } = req.body;
    
    const updateProduct = await product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        description,
        image,
        category,
        stock
    });

    if (!updateProduct) {
        res.status(404).json({
            status: "failed",
            message: "Product not found"
        })
    }

    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: {
            updateProduct
        }
    })
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const deleteProduct = await product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
        res.status(404).json({
            status: "failed",
            message: "Product not found"
        })
    }

    res.status(200).json({
        status: "success",
        message: "Product deleted successfully"
    })
})

export const fileUpload = asyncHandler(async (req, res) => {
    const file = req.file;

    if(!file) {
        res.status(400);
        throw new Error("Please upload a file");
    }

    const imageFileName = file.filename;
    const pathImageFile = `/uploads/${imageFileName}`;

    res.status(201).json({
        status: "success",
        message: "File uploaded successfully",
        data: {
            image: pathImageFile
        }
    })
})
