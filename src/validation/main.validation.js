import Ing from "../models/ing.js";

export const check_video = async (user_id) => {
    const check_video = await Ing.findOne({ where: user_id });
    if (check_video.video_one || check_video.video_two || check_video.video_three) {
        return false;
    }
    return true;
};
