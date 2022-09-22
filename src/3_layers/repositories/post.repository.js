import Goal from "../../models/goal.js";
import Video from "../../models/video.js";
import Post from "../../models/post.js";

export const get_posts = async () => {
    const posts = await Post.findAll({
        include: { model: Goal, where: { is_share: ture }, attributes: ["goal_name"] },
        include: { model: Video, attributes: ["final_video", "createAt"] },
        attributes: ["post_id"],
        // include: {model: like, attributes: []}
    });
    return posts;
};
