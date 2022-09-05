import Goal from "../models/goal.js";

export const main_register = async (user_id, day1, day2, day3, goal_name) => {
    try {
        await Goal.create({
            status: "progress",
            user_id,
            day1,
            day2,
            day3,
            goal_name,
            is_social: false,
        });
    } catch (error) {
        throw error;
    }
};
export const find_goal_day = async (user_id, day) => {
    try {
        if (Number(day) === 1) {
            const day1 = await Goal.findOne({ where: { user_id, status: "progress" } });
            return { day: day1.day1, goal: day1.goal_name };
        }
        if (Number(day) === 2) {
            const day2 = await Goal.findOne({ where: { user_id, status: "progress" } });
            return { day: day2.day2, goal: day2.goal_name };
        }
        if (Number(day) === 3) {
            const day3 = await Goal.findOne({ where: { user_id, status: "progress" } });
            return { day: day3.day3, goal: day3.goal_name };
        }
    } catch (error) {
        throw error;
    }
};

export const video_register = async (user_id, day, video, final_video) => {
    try {
        if (Number(day) === 1) {
            await Goal.update(
                {
                    video1: video,
                },
                { where: { user_id } },
            );
            return true;
        }
        if (Number(day) === 2) {
            await Goal.update(
                {
                    video2: video,
                },
                { where: { user_id } },
            );
            return true;
        }
        if (Number(day) === 3) {
            await Goal.update(
                {
                    status: "success",
                    video3: video,
                    final_video,
                },
                { where: { user_id, status: "progress" } },
            );
        }
    } catch (error) {
        throw error;
    }
};
