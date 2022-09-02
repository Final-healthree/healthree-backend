import * as main_repositories from "../repositories/main.repository.js";

export const main_register = async (user_id, date_one, date_two, date_three, goal) => {
    try {
        await main_repositories.main_register(user_id, date_one, date_two, date_three, goal);
    } catch (error) {
        console.log(error);
    }
};
