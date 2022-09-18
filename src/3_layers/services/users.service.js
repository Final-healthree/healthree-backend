import * as users_repository from "../repositories/users.repository.js";

const get_my_calendar = async (user_id, nickname, profile_image) => {
    const get_user_goal = await users_repository.get_my_calendar(user_id);
    const date = [];
    for (let i = 0; i < get_user_goal.length; i++) {
        if (
            get_user_goal[i].status === "success" &&
            get_user_goal[i].video1 !== null &&
            get_user_goal[i].video2 !== null &&
            get_user_goal[i].video3 !== null &&
            get_user_goal[i].final_video !== null
        ) {
            date.push({
                goal_id: get_user_goal[i].goal_id,
                date: [get_user_goal[i].day1, get_user_goal[i].day2, get_user_goal[i].day3],
            });
        }

        if (get_user_goal[i].status === "fail")
            if (
                get_user_goal[i].video1 !== null &&
                get_user_goal[i].video2 === null &&
                get_user_goal[i].video3 === null
            ) {
                date.push({ goal_id: get_user_goal[i].goal_id, date: get_user_goal[i].day1 });
            }
        if (
            get_user_goal[i].video1 !== null &&
            get_user_goal[i].video2 !== null &&
            get_user_goal[i].video3 === null
        ) {
            date.push({
                goal_id: get_user_goal[i].goal_id,
                date: [get_user_goal[i].day1, get_user_goal[i].day2],
            });
        }
    }
    return { nickname, profile_image, date };
};

const get_my_videos = async (user_id, page_count, page) => {
    const videos = await users_repository.get_my_videos(user_id, page_count, page);
    const video_list = videos.map((v, index) => {
        return {
            goal_id: v.goal_id,
            goal_name: v.goal_name,
            day1: v.day1,
            day3: v.day3,
            final_video: v.final_video,
        };
    });

    return { video_list };
};

const share_my_video = async (user_id, goal_id) => {
    await users_repository.share_my_video(user_id, goal_id);
};

export { get_my_calendar, get_my_videos, share_my_video };
