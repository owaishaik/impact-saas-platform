import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: console.log, // Enable logging to debug
    ssl: process.env.DB_HOST?.includes('render.com') ? {
      require: true,
      rejectUnauthorized: false
    } : false,
    dialectOptions: {
      ssl: process.env.DB_HOST?.includes('render.com') ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
);

export default sequelize;