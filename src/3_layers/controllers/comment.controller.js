import * as comment_service from "../services/comment.service.js";

export const get_comments = async (req, res) => {
    try {
        const { post_id } = req.params;
        const page_count = req.query.pagecount;
        const page = req.query.page;

        const comments = await comment_service.get_comments(
            post_id,
            Number(page_count),
            Number(page),
        );

        return res.status(200).json({ success: true, result: comments });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const create_comment = async (req, res) => {
    try {
        const { post_id } = req.params;
        const { comment } = req.body;
        const { user_id } = res.locals;

        await comment_service.create_comment(post_id, comment, user_id);

        return res.status(201).json({ success: true, result: "댓글생성 성공" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const update_comment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        const { comment } = req.body;

        await comment_service.update_comment(comment_id, comment);

        return res.status(201).json({ success: true, result: "댓글수정 성공" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const delete_comment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        await comment_service.delete_comment(comment_id);

        return res.status(204).json({ success: true, result: "댓글삭제 성공" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};
