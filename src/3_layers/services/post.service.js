import * as post_repository from "../repositories/post.repository.js";

export const get_posts = async () => {
    return await post_repository.get_posts();
};
export const get_post_detail = async () => {
    return;
};
export const like = async () => {
    return;
};
export const dislike = async () => {
    return;
};
