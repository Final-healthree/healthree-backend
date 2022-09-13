import Goal from "../../models/goal.js";

export const main_register = async (user_id, day1, day2, day3, goal_name) => {
    await Goal.create({
        user_id,
        day1,
        day2,
        day3,
        goal_name,
    });
};

export const find_goal_day = async (user_id, day) => {
    const goal_day_data = await Goal.findOne({ where: { user_id, status: "progress" } });

    if (Number(day) === 1) {
        return { day: goal_day_data.day1, goal: goal_day_data.goal_name };
    }
    if (Number(day) === 2) {
        return { day: goal_day_data.day2, goal: goal_day_data.goal_name };
    }
    if (Number(day) === 3) {
        return { day: goal_day_data.day3, goal: goal_day_data.goal_name };
    }
};

export const video_register = async (user_id, day, video, final_video) => {
    if (Number(day) === 1) {
        await Goal.update(
            {
                video1: video,
            },
            { where: { user_id, status: "progress" } },
        );
        return;
    }

    if (Number(day) === 2) {
        await Goal.update(
            {
                video2: video,
            },
            { where: { user_id, status: "progress" } },
        );
        return;
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
};

export const progress_fail = async (user_id) => {
    await Goal.update(
        {
            status: "fail",
        },
        { where: { user_id, status: "progress" } },
    );
};
