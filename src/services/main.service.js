import * as main_repositories from "../repositories/main.repository.js";
import { merge_videos, delete_videos, s3_upload } from "../middlewares/s3.middlewares.js";
import Ing from "../models/ing.js";
import User from "../models/user.js";

export const main_register = async (user_id, date_one, date_two, date_three, goal) => {
    try {
        await main_repositories.main_register(user_id, date_one, date_two, date_three, goal);
    } catch (error) {
        return { error };
    }
};

export const find_goal_day = async (user_id, day) => {
    try {
        return await main_repositories.find_goal_day(user_id, day);
    } catch (error) {
        return { error };
    }
};

export const video_register = async (user_id, day, video) => {
    try {
        if (Number(day) === 3) {
            const video_info = await Ing.findOne({ where: { user_id } });
            const user_info = await User.findOne({ where: { user_id } });
            const merged_video = await merge_videos(
                video_info.video_one,
                video_info.video_two,
                video,
                user_info.kakao_id,
            );
            if (merged_video === true) {
                delete_videos(
                    video_info.video_one.split("videos/")[1],
                    video_info.video_two.split("videos/")[1],
                    video.split("videos/")[1],
                );

                const s3_upload_video = await s3_upload(user_info.kakao_id);
                console.log(s3_upload_video);
                return true;
            } else {
                return { error: merged_video.error };
            }
        }
        return await main_repositories.video_register(user_id, day, video);
    } catch (error) {
        return { error };
    }
};
