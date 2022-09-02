import Ing from "../models/ing.js";

export const check_video = async (req, res, next) => {
    // const { user_id } = res.locals;
    const user_id = 1;
    const { day } = req.params;
    if (Number(day) === 1 || Number(day) === 2 || Number(day) === 3) {
        try {
            if (Number(day) === 1) {
                const check_video = await Ing.findOne({ where: { user_id } });
                if (check_video.video_one) {
                    return res
                        .status(400)
                        .json({ success: false, message: `이미 동영상이 등록되어 있습니다.` });
                }
            }
            if (Number(day) === 2) {
                const check_video = await Ing.findOne({ where: { user_id } });
                if (!check_video.video_one) {
                    return res
                        .status(400)
                        .json({ success: false, message: `전 동영상을 올리지 않았습니다.` });
                }
                if (check_video.video_two) {
                    return res
                        .status(400)
                        .json({ success: false, message: `이미 동영상이 등록되어 있습니다.` });
                }
            }
            if (Number(day) === 3) {
                const check_video = await Ing.findOne({ where: { user_id } });
                if (!check_video.video_one || !check_video.video_two) {
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
            return res.status(400).json({ success: false, message: `catch::: ${error}` });
        }
    } else {
        return res.status(400).json({ success: false, message: `날짜를 확인해주세요` });
    }
};
