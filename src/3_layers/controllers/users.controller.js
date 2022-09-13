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
        { expiresIn: "1d" },
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
            result: get_days,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
};

const get_my_videos = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const page_count = req.query.pagecount;
        const page = req.query.page;

        const video_list = await users_service.get_my_videos(
            user_id,
            Number(page_count),
            Number(page),
        );
        return res.status(200).json({ status: 200, success: true, result: video_list });
    } catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
};

const share_my_video = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { goal_id } = req.params;

        await users_service.share_my_video(user_id, goal_id);
        return res
            .status(201)
            .json({ status: 201, success: true, result: "마이 비디오 공유 성공" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
};

export { kakao_login, get_my_calendar, get_my_videos, share_my_video };
