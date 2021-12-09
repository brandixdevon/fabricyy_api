// This will load our .env file and add the values to process.env,
// IMPORTANT: Omit this line if you don't want to use this functionality
require("dotenv").config({ silent: true });

module.exports = {
  port: process.env.PORT || 1500,
  env: process.env.NODE_ENV || "development",
  pg_user: process.env.DB_USER || "postgres",
  pg_pw: process.env.DB_PASSWORD || "P@ssw0rd",
  pg_host: process.env.DB_HOST || "localhost",
  pg_port: process.env.DB_PORT || "5400",
  pg_db: process.env.DB_DATABASE || "fabricyy"
};