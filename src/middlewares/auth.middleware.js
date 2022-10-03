import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import User from "../models/user.js";

dotenv.config({ path: path.resolve(".env") });

// 로그인 후 사용자 인증 정보를 저장하는 인증 미들웨어
export const auth_middleware = async (req, res, next) => {
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
    } catch (error) {
        if (error.name === "TokenExpiredError")
            return res.status(419).json({ success: false, message: "토큰이 만료되었습니다." });
        if (error.name === "jsonwebtokenError")
            return res.status(401).json({ success: false, message: "토큰이 유효하지 않습니다." });
    }
};
