import Post from "../models/post.js";
import User from "../models/user.js";
import Goal from "../models/goal.js";
import Like from "../models/like.js";

// 공통 :: 접근 가능한 포스트인지 확인
export const is_accessible_post = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const is_exist_post = await Post.findOne({ where: { post_id } });

        if (!is_exist_post) {
            return res.status(404).json({ success: false, message: "존재하지 않는 게시글입니다." });
        }

        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};

// 게시글 삭제 :: 해당 유저가 삭제할 수 있는 포스트인지 작성자 확인
export const is_available_delete = async (req, res, next) => {
    try {
        const { user_id } = res.locals;
        const { post_id } = req.params;

        const is_writer = await Post.findOne({
            where: { post_id },
            attributes: ["post_id", "goal_id"],
            include: { model: Goal, attributes: ["user_id"] },
        });
        if (user_id !== is_writer.Goal.user_id) {
            return res.status(403).json({ success: false, message: "작성자가 아닙니다." });
        }

        req.goal_id = is_writer?.goal_id;
        next();
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: `${error.name} , ${error.message}` });
    }
};
