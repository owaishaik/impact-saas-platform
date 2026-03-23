import db from "../models/index.js";
import { calculateGHG } from "../services/calculation.service.js";

const { ProjectData, ImpactResult, Project } = db;

export const addProjectData = async (req, res) => {
  try {
    const { projectId, vehiclesSold, distanceTravelled } = req.body;

    const project = await Project.findByPk(projectId);

    const data = await ProjectData.create({
      projectId,
      vehiclesSold,
      distanceTravelled,
    });

    // Calculate GHG
    const result = calculateGHG({
      vehicleType: project.vehicleType,
      vehiclesSold,
      distance: distanceTravelled,
    });

    // Save result
    const impact = await ImpactResult.create({
      projectId,
      ghgAvoided: result.ghgAvoided,
    });

    res.json({
      data,
      impact,
      breakdown: result,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};