import express from "express";
import { protectedMiddleware } from "../middlewares/authMiddleware.js";
import {
    createProduct,
    allProducts,
    detailProduct,
    updateProduct,
    deleteProduct,
    fileUpload,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", allProducts);
router.get("/:id", detailProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/upload", fileUpload);

export default router;
