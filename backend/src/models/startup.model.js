import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const Startup = sequelize.define("Startup", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Startup, { foreignKey: "userId" });
Startup.belongsTo(User, { foreignKey: "userId" });

export default Startup;