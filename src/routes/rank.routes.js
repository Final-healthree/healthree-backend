import express from "express";
import { get_rank } from "../3_layers/controllers/rank.controller.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", auth_middleware, get_rank);

export default router;
