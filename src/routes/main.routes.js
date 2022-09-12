import express from "express";
import * as main_controllers from "../3_layers/controllers/main.controller.js";
import { video_upload } from "../middlewares/s3.middleware.js";
import {
    check_registerd,
    check_progress,
    check_progress_video,
    check_progress_fail,
} from "../validation/main.validation.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", auth, check_registerd, main_controllers.main_register);
router.get("/goal_day/:day", auth, check_progress, main_controllers.find_goal_day);
router.post(
    "/video/:day",
    auth,
    check_progress_video,
    video_upload.single("video"),
    main_controllers.video_register,
);
router.patch("/video/:day/fail", auth, check_progress_fail, main_controllers.progress_fail);

export default router;
