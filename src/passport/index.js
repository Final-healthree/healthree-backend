import passport from "passport";
import kakao from "../passport/kakao.strategy.js";
import User from "../models/user.js";

const passport_config = () => {
    passport.serializeUser((user, done) => {
        done(null, user.social_id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { social_id: id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });

    kakao();
};

export default passport_config;
