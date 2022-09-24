import * as post_repository from "../repositories/post.repository.js";

export const get_posts = async (page_count, page) => {
    const posts = await post_repository.get_posts(page_count, page);
    const like_cnt = await post_repository.get_like_cnt(page_count, page);
    const posts_list = posts.map((p, index) => {
        return {
            nickname: p.Goal.User.nickname,
            profile_image: p.Goal.User.profile_image,
            post_id: p.post_id,
            goal_name: p.Goal.goal_name,
            day1: p.Goal.day1,
            day3: p.Goal.day3,
            final_video: p.Goal.Video.final_video,
            comment_cnt: p.Comments.length,
        };
    });
    return posts_list;
};
export const get_post_detail = async (post_id) => {
    const post = await post_repository.get_post_detail(post_id);
    const user_info = post.Goal.User;
    const { nickname, profile_image } = user_info;
    const post_detail = [];
    post_detail.push({
        post_id: post.post_id,
        goal_id: post.Goal.goal_name,
        day1: post.Goal.day1,
        day3: post.Goal.day3,
        createdAt: post.Goal.createdAt,
        final_video: post.Goal.Video.final_video,
    });
    return { nickname, profile_image, post: post_detail };
};

export const delete_post = async (post_id, goal_id) => {
    return await post_repository.delete_post(post_id, goal_id);
};

export const like = async (user_id, post_id) => {
    try {
        const check_like = await post_repository.check_like(user_id, post_id);
        if (!check_like) {
            return await post_repository.like_post(user_id, post_id);
        } else throw Error("이미 좋아요한 게시물입니다.");
    } catch (error) {
        console.log(error);
    }
};

export const dislike = async (user_id, post_id) => {
    const check_like = await post_repository.check_like(user_id, post_id);
    if (check_like) return await post_repository.dislike_post(user_id, post_id);
};
