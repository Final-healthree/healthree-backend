import * as main_repositories from "../repositories/main.repository.js";

export const main_register = async (user_id, date_one, date_two, date_three, goal) => {
    try {
        await main_repositories.main_register(user_id, date_one, date_two, date_three, goal);
    } catch (error) {
        return { error };
    }
};

export const find_goal_day = async (user_id, day) => {
    try {
        return await main_repositories.find_goal_day(user_id, day);
    } catch (error) {
        return { error };
    }
};

export const video_register = async (user_id, day, video) => {
    try {
        return await main_repositories.video_register(user_id, day, video);
    } catch (error) {
        return { error };
    }
};
