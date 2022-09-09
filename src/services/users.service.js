import * as users_repository from "../repositories/users.repository.js";
import Goal from "../models/goal.js";

const get_my_calendar = async (user_id) => {
    try {
        const user_info = await users_repository.get_my_calendar(user_id);
        const user = {
            nickname: user_info.nickname,
            profile_image: user_info.profile_image,
        };

        const success = [];
        const fail = [];
        for (let i = 0; i < user_info.Goals.length; i++) {
            if (user_info.Goals[i].status === "success") {
                success.push({
                    goal_id: user_info.Goals[i].goal_id,
                    day1: user_info.Goals[i].day1,
                    day2: user_info.Goals[i].day2,
                    day3: user_info.Goals[i].day3,
                });
            }

            if (user_info.Goals[i].status === "fail")
                if (user_info.Goals[i].video2 === null && user_info.Goals[i].video3 === null) {
                    fail.push({
                        goal_id: user_info.Goals[i].goal_id,
                        day1: user_info.Goals[i].day1,
                    });
                } else {
                    fail.push({
                        goal_id: user_info.Goals[i].goal_id,
                        day1: user_info.Goals[i].day1,
                        day2: user_info.Goals[i].day2,
                    });
                }
        }
        return { nickname: user.nickname, profile: user.profile_image, success, fail };
    } catch (err) {
        throw err;
    }
};

const get_my_videos = async (user_id, page_count, page) => {
    try {
        const videos = await users_repository.get_my_videos(user_id, page_count, page);

        const video_list = videos.map((v, index) => {
            return {
                goal_name: v.goal_name,
                day1: v.day1,
                day3: v.day3,
                final_video: v.final_video,
            };
        });
        return { video_list };
    } catch (err) {
        throw err;
    }
};

const share_my_video = async (user_id, goal_id) => {
    try {
        await users_repository.share_my_video(user_id, goal_id);
    } catch (err) {
        throw err;
    }
};

export { get_my_calendar, get_my_videos, share_my_video };
