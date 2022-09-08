import Goal from "../models/goal.js";
import User from "../models/user.js";

const get_my_calendar = async (user_id) => {
    try {
        const success_videos = await Goal.findAll({
            where: { user_id, status: "success" },
            attributes: ["goal_name", "video1", "video2", "video3"],
        });
        // console.log(success_videos);
        const success_list = [];
        for (let i = 0; i < success_videos.length; i++) {
            success_list.push(success_videos[i].dataValues);
        }
        console.log("성공!", success_list);

        const fail_videos = await Goal.findAll({
            where: { user_id, status: "fail" },
            attributes: ["goal_name", "video1", "video2", "video3"],
        });
        // console.log(fail_videos);
        // if video3 !== null 성공, return day1, day2, day3
        // if video2 === null && day3 === null 실패, return day1
        // if video3 === null 실패, return day1, day2

        return { success: success_videos, fail: fail_videos };
    } catch (err) {
        throw err;
    }
};

const get_my_video = async (req, res) => {};

const share_my_video = async (req, res) => {};

export { get_my_calendar, get_my_video, share_my_video };
