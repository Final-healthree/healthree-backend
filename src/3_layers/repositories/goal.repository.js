import Goal from "../../models/goal.js";
import Video from "../../models/video.js";

export const find_goal_day = async (user_id) => {
    const goal_day_data = await Goal.findOne({
        where: { user_id, status: "progress" },
    });

    return {
        goal: goal_day_data.goal_name,
        day1: goal_day_data.day1,
        day2: goal_day_data.day2,
        day3: goal_day_data.day3,
    };
};

export const get_my_goals = async (user_id) => {
    return await Goal.findAll({
        where: { user_id },
        attributes: ["goal_id", "status", "day1", "day2", "day3"],
        include: { model: Video, attributes: ["video1", "video2", "video3", "final_video"] },
    });
};

export const goal_is_exist = async (user_id) => {
    return await Goal.findOne({
        where: { user_id, status: "progress" },
    });
};

export const goal_register = async (user_id, day1, day2, day3, goal_name) => {
    const goal = await Goal.create({
        user_id,
        day1,
        day2,
        day3,
        goal_name,
    });
    await Video.create({ goal_id: goal.goal_id });
};

export const goal_fail = async (user_id) => {
    await Goal.update(
        {
            status: "fail",
        },
        { where: { user_id, status: "progress" } },
    );
};
