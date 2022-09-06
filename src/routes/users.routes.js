import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import * as user_controller from "../controllers/users.controller.js";
import * as auth_middleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/auth/kakao", passport.authenticate("kakao"));

// Error: KOE006 https://kakao-tam.tistory.com/35
router.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", { /* session: false,  */ failureRedirect: "/" }),

    user_controller.kakao_login,
);

router.get("/test", auth_middleware.auth, (req, res, next) => {
    // console.log("req.body", req.body);
    res.send("왔어욤");
});

export default router;
