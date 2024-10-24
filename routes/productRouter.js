import express from "express";
import { protectedMiddleware, ownerMiddleware } from "../middlewares/authMiddleware.js";
import {
    createProduct,
    allProducts,
    detailProduct,
    updateProduct,
    deleteProduct,
    fileUpload,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", protectedMiddleware, ownerMiddleware, createProduct);
router.get("/", allProducts);
router.get("/:id", detailProduct);
router.put("/:id", protectedMiddleware, ownerMiddleware, updateProduct);
router.delete("/:id", protectedMiddleware, ownerMiddleware, deleteProduct);
router.post("/upload", fileUpload);

export default router;
