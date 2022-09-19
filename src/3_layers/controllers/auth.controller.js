import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth_controller = async (req, res) => {
    const user_info = req.user;
    const { user_id, nickname, profile_image } = user_info;

    const payload = {
        user_id,
        nickname,
        profile_image,
    };

    const token = jwt.sign(
        {
            payload,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    );

    res.redirect(`http://prac-ye.s3-website.ap-northeast-2.amazonaws.com/main?token=${token}`); // "/main(프론트 서버)" 프론트와 연결
};
