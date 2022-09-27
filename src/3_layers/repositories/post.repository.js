import User from "../../models/user.js";
import Goal from "../../models/goal.js";
import Video from "../../models/video.js";
import Post from "../../models/post.js";
import Comment from "../../models/comment.js";
import Like from "../../models/like.js";

export const get_posts = async (user_id, page_count, page) => {
    return await Post.findAll({
        include: [
            {
                model: Goal,
                include: [
                    {
                        model: User,
                        attributes: ["nickname", "profile_image"],
                    },
                    {
                        model: Video,
                        attributes: ["final_video", "thumbnail"],
                    },
                ],
                attributes: ["goal_name", "day1", "day3"],
            },
            {
                model: Comment,
                attributes: ["comment"],
            },
            { model: Like },
        ],
        offset: page_count * (page - 1),
        limit: page_count,
        attributes: ["post_id"],
        order: [["post_id", "DESC"]],
    });
};

export const get_post_detail = async (user_id, post_id) => {
    return await Post.findOne({
        where: { post_id },
        attributes: ["post_id", "createdAt"],
        include: [
            {
                model: Goal,
                include: [
                    { model: User, attributes: ["user_id", "nickname", "profile_image"] },
                    { model: Video, attributes: ["final_video", "thumbnail"] },
                ],
                attributes: ["goal_name", "day1", "day3", "createdAt"],
            },
            { model: Like },
        ],
    });
};

export const delete_post = async (user_id, post_id, goal_id) => {
    await Post.destroy({ where: { post_id } });

    return await Goal.update({ is_share: false }, { where: { goal_id } });
};

export const check_like = async (user_id, post_id) => {
    return await Like.findOne({ where: { user_id, post_id } });
};

export const like_post = async (user_id, post_id) => {
    return await Like.create({ user_id, post_id });
};

export const dislike_post = async (user_id, post_id) => {
    return await Like.destroy({ where: { user_id, post_id } });
};
