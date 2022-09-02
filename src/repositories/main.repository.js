import Ing from "../models/ing.js";

export const main_register = async (user_id, date_one, date_two, date_three, goal) => {
    try {
        await Ing.create({ user_id, date_one, date_two, date_three, goal });
    } catch (error) {
        return { error };
    }
};
export const find_goal_day = async (user_id, day) => {
    try {
        if (Number(day) === 1) {
            const day_one = await Ing.findOne({ where: { user_id } });
            return { day: day_one.date_one, goal: day_one.goal };
        }
        if (Number(day) === 2) {
            const day_two = await Ing.findOne({ where: { user_id } });
            return { day: day_two.date_two, goal: day_two.goal };
        }
        if (Number(day) === 3) {
            const day_three = await Ing.findOne({ where: { user_id } });
            return { day: day_three.date_three, goal: day_three.goal };
        }
    } catch (error) {
        return { error };
    }
};

export const video_register = async (user_id, day, video) => {
    try {
        if (Number(day) === 1) {
            await Ing.update(
                {
                    video_one: video,
                },
                { where: { user_id } },
            );
            return true;
        }
        if (Number(day) === 2) {
            await Ing.update(
                {
                    video_two: video,
                },
                { where: { user_id } },
            );
            return true;
        }
        if (Number(day) === 3) {
            return;
        }
    } catch (error) {
        return { error };
    }
};
