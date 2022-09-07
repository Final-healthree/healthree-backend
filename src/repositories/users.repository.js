import Goal from "../models/goal.js";

const get_my_calendar = async (user_id) => {
    try {
        const is_exist_video = await Goal.findAll({
            where: { user_id },
            attributes: ["goal_name", "final_video"],
        });

        const final_videos = [];
        const success = [];
        const fail = [];
        for (let i = 0; i < is_exist_video.length; i++) {
            final_videos.push(is_exist_video[i].dataValues.final_video);
            if (final_videos[i] !== null) {
                const success_results = await Goal.findAll({
                    where: { user_id },
                    attributes: ["goal_id", "day1", "day2", "day3"],
                });
                success.push(success_results[i].dataValues);
            } else {
                const fail_results = await Goal.findAll({
                    where: { user_id },
                    attributes: ["goal_id", "day1", "day2"],
                });
                fail.push(fail_results[i].dataValues);
            }
        }
        return { success: success, fail: fail };
    } catch (err) {
        throw err;
    }
};

const get_my_video = async (req, res) => {};

const share_my_video = async (req, res) => {};

export { get_my_calendar, get_my_video, share_my_video };
