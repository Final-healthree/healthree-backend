import * as goal_services from "../services/goal.service.js";

export const find_goal_day = async (req, res) => {
    try {
        const { user_id } = res.locals;

        const goal_day_data = await goal_services.find_goal_day(user_id);

        res.status(200).json({
            success: true,
            result: {
                goal: goal_day_data.goal,
                day1: goal_day_data.day1,
                day2: goal_day_data.day2,
                day3: goal_day_data.day3,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const get_my_goals = async (req, res) => {
    try {
        const { user_id, nickname, profile_image } = res.locals;
        const get_days = await goal_services.get_my_goals(user_id, nickname, profile_image);

        return res.status(200).json({
            success: true,
            result: get_days,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const goal_is_exist = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const is_exist = await goal_services.goal_is_exist(user_id);

        return res.status(200).json({
            success: true,
            result: is_exist,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const goal_register = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { day1, day2, day3, goal_name } = req.body;

        await goal_services.goal_register(user_id, day1, day2, day3, goal_name);

        res.status(200).json({ success: true, messgae: "작심삼일 등록 완료" });
    } catch (error) {
        res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const goal_fail = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { day } = req.params;

        await goal_services.goal_fail(user_id, day);

        return res.status(200).json({ success: true, message: "실패요청 완료" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: `${error.name}, ${error.message}`,
        });
    }
};
