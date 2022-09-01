import { sequelize } from "./src/models/index.js";
sequelize
    .sync({ force: true })
    .then(() => console.log("db connect"))
    .catch((err) => console.error(err));
