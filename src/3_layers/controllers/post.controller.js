import * as post_service from "../services/post.service.js";

export const get_posts = (req, res) => {
    res.status(200).json({ result: "get_posts" });
};

export const get_post_detail = (req, res) => {
    res.status(200).json({ result: "get_post_detail" });
};

export const like = (req, res) => {
    res.status(200).json({ result: "like" });
};

export const dislike = (req, res) => {
    res.status(200).json({ result: "dislike" });
};
