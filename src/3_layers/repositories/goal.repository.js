import Goal from "../../models/goal.js";
import Video from "../../models/video.js";
import User from "../../models/user.js";

export const find_goal_day = async (user_id) => {
    const goal_day_data = await Goal.findOne({
        where: { user_id, status: "progress" },
        attributes: ["goal_name", "day1", "day2", "day3"],
        include: { model: Video, attributes: ["video1", "video2"] },
    });

    return goal_day_data;
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

export const goal_fail = async (user_id, day) => {
    const user_score = await User.findOne({ where: { user_id }, attributes: ["score"] });

    if (Number(day) === 2) {
        await User.update(
            {
                score: user_score.score + 1,
            },
            { where: { user_id } },
        );
    }
    if (Number(day) === 3) {
        await User.update(
            {
                score: user_score.score + 2,
            },
            { where: { user_id } },
        );
    }

    await Goal.update(
        {
            status: "fail",
        },
        { where: { user_id, status: "progress" } },
    );
};
