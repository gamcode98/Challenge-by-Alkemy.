require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  email: process.env.EMAIL,
};

module.exports = { config };
