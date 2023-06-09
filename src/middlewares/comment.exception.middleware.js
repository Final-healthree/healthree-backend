import Post from "../models/post.js";
import Comment from "../models/comment.js";

// 댓글 조회
export const get_comments = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const exist_post = await Post.findOne({ where: { post_id } });

        if (exist_post === null) {
            return res.status(404).json({ success: false, message: "존재하지 않는 게시글입니다." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

//댓글 생성
export const create_comment = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const { comment } = req.body;

        const exist_post = await Post.findOne({ where: { post_id } });

        if (exist_post === null) {
            return res.status(404).json({ success: false, message: "존재하지 않는 게시글입니다." });
        }
        if (!comment) {
            return res.status(411).json({ success: false, message: "댓글을 적어주세요" });
        }
        if (comment.length > 40) {
            return res
                .status(413)
                .json({ success: false, message: "댓글은 40자 이하만 작성할 수 있습니다." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

// 댓글 수정
export const update_comment = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const { comment } = req.body;
        const { user_id } = res.locals;

        const exist_comment = await Comment.findOne({ where: { comment_id } });

        if (exist_comment === null) {
            return res.status(409).json({ success: false, message: "존재하지 않는 댓글입니다." });
        }
        if (exist_comment.user_id !== user_id) {
            return res.status(403).json({ success: false, message: "본인이 단 댓글이 아닙니다." });
        }

        if (!comment) {
            return res.status(411).json({ success: false, message: "댓글을 적어주세요" });
        }

        if (comment.length > 40) {
            return res
                .status(413)
                .json({ success: false, message: "댓글은 40자 이하만 작성할 수 있습니다." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

// 댓글 삭제
export const delete_comment = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const { user_id } = res.locals;

        const exist_comment = await Comment.findOne({ where: { comment_id } });

        if (exist_comment === null) {
            return res.status(409).json({ success: false, message: "존재하지 않는 댓글입니다." });
        }
        if (exist_comment.user_id !== user_id) {
            return res.status(403).json({ success: false, message: "본인이 단 댓글이 아닙니다." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};
