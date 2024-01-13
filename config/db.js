import Sequelize from "sequelize";
import dotenv from 'dotenv'; // permite cargar las variables de entorno desde un archivo .env en una aplicación
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;

