import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "storeadmin",
  password: process.env.DB_PASS || "Alpha@24xSecure1!",
  database: process.env.DB_NAME || "store",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
