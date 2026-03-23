import app from "./app.js";
import db from "./models/index.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Start server first
    app.listen(PORT, () => {
      console.log(`🚀 Server running successfully on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}`);
      console.log(`🏠 Home route: http://localhost:${PORT}/`);
    });

    // Then try to connect to database
    console.log("Attempting to connect to database...");
    await db.sequelize.authenticate();
    console.log("✅ DB Connected successfully");

    await db.sequelize.sync({ alter: true });
    console.log("✅ Tables synced successfully");
    
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.log("⚠️  Server running without database connection");
  }
};

startServer();