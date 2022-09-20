import Goal from "../../models/goal.js";
import Post from "../../models/post.js";
import Video from "../../models/video.js";
import { Op } from "sequelize";

export const get_my_videos = async (user_id, page_count, page) => {
    return await Goal.findAll({
        where: { user_id, status: "success" },
        include: {
            model: Video,
            where: {
                video1: { [Op.ne]: null },
                video2: { [Op.ne]: null },
                video3: { [Op.ne]: null },
                final_video: { [Op.ne]: null },
            },
            attributes: ["final_video"],
        },
        offset: page_count * (page - 1),
        limit: page_count,
        attributes: ["goal_id", "goal_name", "day1", "day3"],
    });
};

export const video_register = async (user_id, day, video, final_video) => {
    if (Number(day) === 1) {
        await Goal.update(
            {
                video1: video,
            },
            { where: { user_id, status: "progress" } },
        );
        return;
    }

    if (Number(day) === 2) {
        await Goal.update(
            {
                video2: video,
            },
            { where: { user_id, status: "progress" } },
        );
        return;
    }

    if (Number(day) === 3) {
        await Goal.update(
            {
                status: "success",
                video3: video,
                final_video,
            },
            { where: { user_id, status: "progress" } },
        );
    }
};

export const video_share = async (user_id, goal_id) => {
    const test = await Goal.update(
        {
            is_share: true,
        },
        {
            where: {
                user_id,
                goal_id,
            },
        },
    );

    await Post.create({
        goal_id,
    });
};
