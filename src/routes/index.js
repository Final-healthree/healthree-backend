import express from "express";
const router = express.Router();

import main_router from "./main.routes.js";
import auth_router from "./auth.router.js";

router.use("/main", main_router);
router.use("/auth", auth_router);

export default router;
