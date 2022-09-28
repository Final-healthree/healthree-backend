import Comment from "../../models/comment.js";
import User from "../../models/user.js";

export const get_comments = async (post_id, page_count, page) => {
    return Comment.findAndCountAll({
        where: { post_id },
        attributes: ["comment_id", "comment", "createdAt", "user_id"],
        include: { model: User, attributes: ["nickname", "profile_image"] },
        limit: page_count,
        offset: page_count * (page - 1),
        order: [["comment_id", "DESC"]],
    });
};

export const create_comment = async (post_id, comment, user_id) => {
    await Comment.create({
        comment,
        post_id,
        user_id,
    });
};

export const update_comment = async (comment_id, comment) => {
    await Comment.update({ comment }, { where: { comment_id } });
};

export const delete_comment = async (comment_id) => {
    await Comment.destroy({ where: { comment_id } });
};
