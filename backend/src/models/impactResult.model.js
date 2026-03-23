import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Project from "./project.model.js";

const ImpactResult = sequelize.define("ImpactResult", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  ghgAvoided: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Project.hasOne(ImpactResult, { foreignKey: "projectId" });
ImpactResult.belongsTo(Project, { foreignKey: "projectId" });

export default ImpactResult;