import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env") });

const config = {
    development: {
        username: process.env.DB_ID,
        password: process.env.DB_PW,
        database: process.env.DB,
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
        timezone: "+09:00",
        dialectOptions: {
            dateStrings: true,
            typeCast: true,
        },
        define: {
            timestamps: true,
        },
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false,
    },
};

export default config;
