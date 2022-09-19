import express from "express";
import passport from "passport";
import { auth_controller } from "../3_layers/controllers/auth.controller.js";

const router = express.Router();

router.get("/kakao", passport.authenticate("kakao"));

// Error: KOE006 https://kakao-tam.tistory.com/35
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", { /* session: false,  */ failureRedirect: "/" }),
    auth_controller,
);

export default router;
