import * as comment_repository from "../repositories/comment.repository.js";

export const get_comments = async (post_id, page_count, page) => {
    const comments = await comment_repository.get_comments(post_id, page_count, page);

    return comments.map((comment, idx) => {
        return {
            user_id: comment.user_id,
            comment_id: comment.comment_id,
            comment: comment.comment,
            nickname: comment.User.nickname,
            profile_image: comment.User.profile_image,
            date: comment.createdAt,
        };
    });
};

export const create_comment = async (post_id, comment, user_id) => {
    await comment_repository.create_comment(post_id, comment, user_id);
};

export const update_comment = async (comment_id, comment) => {
    await comment_repository.update_comment(comment_id, comment);
};

export const delete_comment = async (comment_id) => {
    await comment_repository.delete_comment(comment_id);
};
