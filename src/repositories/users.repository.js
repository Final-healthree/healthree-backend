import Goal from "../models/goal.js";
import User from "../models/user.js";
import Post from "../models/post.js";
import { Op } from "sequelize";

const get_my_calendar = async (user_id) => {
    return await User.findOne({
        where: { user_id },
        attributes: ["nickname", "profile_image"],
        include: {
            model: Goal,
            attributes: ["goal_id", "status", "day1", "day2", "day3", "video1", "video2", "video3"],
        },
    });
};

const get_my_videos = async (user_id, page_count, page) => {
    return await Goal.findAll({
        where: { user_id, status: "success", final_video: { [Op.ne]: null } },
        offset: page_count * (page - 1),
        limit: page_count,
        attributes: ["goal_name", "day1", "day3", "final_video"],
    });
};

const share_my_video = async (user_id, goal_id) => {
    await Goal.update(
        {
            is_social: true,
        },
        {
            where: {
                user_id,
                goal_id,
                video1: { [Op.ne]: null },
                video2: { [Op.ne]: null },
                video3: { [Op.ne]: null },
                final_video: { [Op.ne]: null },
            },
        },
    );

    await Post.create({
        goal_id,
    });
};

export { get_my_calendar, get_my_videos, share_my_video };
