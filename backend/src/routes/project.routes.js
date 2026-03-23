import express from "express";
import { createProject } from "../controllers/project.controller.js";
import { addProjectData } from "../controllers/dataCalculation.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorize("STARTUP"),
  createProject
);

router.post(
  "/data",
  authenticate,
  authorize("STARTUP"),
  addProjectData
);

export default router;