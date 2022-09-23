import User from "../../models/user.js";
import Goal from "../../models/goal.js";
import Video from "../../models/video.js";
import Post from "../../models/post.js";
import Comment from "../../models/comment.js";
import { db } from "../../models/index.js";
const Like = db.sequelize.models.Like;

// like 넣어주어야 함
export const get_posts = async (page_count, page) => {
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
                        attributes: ["final_video"],
                    },
                ],
                attributes: ["goal_name", "day1", "day3"],
            },
            {
                model: Comment,
                attributes: ["comment"],
            },
            // { model: Like },
        ],
        offset: page_count * (page - 1),
        limit: page_count,
        attributes: ["post_id"],
    });
};

// like 추가
export const get_post_detail = async (post_id) => {
    return await Post.findOne({
        where: { post_id },
        include: [
            {
                model: Goal,
                include: [
                    { model: User, attributes: ["nickname", "profile_image"] },
                    { model: Video, attributes: ["final_video"] },
                ],
                attributes: ["goal_name", "day1", "day3", "createdAt"],
            },
        ],
        attributes: ["post_id"],
    });
};

export const delete_post = async (user_id, post_id) => {
    await Post.destroy({ where: { post_id } });

    const seek_post_id = await Post.findOne({ include: { model: Goal }, where: { post_id } });
    const { goal_id } = seek_post_id;

    return await Goal.update({ is_share: false, where: { goal_id } });
};

export const check_like = async (user_id, post_id) => {
    return await Like.findOne({ where: { UserUserId: user_id, PostPostId: post_id } });
};

export const like_post = async (user_id, post_id) => {
    return await Like.create({ UserUserId: user_id, PostPostId: post_id });
};

export const dislike_post = async (user_id, post_id) => {
    return await Like.destroy({ where: { UserUserId: user_id, PostPostId: post_id } });
};
