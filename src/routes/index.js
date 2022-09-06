import express from "express";
const router = express.Router();

import main_router from "./main.routes.js";
import users_router from "./users.routes.js";

router.use("/main", main_router);
router.use("/users", users_router);

export default router;
