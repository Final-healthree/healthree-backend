import passport from "passport";
import kakao from "../passport/kakaoStrategy.js";
import User from "../models/user.js";

const passport_config = () => {
    passport.serializeUser((user, done) => {
        // console.log("카카오아이디", user.kakao_id);
        done(null, user.kakao_id);
        // console.log("왔어?");
    });

    passport.deserializeUser((id, done) => {
        // const kakao_id = id;
        // console.log("아이디", id);
        User.findOne({ where: { kakao_id: id } })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });

    kakao();
};

export default passport_config;
