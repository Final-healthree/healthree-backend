import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    const [auth_type, auth_value] = (authorization || " ").split(" ");

    if (!auth_type || auth_type !== "Bearer") {
        return res.status(401).json({ success: false, message: "로그인 후 이용해주세요." });
    }

    try {
        const user_info = jwt.verify(auth_value, process.env.JWT_SECRET);
        res.locals.user_id = user_info.payload.user_id;
        res.locals.nickname = user_info.payload.nickname;
        res.locals.profile_image = user_info.payload.profile_image;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError")
            return res.status(419).json({ success: false, message: "토큰이 만료되었습니다." });
        if (err.name === "jsonwebtokenError")
            return res.status(401).json({ success: false, message: "토큰이 유효하지 않습니다." });
    }
};

export { auth };
