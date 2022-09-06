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
    async (req, res) => {
        // jwt 생성 및 쿠키에 넣어서 클라이언트에 전달!
        const { user_id, nickname, profile_image } = req.user;
        const payload = { user_id, nickname, profile_image };
        const token = await jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "2h" });

        res.cookie("token", token);
        res.redirect("/api"); // "/main(프론트 서버)" 프론트와 연결
    },
);

router.get("/test", auth_middleware.auth, (req, res, next) => {
    // console.log("req.body", req.body);
    res.send("왔어욤");
});

export default router;
