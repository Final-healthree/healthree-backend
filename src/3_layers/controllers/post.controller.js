import * as post_service from "../services/post.service.js";

export const get_posts = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const page_count = req.query.pagecount;
        const page = req.query.page;

        const post_lists = await post_service.get_posts(user_id, Number(page_count), Number(page));

        return res.status(200).json({
            success: true,
            result: { post: post_lists },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const get_post_detail = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { post_id } = req.params;
        const post_detail = await post_service.get_post_detail(user_id, post_id);

        return res.status(200).json({ success: true, result: post_detail });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const delete_post = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { post_id } = req.params;
        const goal_id = req.goal_id;

        await post_service.delete_post(user_id, post_id, goal_id);

        return res.status(204).json({ success: true, result: user_id });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const like = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { post_id } = req.params;

        await post_service.like(user_id, post_id);

        return res.status(201).json({ success: true, result: "좋아요 성공" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const dislike = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { post_id } = req.params;

        await post_service.dislike(user_id, post_id);

        return res.status(204).json({ success: true, result: "좋아요 취소 성공" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};
