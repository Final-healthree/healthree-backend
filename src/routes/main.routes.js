import express from "express";
import * as main_controllers from "../controllers/main.controllers.js";

const router = express.Router();

router.post("/register", main_controllers.main_register);

export default router;
