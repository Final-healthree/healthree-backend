import express from "express";
const router = express.Router();

import video_router from "./video.routes.js";
import goal_router from "./goal.routes.js";
import auth_router from "./auth.routes.js";

router.use("/videos", video_router);
router.use("/goals", goal_router);
router.use("/auth", auth_router);

export default router;
