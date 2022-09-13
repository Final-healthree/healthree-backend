import Goal from "../models/goal.js";
import moment from "moment";

export const check_registerd = async (req, res, next) => {
    try {
        moment.tz.setDefault("Asia/Seoul");
        const { user_id } = res.locals;
        const now = moment().format("YYYY-MM-DD");

        const check_register = await Goal.findOne({ where: { user_id, status: "progress" } });

        // 가장 최근 등록한 작심삼일 가지고 오기
        const recent_registered = await Goal.findOne({
            where: { user_id },
            order: [["createdAt", "DESC"]],
        });
        if (check_register) {
            return res
                .status(400)
                .json({ success: false, message: "이미 진행중인 작심삼일이 있습니다." });
        }

        if (recent_registered) {
            if (recent_registered.createdAt.split(" ")[0] === now) {
                return res.status(400).json({
                    success: false,
                    message: "하루가 지난뒤에 등록 할수 있습니다.",
                });
            }
        }
        next();
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};

export const check_progress = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const { day } = req.params;

        if (Number(day) === 1 || Number(day) === 2 || Number(day) === 3) {
            const check_progress = await Goal.findOne({ where: { user_id, status: "progress" } });
            if (!check_progress) {
                return res
                    .status(400)
                    .json({ success: false, message: "진행중인 작심삼일이 없습니다." });
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

export const check_progress_video = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const { day } = req.params;

        const check_progress_video = await Goal.findOne({ where: { user_id, status: "progress" } });

        if (Number(day) === 1 || Number(day) === 2 || Number(day) === 3) {
            if (!check_progress_video) {
                return res
                    .status(400)
                    .json({ success: false, message: "진행중인 작심삼일이 없습니다." });
            }

            if (Number(day) === 1) {
                if (check_progress_video.video1) {
                    return res
                        .status(400)
                        .json({ success: false, message: "이미 동영상이 등록되어 있습니다." });
                }
            }
            if (Number(day) === 2) {
                if (!check_progress_video.video1) {
                    return res
                        .status(400)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }
                if (check_progress_video.video2) {
                    return res
                        .status(400)
                        .json({ success: false, message: "이미 동영상이 등록되어 있습니다." });
                }
            }
            if (Number(day) === 3) {
                if (!check_progress_video.video1 || !check_progress_video.video2) {
                    return res
                        .status(400)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }
                if (check_progress_video.video3) {
                    return res
                        .status(400)
                        .json({ success: false, message: "이미 동영상이 등록되어 있습니다." });
                }
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

export const check_progress_fail = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const { day } = req.params;

        const check_progress_video = await Goal.findOne({ where: { user_id, status: "progress" } });

        if (Number(day) === 1 || Number(day) === 2 || Number(day) === 3) {
            if (!check_progress_video) {
                return res
                    .status(400)
                    .json({ success: false, message: "진행중인 작심삼일이 없습니다." });
            }

            if (Number(day) === 1) {
                if (check_progress_video.video1) {
                    return res
                        .status(400)
                        .json({ success: false, message: "첫째날은 이미 성공했습니다." });
                }
            }

            if (Number(day) === 2) {
                if (!check_progress_video.video1) {
                    return res
                        .status(400)
                        .json({ success: false, message: "전 동영상을 올리지 않았습니다." });
                }
                if (check_progress_video.video2) {
                    return res
                        .status(400)
                        .json({ success: false, message: "둘째날은 이미 성공했습니다." });
                }
            }

            if (Number(day) === 3) {
                if (!check_progress_video.video1 || !check_progress_video.video2) {
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
