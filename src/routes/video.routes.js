import express from "express";
import * as video_controllers from "../3_layers/controllers/video.controller.js";
import * as video_exception_handler from "../middlewares/video.exception.middleware.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";
import { video_upload } from "../middlewares/s3.middleware.js";

const router = express.Router();

router.get("/mine", auth_middleware, video_controllers.get_my_videos);

router.post(
    "/:day",
    auth_middleware,
    video_exception_handler.video_register,
    video_upload.single("video"),
    video_controllers.video_register,
);

router.post(
    "/share/:goal_id",
    auth_middleware,
    video_exception_handler.video_share,
    video_controllers.video_share,
);

export default router;
