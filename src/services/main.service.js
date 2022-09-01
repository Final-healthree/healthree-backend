import * as main_repositories from "../repositories/main.repository.js";

export const get_goal_day = async (day) => {
    main_repositories.get_goal_day(day);
};
