import Post from "../models/post.js";
import Comment from "../models/comment.js";

export const get_comments = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const exist_post = await Post.findOne({ where: { post_id } });

        if (exist_post === null) {
            return res.status(400).json({ success: false, message: "존재하지 않는 게시글입니다." });
        }
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const create_comment = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const { comment } = req.body;

        const exist_post = await Post.findOne({ where: { post_id } });

        if (exist_post === null) {
            return res.status(400).json({ success: false, message: "존재하지 않는 게시글입니다." });
        }
        if (!comment) {
            return res.status(400).json({ success: false, message: "댓글을 적어주세요" });
        }
        if (comment.length > 40) {
            return res
                .status(400)
                .json({ success: false, message: "댓글은 40자 이하만 작성할 수 있습니다." });
        }
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const update_comment = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const { comment } = req.body;
        const { user_id } = res.locals;

        const exist_comment = await Comment.findOne({ where: { comment_id } });

        if (exist_comment === null) {
            return res.status(400).json({ success: false, message: "존재하지 않는 댓글입니다." });
        }
        if (exist_comment.user_id !== user_id) {
            return res.status(400).json({ success: false, message: "본인이 단 댓글이 아닙니다." });
        }

        if (!comment) {
            return res.status(400).json({ success: false, message: "댓글을 적어주세요" });
        }

        if (comment.length > 40) {
            return res
                .status(400)
                .json({ success: false, message: "댓글은 40자 이하만 작성할 수 있습니다." });
        }
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const delete_comment = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const { user_id } = res.locals;

        const exist_comment = await Comment.findOne({ where: { comment_id } });

        if (exist_comment === null) {
            return res.status(400).json({ success: false, message: "존재하지 않는 댓글입니다." });
        }
        if (exist_comment.user_id !== user_id) {
            return res.status(400).json({ success: false, message: "본인이 단 댓글이 아닙니다." });
        }
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};
