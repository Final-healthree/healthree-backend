import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import * as auth_controller from "../controllers/auth.controller.js";
import * as auth_middleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/kakao", passport.authenticate("kakao"));

// Error: KOE006 https://kakao-tam.tistory.com/35
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", { /* session: false,  */ failureRedirect: "/" }),

    auth_controller.kakao_login,
);

router.get("/test", auth_middleware.auth, (req, res, next) => {
    // console.log("req.body", req.body);
    res.send("왔어욤");
});

export default router;
