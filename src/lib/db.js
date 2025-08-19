import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

if (process.env.NODE_ENV !== "production") {
  (async () => {
    try {
      await db.query("SELECT 1");
      console.log("Conectado a la base de datos MySQL");
    } catch (err) {
      console.error("Error al conectar a la base de datos:", err);
    }
  })();
}
