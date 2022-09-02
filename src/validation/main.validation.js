import Ing from "../models/ing.js";

export const check_video = async (user_id) => {
    try {
        const check_video = await Ing.findOne({ where: { user_id } });
        console.log(check_video);
        if (check_video.video_one || check_video.video_two || check_video.video_three) {
            return false;
        }
        return true;
    } catch (error) {
        return { error };
    }
};
