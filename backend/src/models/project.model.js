import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Startup from "./startup.model.js";

const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleType: {
    type: DataTypes.ENUM("2W", "4W"),
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Startup.hasMany(Project, { foreignKey: "startupId" });
Project.belongsTo(Startup, { foreignKey: "startupId" });

export default Project;