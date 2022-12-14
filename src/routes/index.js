import express from "express";
const router = express.Router();

import auth_router from "./auth.routes.js";
import goal_router from "./goal.routes.js";
import video_router from "./video.routes.js";
import post_router from "./post.routes.js";
import comment_router from "./comment.routes.js";
import rank_router from "./rank.routes.js";

router.use("/auth", auth_router);
router.use("/goals", goal_router);
router.use("/videos", video_router);
router.use("/posts", post_router);
router.use("/comments", comment_router);
router.use("/rank", rank_router);

export default router;
