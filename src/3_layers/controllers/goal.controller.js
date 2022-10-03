import * as goal_services from "../services/goal.service.js";

// 현재 등록되어 있는 목표 조회
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
        res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

// 유저의 목표 달성 여부 전체 조회
export const get_my_goals = async (req, res) => {
    try {
        const { user_id, nickname, profile_image } = res.locals;
        const get_days = await goal_services.get_my_goals(user_id, nickname, profile_image);
        return res.status(200).json({
            success: true,
            result: get_days,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

// 유저의 목표 존재 유무 확인
export const goal_is_exist = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const is_exist = await goal_services.goal_is_exist(user_id);

        return res.status(200).json({
            success: true,
            result: is_exist,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

// 유저가 오늘 목표를 등록할 수 있는지 체크
export const is_today_register = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const is_today_register = await goal_services.is_today_register(user_id);

        return res.status(200).json({
            success: true,
            result: is_today_register,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

// 유저의 목표 등록
export const goal_register = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { day1, day2, day3, goal_name } = req.body;

        await goal_services.goal_register(user_id, day1, day2, day3, goal_name);

        res.status(201).json({ success: true, messgae: "작심삼일 등록 완료" });
    } catch (error) {
        res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

// 유저가 목표 달성을 실패했을 때
export const goal_fail = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { day } = req.params;

        await goal_services.goal_fail(user_id, day);

        return res.status(201).json({ success: true, message: "실패요청 완료" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `${error.name}, ${error.message}`,
        });
    }
};
