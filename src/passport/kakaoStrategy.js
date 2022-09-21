import passport from "passport";
import Kakao_passport from "passport-kakao";

import dotenv from "dotenv";
import User from "../models/user.js";
import path from "path";

const kakao_strategy = Kakao_passport.Strategy;

dotenv.config({ path: path.resolve(".env") });

const kakao = () => {
    passport.use(
        "kakao",
        new kakao_strategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: "/api/auth/kakao/callback", // 경로 문제 '/'를 붙여줘야 localhost:3000/~진행 가능
            },

            async (accessToken, refreshToken, profile, done) => {
                const social_id = profile.id;
                const nickname = profile.displayName;
                const profile_image = profile._json.properties.profile_image;
                try {
                    const is_exist_user = await User.findOne({ where: { social_id } });
                    if (is_exist_user) {
                        done(null, is_exist_user);
                    } else {
                        const create_user = await User.create({
                            social_id,
                            nickname,
                            profile_image,
                        });
                        done(null, create_user);
                    }
                } catch (err) {
                    console.log(err);
                    done(err);
                }
            },
        ),
    );
};

export default kakao;
