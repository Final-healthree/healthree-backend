import express from "express";
import * as post_controller from "../3_layers/controllers/post.controller.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", auth_middleware, post_controller.get_posts);
router.get("/:post_id", auth_middleware, post_controller.get_post_detail);
router.post("/like/:post_id", auth_middleware, post_controller.like);
router.delete("/like/:post_id", auth_middleware, post_controller.dislike);

export default router;
