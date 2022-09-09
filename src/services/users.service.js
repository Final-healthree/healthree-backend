import * as users_repository from "../repositories/users.repository.js";
import Goal from "../models/goal.js";

const get_my_calendar = async (user_id) => {
    try {
        const user_info = await users_repository.get_my_calendar(user_id);
        const user = {
            nickname: user_info.nickname,
            profile_image: user_info.profile_image,
        };
        const user_goals = user_info.Goals;
        const distinguish = user_goals.map((d, index) => {
            return {
                goal_id: d.goal_id,
                status: d.status,
                day1: d.day1,
                day2: d.day2,
                day3: d.day3,
                video1: d.video1,
                video2: d.video2,
                video3: d.video3,
            };
        });

        const success = [];
        const fail = [];
        for (let i = 0; i < distinguish.length; i++) {
            if (
                distinguish[i].status === "success" &&
                distinguish[i].video1 !== null &&
                distinguish[i].video2 !== null &&
                distinguish[i].video3 !== null
            ) {
                success.push({
                    goal_id: distinguish[i].goal_id,
                    day1: distinguish[i].day1,
                    day2: distinguish[i].day2,
                    day3: distinguish[i].day3,
                });
            }

            if (distinguish[i].status === "fail") {
                if (
                    distinguish[i].video1 !== null &&
                    distinguish[i].video2 === null &&
                    distinguish[i].video3 === null
                ) {
                    fail.push({ goal_id: distinguish[i].goal_id, day1: distinguish[i].day1 });
                }
                if (
                    distinguish[i].video1 !== null &&
                    distinguish[i].video2 !== null &&
                    distinguish[i].video3 === null
                ) {
                    fail.push({
                        goal_id: distinguish[i].goal_id,
                        day1: distinguish[i].day1,
                        day2: distinguish[i].day2,
                    });
                }
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
