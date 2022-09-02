import express from "express";
import * as main_controllers from "../controllers/main.controllers.js";

const router = express.Router();

router.post("/register", main_controllers.main_register);
router.get("/goal_day/:day", main_controllers.find_goal_day);
router.post("/video/:day", main_controllers.video_register);

export default router;
