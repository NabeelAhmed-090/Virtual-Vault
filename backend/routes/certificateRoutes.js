import express from "express";
import {
  getCertificate,
  getUserCertificate,
  grantCertificate,
} from "../controllers/certificateController.js";

const router = express.Router();

router.get("/:id", getCertificate);
router.get("/user_certificates/:id", getUserCertificate);
router.post("/grant", grantCertificate);

export default router;
