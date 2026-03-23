import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Project from "./project.model.js";

const ProjectData = sequelize.define("ProjectData", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  vehiclesSold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  distanceTravelled: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Project.hasOne(ProjectData, { foreignKey: "projectId" });
ProjectData.belongsTo(Project, { foreignKey: "projectId" });

export default ProjectData;