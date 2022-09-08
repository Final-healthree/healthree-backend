import Goal from "../models/goal.js";
import User from "../models/user.js";

const get_user_info = async (user_id) => {
    const user_info = await User.findOne({
        where: { user_id },
        attributes: ["nickname", "profile_image"],
    });
    return user_info;
};

const get_my_calendar = async (user_id) => {
    try {
        const success_videos = await Goal.findAll({
            where: { user_id, status: "success" },
            attributes: ["goal_id", "day1", "day2", "day3"],
        });

        const fail_videos = await Goal.findAll({
            where: { user_id, status: "fail" },
            attributes: ["goal_id", "day1", "day2", "day3", "video1", "video2", "video3"],
        });

        let fail = [];
        for (let i = 0; i < fail_videos.length; i++) {
            if (fail_videos[i].video2 === null && fail_videos[i].video3 === null) {
                fail.push({ goal_id: fail_videos[i].goal_id, day1: fail_videos[i].day1 });
            } else if (fail_videos[i].video3 === null) {
                fail.push({
                    goal_id: fail_videos[i].goal_id,
                    day1: fail_videos[i].day1,
                    day2: fail_videos[i].day2,
                });
            }
        }
        return { test: data, success: success_videos, fail: fail };
    } catch (err) {
        throw err;
    }
};

const get_my_video = async (req, res) => {};

const share_my_video = async (req, res) => {};

export { get_user_info, get_my_calendar, get_my_video, share_my_video };
