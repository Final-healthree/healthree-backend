import Goal from "../models/goal.js";
import { Op } from "sequelize";
import User from "../models/user.js";

const is_exist_final_video = async (req, res, next) => {
    const { user_id } = res.locals;
    try {
        const is_exist_final_video = await Goal.findAll({
            where: { user_id, final_video: null },
        });
        console.log("얍~", is_exist_final_video);
        if (is_exist_final_video) {
            return res
                .status(400)
                .json({ success: false, message: "파이널 비디오가 존재하지 않습니다. " });
        }

        next();
    } catch (error) {
        throw error;
    }
};

const is_shared_video = async (req, res, next) => {
    const { user_id } = res.locals;
    const { goal_id } = req.params;
    try {
        const is_shared_video = await Goal.findOne({
            where: { user_id, goal_id, is_social: true },
        });

        if (is_shared_video) {
            return res.status(400).json({ success: false, message: "이미 공유한 영상입니다." });
        }
        next();
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};

// const does_not_exist_video = async(req, res, next)=> {

// }

const is_same_user = async (req, res, next) => {
    const { user_id } = res.locals;
    const { goal_id } = req.params;
    console.log(user_id);
    console.log(goal_id);
    try {
        const is_same_user = await Goal.findOne({ where: { goal_id }, attributes: ["user_id"] });
        console.log(is_same_user.user_id);
        if (user_id !== is_same_user.user_id) {
            return res
                .status(400)
                .json({ success: false, message: "현재 유저가 달성한 작심삼일이 아닙니다." });
        }
        next();
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};

export { is_shared_video, is_exist_final_video, is_same_user };
