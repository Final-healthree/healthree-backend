import express from "express";
import * as goal_controller from "../3_layers/controllers/goal.controller.js";
import * as goal_exception_handler from "../middlewares/goal.exception.middleware.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/progress",
    auth_middleware,
    goal_exception_handler.find_goal_day,
    goal_controller.find_goal_day,
);

router.get("/mine", auth_middleware, goal_controller.get_my_goals);

router.get("/exist", auth_middleware, goal_controller.goal_is_exist);

router.post(
    "/register",
    auth_middleware,
    goal_exception_handler.goal_register,
    goal_controller.goal_register,
);
router.put(
    "/fail/:day",
    auth_middleware,
    goal_exception_handler.goal_fail,
    goal_controller.goal_fail,
);

export default router;
