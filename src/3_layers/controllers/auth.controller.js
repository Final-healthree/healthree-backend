import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(".env") });

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
        { expiresIn: "2h" },
    );

    res.redirect(`https://healthree3.com/main?token=${token}`); // "/main(프론트 서버)" 프론트와 연결
};
