import Goal from "../models/goal.js";
import Video from "../models/video.js";
import moment from "moment";

export const find_goal_day = async (req, res, next) => {
    try {
        const { goal_id } = req.query;

        if (goal_id) {
            const goal = await Goal.findOne({ where: { goal_id } });
            if (!goal) {
                return res
                    .status(400)
                    .json({ success: false, message: "존재하지 않는 goal_id입니다." });
            }

            res.locals.goal_id = goal_id;
            next();
            return;
        }
        const { user_id } = res.locals;
        const goal_progress = await Goal.findOne({ where: { user_id, status: "progress" } });
        if (!goal_progress) {
            return res
                .status(400)
                .json({ success: false, message: "진행중인 작심삼일이 없습니다." });
        }
        next();
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};

export const goal_register = async (req, res, next) => {
    try {
        moment.tz.setDefault("Asia/Seoul");
        const { user_id } = res.locals;
        const { day1, day2, day3, goal_name } = req.body;
        const now = moment().format("YYYY-MM-DD");

        const goal_register = await Goal.findOne({ where: { user_id, status: "progress" } });

        // 가장 최근 등록한 작심삼일 가지고 오기
        const recent_registered = await Goal.findOne({
            where: { user_id },
            order: [["createdAt", "DESC"]],
        });
        if (goal_register) {
            return res
                .status(400)
                .json({ success: false, message: "이미 진행중인 작심삼일이 있습니다." });
        }

        if (!day1 || !day2 || !day3) {
            return res
                .status(400)
                .json({ success: false, message: "날짜값이 제대로 오지 않았습니다." });
        }

        if (!goal_name) {
            return res.status(400).json({ success: false, message: "목표를 입력해주세요" });
        }

        /*  if (recent_registered) {
            if (recent_registered.createdAt.split(" ")[0] === now) {
                return res.status(400).json({
                    success: false,
                    message: "하루가 지난뒤에 등록 할수 있습니다.",
                });
            }
        } */
        next();
    } catch (error) {
        return res
            .status(400)
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
                    .status(400)
                    .json({ success: false, message: "진행중인 작심삼일이 없습니다." });
            }

            if (Number(day) === 1) {
                if (goal_info.Video.video1) {
                    return res
                        .status(400)
                        .json({ success: false, message: "첫째날은 이미 성공했습니다." });
                }
            }

            if (Number(day) === 2) {
                if (!goal_info.Video.video1) {
                    return res
                        .status(400)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }
                if (goal_info.Video.video2) {
                    return res
                        .status(400)
                        .json({ success: false, message: "둘째날은 이미 성공했습니다." });
                }
            }

            if (Number(day) === 3) {
                if (!goal_info.Video.video1 || !goal_info.Video.video2) {
                    return res
                        .status(400)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }

                // 셋째날을 이미 성공했으면 status가 success로 바뀌니까
                //진행중인 작심삼일이 없는 것이므로 if 문에서 거르지 않아도 된다.
            }
            next();
        } else {
            return res.status(400).json({ success: false, message: "날짜를 확인해주세요" });
        }
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};
