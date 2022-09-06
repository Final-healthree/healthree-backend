import express from "express";
import * as main_controllers from "../controllers/main.controllers.js";
import { video_upload } from "../middlewares/s3.middlewares.js";
import {
    check_registerd,
    check_progress,
    check_progress_video,
    check_progress_fail,
} from "../validation/main.validation.js";

const router = express.Router();

router.post("/register", check_registerd, main_controllers.main_register);
router.get("/goal_day/:day", check_progress, main_controllers.find_goal_day);
router.post(
    "/video/:day",
    check_progress_video,
    video_upload.single("video"),
    main_controllers.video_register,
);
router.patch("/video/:day/fail", check_progress_fail, main_controllers.progress_fail);

export default router;
