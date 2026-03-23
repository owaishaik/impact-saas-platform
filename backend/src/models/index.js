import sequelize from "../config/db.js";

import User from "./user.model.js";
import Startup from "./startup.model.js";
import Project from "./project.model.js";
import ProjectData from "./projectData.model.js";
import ImpactResult from "./impactResult.model.js";

const db = {
  sequelize,
  User,
  Startup,
  Project,
  ProjectData,
  ImpactResult,
};

export default db;