import * as video_repositories from "../repositories/video.repository.js";
import * as video_modules from "../../modules/video.module.js";
import Goal from "../../models/goal.js";
import User from "../../models/user.js";
import Video from "../../models/video.js";

export const get_my_videos = async (user_id, page_count, page) => {
    const videos = await video_repositories.get_my_videos(user_id, page_count, page);
    const video_list = videos.map((v, index) => {
        return {
            goal_id: v.goal_id,
            goal_name: v.goal_name,
            day1: v.day1,
            day3: v.day3,
            final_video: v.final_video,
        };
    });

    return { video_list };
};

export const video_register = async (user_id, day, video) => {
    if (Number(day) === 3) {
        const goal_info = await Goal.findOne({
            where: { user_id, status: "progress" },
            include: { model: Video },
        });
        const user_info = await User.findOne({ where: { user_id } });

        await video_modules.merge_videos(
            goal_info.Video.video1,
            goal_info.Video.video2,
            video,
            user_info.kakao_id,
        );
        const created_s3_object = video_modules.create_video_s3_objects(
            goal_info.Video.video1.split("videos/")[1],
            goal_info.Video.video2.split("videos/")[1],
            video.split("videos/")[1],
        );

        video_modules.delete_video_s3(created_s3_object);

        const readed_videod = await video_modules.read_video(user_info.kakao_id);

        const uploaded_video = await video_modules.upload_video_s3(readed_videod);

        await video_modules.delete_video_file(`./src/combine/${user_info.kakao_id}.mp4`);

        await video_repositories.video_register(user_id, day, video, uploaded_video.Location);
    } else {
        await video_repositories.video_register(user_id, day, video);
    }
};

export const video_share = async (user_id, goal_id) => {
    await video_repositories.video_share(user_id, goal_id);
};
