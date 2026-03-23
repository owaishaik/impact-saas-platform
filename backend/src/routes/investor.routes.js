import express from "express";
import { getDashboard } from "../controllers/investor.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("INVESTOR"),
  getDashboard
);

export default router;