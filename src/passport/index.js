import passport from "passport";
import kakao from "../passport/kakaoStrategy.js";
import User from "../models/user.js";

const passport_config = () => {
    passport.serializeUser((user, done) => {
        done(null, user.kakao_id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { kakao_id: id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });

    kakao();
};

export default passport_config;
