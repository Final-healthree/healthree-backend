import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as users_service from "../services/users.service.js";

dotenv.config();

const kakao_login = async (req, res) => {
    const user_info = req.user;
    const { user_id, nickname, profile_image } = user_info;

    const payload = {
        user_id,
        nickname,
        profile_image,
    };

    const token = await jwt.sign(
        {
            payload,
        },
        process.env.JWT_SECRET,
    );
    console.log(token);

    res.cookie("token", token);
    res.redirect("/api"); // "/main(프론트 서버)" 프론트와 연결
};

const get_my_calendar = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const get_days = await users_service.get_my_calendar(user_id);

        return res.status(200).json({
            status: 200,
            success: true,
            date: get_days,
        });
    } catch (err) {
        return res.status(400).json({ success: false, message: err });
    }
};

const get_my_videos = async (req, res) => {
    res.send("smile");
};

const share_my_video = async (req, res) => {
    res.send("cheese");
};

export { kakao_login, get_my_calendar, get_my_videos, share_my_video };
