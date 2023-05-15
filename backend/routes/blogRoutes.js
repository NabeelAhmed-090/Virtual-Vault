import express from "express";
import {
  getBlogs,
  getBlog,
  createBlog,
  getAllBlogs,
  updateBlogApproval,
  getUserBlogs,
} from "../controllers/blogController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "frontend/public/Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", getBlogs);
router.get("/user_blogs/:id", getUserBlogs);
router.get("/all", getAllBlogs);
router.put("/update", updateBlogApproval);
router.get("/:id", getBlog);
router.post("/create", upload.single("image"), createBlog);

export default router;
