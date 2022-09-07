import Goal from "../models/goal.js";

const get_my_calendar = async (user_id) => {
    try {
        const success_results = await Goal.findAll({
            where: { user_id },
            // attributes: ["goal_id", "day1", "day2", "day3"],
        });

        const fail_results = await Goal.findAll({
            where: { user_id },
            attributes: ["goal_id", "day1", "day2"],
        });

        const success = [];
        for (let i = 0; i < success_results.length; i++) {
            success.push(success_results[i].dataValues);
        }
        console.log("success", success);

        const fail = [];
        for (let i = 0; i < fail_results.length; i++) {
            fail.push(fail_results[i].dataValues);
        }
        console.log("fail", fail);
    } catch (err) {
        throw err;
    }
};

const get_my_video = async (req, res) => {};

const share_my_video = async (req, res) => {};

export { get_my_calendar, get_my_video, share_my_video };
