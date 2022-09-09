import express from "express";
import passport from "passport";
import * as user_controller from "../controllers/users.controller.js";
import * as auth_middleware from "../middlewares/auth.middleware.js";
import * as users_validation from "../validation/users.validation.js";

const router = express.Router();

// 카카오 로그인 요청
router.get("/auth/kakao", passport.authenticate("kakao"));

// Error: KOE006 https://kakao-tam.tistory.com/35
router.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", { /* session: false,  */ failureRedirect: "/" }),
    user_controller.kakao_login,
);

router.get("/my_calendar", auth_middleware.auth, user_controller.get_my_calendar);
router.get("/my_video", auth_middleware.auth, user_controller.get_my_videos);
router.post(
    "/my_video/:goal_id",
    auth_middleware.auth,
    users_validation.is_same_user,
    users_validation.is_shared_video,
    user_controller.share_my_video,
);

// 미들웨어 테스트
router.get("/test", auth_middleware.auth, users_validation.is_same_user, (req, res, next) => {
    // console.log("req.body", req.body);
    res.send("왔어욤");
});

export default router;
