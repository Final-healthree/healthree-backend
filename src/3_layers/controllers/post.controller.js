import * as post_service from "../services/post.service.js";

export const get_posts = async (req, res) => {
    try {
        const { user_id, nickname, profile_image } = res.locals;
        const get_posts_data = await post_service.get_posts();

        res.status(200).json({ result: get_posts_data });
    } catch (error) {}
};

export const get_post_detail = async (req, res) => {
    try {
        res.status(200).json({ result: "get_post_detail" });
    } catch (error) {}
};

export const like = async (req, res) => {
    try {
        res.status(200).json({ result: "like" });
    } catch (error) {}
};

export const dislike = async (req, res) => {
    try {
        res.status(200).json({ result: "dislike" });
    } catch (error) {}
};
