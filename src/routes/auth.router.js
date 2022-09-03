import express from "express";
import passport from "passport";
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
    // (req, res) => {
    //     console.log("유저 나와", req.user);
    //     res.redirect("/api"); // "/main(프론트 서버)" 프론트와 연결
    // },

    // 로그인 성공 시 이동할 리다이렉트 페이지 연결 전 토큰 발급하러 가기
    auth_controller.kakao_login,
);

router.get("/test", auth_middleware.auth, (req, res, next) => {
    console.log(req.body);
});

export default router;
