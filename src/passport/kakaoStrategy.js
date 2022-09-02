import passport from "passport";
import Kakao_passport from "passport-kakao";

import dotenv from "dotenv";
import User from "../models/user.js";

const kakao_strategy = Kakao_passport.Strategy;
dotenv.config();

const kakao = () => {
    passport.use(
        "kakao",
        new kakao_strategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: "/api/auth/kakao/callback", // 경로 문제 '/'를 붙여줘야 localhost:3000/~진행 가능
            },

            async (accessToken, refreshToken, profile, done) => {
                console.log("카카오프로필", profile);
            },
        ),
    );
};

export default kakao;
