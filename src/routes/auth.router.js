import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import * as auth_controller from "../controllers/auth.controller.js";
import * as auth_middleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/kakao", passport.authenticate("kakao"));

// Error: KOE006 https://kakao-tam.tistory.com/35
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    async (req, res) => {
        // console.log("auth.router의 user", req.user);
        const { user_id, nickname, profile_image } = req.user;
        const payload = { user_id, nickname, profile_image };

        const token = await jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: "4h" });
        console.log("test", token);
        res.redirect("/api"); // "/main(프론트 서버)" 프론트와 연결
    },
);

router.get("/test", auth_middleware.auth, (req, res, next) => {
    console.log(req.body);
});

export default router;
