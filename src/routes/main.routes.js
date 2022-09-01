import express from "express";
import * as main_controllers from "../controllers/main.controllers.js";

const router = express.Router();

router.get("/goal_day/:day", main_controllers.get_goal_day);

export default router;
