import * as main_services from "../services/main.service.js";

export const get_goal_day = async (req, res) => {
    const { day } = req.params;
    main_services.get_goal_day(day);
    res.send("true");
};
