import Goal from "../models/goal.js";
import Video from "../models/video.js";
import moment from "moment";

export const find_goal_day = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const goal_progress = await Goal.findOne({ where: { user_id, status: "progress" } });
        if (!goal_progress) {
            return res
                .status(404)
                .json({ success: false, message: "진행중인 작심삼일이 없습니다." });
        }
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};

export const is_today_register = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const goal_progress = await Goal.findOne({ where: { user_id, status: "progress" } });

        if (goal_progress) {
            return res
                .status(409)
                .json({ success: false, message: "진행중인 작심삼일이 있습니다." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

export const goal_register = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const { day1, day2, day3, goal_name } = req.body;
        /* moment.tz.setDefault("Asia/Seoul");
        const now = moment().format("YYYY-MM-DD"); */

        const goal_register = await Goal.findOne({ where: { user_id, status: "progress" } });

        /* const recent_goal_info = await Goal.findOne({
            where: { user_id },
            order: [["createdAt", "DESC"]],
            attributes: ["updatedAt"],
        }); */

        if (goal_register) {
            return res
                .status(409)
                .json({ success: false, message: "이미 진행중인 작심삼일이 있습니다." });
        }

        /* if (recent_goal_info.updatedAt.split(" ")[0] === now) {
            return res.status(409).json({ success: false, message: "다음날 등록할 수 있습니다." });
        } */

        if (!day1 || !day2 || !day3) {
            return res
                .status(411)
                .json({ success: false, message: "날짜값이 제대로 오지 않았습니다." });
        }

        if (!goal_name) {
            return res.status(411).json({ success: false, message: "목표를 입력해주세요" });
        }

        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};

export const goal_fail = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const { day } = req.params;

        const goal_info = await Goal.findOne({
            where: { user_id, status: "progress" },
            include: { model: Video },
        });

        if (Number(day) === 1 || Number(day) === 2 || Number(day) === 3) {
            if (!goal_info) {
                return res
                    .status(404)
                    .json({ success: false, message: "진행중인 작심삼일이 없습니다." });
            }

            if (Number(day) === 1) {
                if (goal_info.Video.video1) {
                    return res
                        .status(409)
                        .json({ success: false, message: "첫째날은 이미 성공했습니다." });
                }
            }

            if (Number(day) === 2) {
                if (!goal_info.Video.video1) {
                    return res
                        .status(404)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }
                if (goal_info.Video.video2) {
                    return res
                        .status(409)
                        .json({ success: false, message: "둘째날은 이미 성공했습니다." });
                }
            }

            if (Number(day) === 3) {
                if (!goal_info.Video.video1 || !goal_info.Video.video2) {
                    return res
                        .status(404)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }

                // 셋째날을 이미 성공했으면 status가 success로 바뀌니까
                //진행중인 작심삼일이 없는 것이므로 if 문에서 거르지 않아도 된다.
            }
            next();
        } else {
            return res.status(411).json({ success: false, message: "날짜를 확인해주세요" });
        }
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};
