import express from "express";
import { getSales } from "../controllers/salesControllers.js";

const router = express.Router();

router.get("/", getSales);

export default router;
