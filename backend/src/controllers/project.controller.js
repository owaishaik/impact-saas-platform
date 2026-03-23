import db from "../models/index.js";

const { Project, Startup } = db;

export const createProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const startup = await Startup.findOne({ where: { userId } });

    const project = await Project.create({
      ...req.body,
      startupId: startup.id,
    });

    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};