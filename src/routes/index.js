import express from "express";
const router = express.Router();

import main_router from "./main.routes.js";

router.use("/main", main_router);

export default router;
