// routes/blogRouter.js
import express from "express";
import * as blogController from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // Pastikan middleware untuk token ada

const router = express.Router();

router.post("/", verifyToken, blogController.addBlog);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", verifyToken, blogController.updateBlog);
router.delete("/:id", verifyToken, blogController.deleteBlog);

export default router;
