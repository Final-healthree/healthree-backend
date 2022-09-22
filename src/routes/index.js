import express from "express";
const router = express.Router();

import auth_router from "./auth.routes.js";
import goal_router from "./goal.routes.js";
import video_router from "./video.routes.js";
import posts_router from "./post.routes.js";
import comments_router from "./comments.routes.js";

router.use("/auth", auth_router);
router.use("/goals", goal_router);
router.use("/videos", video_router);
router.use("/posts", video_router);
router.use("/comments", video_router);

export default router;
