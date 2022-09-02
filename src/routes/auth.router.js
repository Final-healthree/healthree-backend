import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/kakao", passport.authenticate("kakao"));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/", // "/main" 프론트와 연결
    }),
    (req, res) => {
        res.redirect("/");
    },
);

export default router;
