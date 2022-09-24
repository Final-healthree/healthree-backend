import Post from "../models/post.js";
import User from "../models/user.js";
import Goal from "../models/goal.js";
import { db } from "../models/index.js";
const Like = db.sequelize.models.Like;

export const is_available_delete = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const { post_id } = req.params;

        const is_exist = await Post.findOne({
            where: { post_id },
        });

        const is_writer = await Post.findOne({
            where: { post_id },
            attributes: ["post_id", "goal_id"],
            include: { model: Goal, attributes: ["user_id"] },
        });

        if (!is_exist) {
            return res.status(400).json({ success: false, message: "존재하지 않는 게시글입니다." });
        }

        if (user_id !== is_writer.Goal.user_id) {
            return res.status(400).json({ success: false, message: "작성자가 아닙니다." });
        }

        req.goal_id = is_writer?.goal_id;
        next();
    } catch (error) {
        console.log(error);
        throw error;
    }
};
