import express from "express";
const router = express.Router();

import auth_router from "./auth.routes.js";
import goal_router from "./goal.routes.js";
import video_router from "./video.routes.js";

router.use("/auth", auth_router);
router.use("/goals", goal_router);
router.use("/videos", video_router);

export default router;
