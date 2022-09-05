import * as main_repositories from "../repositories/main.repository.js";
import {
    merge_videos,
    delete_videos_s3,
    s3_upload,
    delete_file,
    read_video,
} from "../middlewares/s3.middlewares.js";
import User from "../models/user.js";
import Goal from "../models/goal.js";

export const main_register = async (user_id, day1, day2, day3, goal_name) => {
    try {
        await main_repositories.main_register(user_id, day1, day2, day3, goal_name);
    } catch (error) {
        throw error;
    }
};

export const find_goal_day = async (user_id, day) => {
    try {
        return await main_repositories.find_goal_day(user_id, day);
    } catch (error) {
        throw error;
    }
};

export const video_register = async (user_id, day, video) => {
    if (Number(day) === 3) {
        const video_info = await Goal.findOne({ where: { user_id, status: "progress" } });
        const user_info = await User.findOne({ where: { user_id } });

        await merge_videos(video_info.video1, video_info.video2, video, user_info.kakao_id);

        delete_videos_s3(
            video_info.video1.split("videos/")[1],
            video_info.video2.split("videos/")[1],
            video.split("videos/")[1],
        );

        const readed_videod = await read_video(user_info.kakao_id);

        const s3_upload_video = await s3_upload(readed_videod);

        await delete_file(`./src/combine/${user_info.kakao_id}.mp4`);

        await main_repositories.video_register(user_id, day, video, s3_upload_video.Location);
    } else {
        await main_repositories.video_register(user_id, day, video);
    }
};

export const progress_fail = async (req, res) => {};
