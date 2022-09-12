import Goal from "../models/goal.js";

const check_share_video = async (req, res, next) => {
    const { user_id } = res.locals;
    const { goal_id } = req.params;
    try {
        const is_goal_id = await Goal.findOne({ where: { goal_id } });
        if (is_goal_id === null) {
            return res
                .status(400)
                .json({ success: false, message: "존재하지 않는 작심삼일입니다." });
        }

        const is_same_user = await Goal.findOne({ where: { goal_id }, attributes: ["user_id"] });
        if (user_id !== is_same_user.user_id) {
            return res
                .status(400)
                .json({ success: false, message: "현재 유저가 달성한 작심삼일이 아닙니다." });
        }

        const is_success = await Goal.findOne({
            where: { user_id, goal_id },
            attributes: ["status", "video1", "video2", "video3", "final_video"],
        });
        if (is_success.status !== "success") {
            return res
                .status(400)
                .json({ success: false, message: "실패한 작심삼일이라 공유할 수 없습니다." });
        }
        if (
            is_success.video1 === null ||
            is_success.video2 === null ||
            is_success.video3 === null ||
            is_success.final_video === null
        ) {
            return res
                .status(400)
                .json({ success: false, message: "공유할 영상이 존재하지 않습니다." });
        }

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

export { check_share_video };
