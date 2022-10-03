import Goal from "../../models/goal.js";
import Post from "../../models/post.js";
import Video from "../../models/video.js";
import User from "../../models/user.js";
import { Op } from "sequelize";

export const get_my_videos = async (user_id, page_count, page) => {
    return await Goal.findAll({
        where: { user_id, status: "success" },
        include: {
            model: Video,
            where: {
                video1: { [Op.ne]: null },
                video2: { [Op.ne]: null },
                video3: { [Op.ne]: null },
                final_video: { [Op.ne]: null },
            },
            attributes: ["final_video", "thumbnail"],
        },
        offset: page_count * (page - 1),
        limit: page_count,
        attributes: ["goal_id", "goal_name", "is_share", "day1", "day3"],
        order: [["goal_id", "DESC"]],
    });
};

export const video_register = async (user_id, day, video, final_video, thumbnail) => {
    const goal = await Goal.findOne({ where: { user_id, status: "progress" } });

    if (Number(day) === 1) {
        await Video.update(
            {
                video1: video,
            },
            { where: { goal_id: goal.goal_id } },
        );
        return;
    }

    if (Number(day) === 2) {
        await Video.update(
            {
                video2: video,
            },
            { where: { goal_id: goal.goal_id } },
        );
        return;
    }

    // 셋쨰날까지 비디오 업로드시 목표 성공에 따른 점수 추가 및 유저의 목표 상태 변경
    if (Number(day) === 3) {
        const user_score = await User.findOne({ where: { user_id }, attributes: ["score"] });

        await Video.update(
            {
                video3: video,
                final_video,
                thumbnail,
            },
            { where: { goal_id: goal.goal_id } },
        );
        await Goal.update({ status: "success" }, { where: { user_id, status: "progress" } });
        await User.update({ score: user_score.score + 5 }, { where: { user_id } });
    }
};

// 유저 비디오 공유 시 'is_share: true' 상태 업데이트 후 게시글 생성
export const video_share = async (user_id, goal_id) => {
    await Goal.update(
        {
            is_share: true,
        },
        {
            where: {
                user_id,
                goal_id,
            },
        },
    );

    await Post.create({
        goal_id,
    });
};
