import * as comment_repository from "../repositories/comment.repository.js";

// 댓글 조회
export const get_comments = async (post_id, page_count, page) => {
    const comments = await comment_repository.get_comments(post_id, page_count, page);

    return {
        comment: comments.rows.map((comment, idx) => {
            return {
                user_id: comment.user_id,
                comment_id: comment.comment_id,
                comment: comment.comment,
                nickname: comment.User.nickname,
                profile_image: comment.User.profile_image,
                date: comment.createdAt,
            };
        }),
        comment_cnt: comments.count,
    };
};

//댓글 생성
export const create_comment = async (post_id, comment, user_id) => {
    await comment_repository.create_comment(post_id, comment, user_id);
};

// 댓글 수정
export const update_comment = async (comment_id, comment) => {
    await comment_repository.update_comment(comment_id, comment);
};

// 댓글 삭제
export const delete_comment = async (comment_id) => {
    await comment_repository.delete_comment(comment_id);
};
