import Goal from "../models/goal.js";

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

export { is_shared_video };
