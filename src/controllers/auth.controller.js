import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const kakao_login = async (req, res) => {
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
    );
    console.log(token);
    // return token; //
};

export { kakao_login };
