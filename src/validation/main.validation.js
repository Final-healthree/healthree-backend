import Goal from "../models/goal.js";

export const check_register = async (req, res, next) => {
    // const { user_id } = res.locals;
    const user_id = 1;
    try {
        const check_register = await Goal.findOne({ where: { user_id, status: "progress" } });
        if (check_register) {
            return res
                .status(400)
                .json({ success: false, message: `이미 진행중인 작심삼일이 있습니다.` });
        }
        next();
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};

export const check_video_progress = async (req, res, next) => {
    // const { user_id } = res.locals;
    const user_id = 1;
    const { day } = req.params;

    if (Number(day) === 1 || Number(day) === 2 || Number(day) === 3) {
        const check_progress = await Goal.findOne({ where: { user_id, status: "progress" } });
        if (!check_progress) {
            return res
                .status(400)
                .json({ success: false, message: `진행중인 작심삼일이 없습니다.` });
        }

        try {
            if (Number(day) === 1) {
                const check_video = await Goal.findOne({ where: { user_id, status: "progress" } });
                if (check_video.video1) {
                    return res
                        .status(400)
                        .json({ success: false, message: `이미 동영상이 등록되어 있습니다.` });
                }
            }
            if (Number(day) === 2) {
                const check_video = await Goal.findOne({ where: { user_id, status: "progress" } });
                if (!check_video.video1) {
                    return res
                        .status(400)
                        .json({ success: false, message: `전 동영상을 올리지 않았습니다.` });
                }
                if (check_video.video2) {
                    return res
                        .status(400)
                        .json({ success: false, message: `이미 동영상이 등록되어 있습니다.` });
                }
            }
            if (Number(day) === 3) {
                const check_video = await Goal.findOne({ where: { user_id, status: "progress" } });
                if (!check_video.video1 || !check_video.video2) {
                    return res
                        .status(400)
                        .json({ success: false, message: `전 동영상을 올리지 않았습니다.` });
                }
                if (check_video.video_three) {
                    return res
                        .status(400)
                        .json({ success: false, message: `이미 동영상이 등록되어 있습니다.` });
                }
            }
            next();
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: `${error.name} , ${error.message}` });
        }
    } else {
        return res.status(400).json({ success: false, message: `날짜를 확인해주세요` });
    }
};
