import Goal from "../../models/goal.js";
import Video from "../../models/video.js";
import User from "../../models/user.js";
import { Op } from "sequelize";

export const find_goal_day = async (user_id) => {
    const goal_day_data = await Goal.findOne({
        where: { user_id, status: "progress" },
        attributes: ["goal_name", "day1", "day2", "day3"],
        include: { model: Video, attributes: ["video1", "video2"] },
    });
    return goal_day_data;
};

export const get_success_goal = async (user_id) => {
    const success_data = await Goal.findAll({
        where: { user_id, status: "success" },
        attributes: ["goal_id", "day1", "day3"],
    });
    return success_data;
};

export const get_fail_goal_2nd = async (user_id) => {
    const fail_data = await Goal.findAll({
        where: { user_id, status: "fail" },
        attributes: ["goal_id", "day1"],
        include: {
            model: Video,
            where: { [Op.and]: [{ video2: null }, { video3: null }] },
            attributes: [],
        },
    });
    return fail_data;
};

export const get_fail_goal_3rd = async (user_id) => {
    const fail_data = await Goal.findAll({
        where: { user_id, status: "fail" },
        attributes: ["goal_id", "day1", "day2"],
        include: {
            model: Video,
            where: {
                video2: { [Op.ne]: null },
                [Op.and]: [{ video3: null }, { final_video: null }],
            },
            attributes: [],
        },
    });
    return fail_data;
};

export const goal_is_exist = async (user_id) => {
    return await Goal.findOne({
        where: { user_id, status: "progress" },
    });
};

export const is_today_register = async (user_id) => {
    return await Goal.findOne({
        where: { user_id },
        order: [["createdAt", "DESC"]],
        attributes: ["updatedAt"],
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

    // 점수 추가
    if (Number(day) === 2) {
        await User.update(
            {
                score: user_score.score + 1,
            },
            { where: { user_id } },
        );
    }

    // 점수 추가
    if (Number(day) === 3) {
        await User.update(
            {
                score: user_score.score + 2,
            },
            { where: { user_id } },
        );
    }

    // 유저의 현재 등록된 목표 상태 progress에서 fail로 변경
    await Goal.update(
        {
            status: "fail",
        },
        { where: { user_id, status: "progress" } },
    );
};
