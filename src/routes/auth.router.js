import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/kakao", passport.authenticate("kakao"));

// Error: KOE006 https://kakao-tam.tistory.com/35
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    (req, res) => {
        console.log("유저 나와", req.user);
        res.redirect("/api"); // "/main(프론트 서버)" 프론트와 연결
    },
);

export default router;
