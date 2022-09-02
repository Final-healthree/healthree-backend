import express from "express";
import passport from "passport";
import * as auth_controller from "../controllers/auth.controller.js";
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
    auth_controller.kakao_login,
);

export default router;
