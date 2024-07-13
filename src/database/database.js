import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "railway", // Nombre de la base de datos
  "postgres", // Nombre de usuario
  "zSgqSuNGyrgeUTbkOKRqXeOdNfdWVzcK", // Contraseña
  {
    host: "monorail.proxy.rlwy.net", // Host de la base de datos en Railway
    dialect: "postgres", // Dialecto PostgreSQL
    port: 45482, // Puerto personalizado
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
