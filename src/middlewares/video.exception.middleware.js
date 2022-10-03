import Goal from "../models/goal.js";
import Video from "../models/video.js";
import moment from "moment";

// 비디오 업로드
export const video_register = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const { day } = req.params;
        moment.tz.setDefault("Asia/Seoul");

        const now = moment().format("YYYY-MM-DD");
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
                /* if (goal_info.day1.split(" ")[0] !== now) {
                    return res
                        .status(409)
                        .json({ success: false, message: "등록된 날짜와 현재 날짜가 다릅니다." });
                } */
                if (goal_info.Video.video1) {
                    return res
                        .status(409)
                        .json({ success: false, message: "이미 동영상이 등록되어 있습니다." });
                }
            }
            if (Number(day) === 2) {
                /* if (goal_info.day2.split(" ")[0] !== now) {
                    return res
                        .status(409)
                        .json({ success: false, message: "등록된 날짜와 현재 날짜가 다릅니다." });
                } */
                if (!goal_info.Video.video1) {
                    return res
                        .status(404)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }
                if (goal_info.Video.video2) {
                    return res
                        .status(409)
                        .json({ success: false, message: "이미 동영상이 등록되어 있습니다." });
                }
            }
            if (Number(day) === 3) {
                /* if (goal_info.day3.split(" ")[0] !== now) {
                    return res
                        .status(409)
                        .json({ success: false, message: "등록된 날짜와 현재 날짜가 다릅니다." });
                } */
                if (!goal_info.Video.video1 || !goal_info.Video.video2) {
                    return res
                        .status(404)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }
                if (goal_info.Video.video3) {
                    return res
                        .status(409)
                        .json({ success: false, message: "이미 동영상이 등록되어 있습니다." });
                }
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

export const video_share = async (req, res, next) => {
    const { user_id } = res.locals;
    const { goal_id } = req.params;
    try {
        const is_goal_id = await Goal.findOne({ where: { goal_id } });
        if (is_goal_id === null) {
            return res
                .status(404)
                .json({ success: false, message: "존재하지 않는 작심삼일입니다." });
        }

        const is_same_user = await Goal.findOne({ where: { goal_id }, attributes: ["user_id"] });
        if (user_id !== is_same_user.user_id) {
            return res
                .status(403)
                .json({ success: false, message: "현재 유저가 달성한 작심삼일이 아닙니다." });
        }

        const is_success = await Goal.findOne({
            where: { user_id, goal_id },
            include: { model: Video, attributes: ["video1", "video2", "video3", "final_video"] },
            attributes: ["status"],
        });

        if (is_success.status === "progress") {
            return res
                .status(409)
                .json({ success: false, message: "진행 중인 작심삼일이라 공유할 수 없습니다." });
        }

        if (is_success.status === "fail") {
            return res
                .status(409)
                .json({ success: false, message: "실패한 작심삼일이라 공유할 수 없습니다." });
        }
        if (
            is_success.Video.video1 === null ||
            is_success.Video.video2 === null ||
            is_success.Video.video3 === null ||
            is_success.Video.final_video === null
        ) {
            return res
                .status(404)
                .json({ success: false, message: "공유할 영상이 존재하지 않습니다." });
        }

        const is_shared_video = await Goal.findOne({
            where: { user_id, goal_id, is_share: true },
        });

        if (is_shared_video) {
            return res.status(409).json({ success: false, message: "이미 공유한 영상입니다." });
        }

        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};
//
