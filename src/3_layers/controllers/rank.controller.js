import Goal from "../../models/goal.js";
import Video from "../../models/video.js";
import User from "../../models/user.js";

export const get_rank = async (req, res) => {
    try {
        const { user_id } = res.locals;
        let user_score = [];
        let my_rank = 0;

        const users = await User.findAll({
            include: {
                include: { model: Video, attributes: ["video1", "video2", "video3"] },
                model: Goal,
                attributes: ["goal_id"],
            },
            attributes: ["user_id", "nickname", "profile_image"],
        });

        for (let i = 0; i < users.length; i++) {
            let score = 0;
            for (let z = 0; z < users[i].Goals.length; z++) {
                let video = users[i].Goals[z].Video;
                if (video.video1 !== null && video.video2 !== null && video.video3 !== null) {
                    score += 5;
                    continue;
                }
                if (video.video1 !== null && video.video2 !== null && video.video3 === null) {
                    score += 2;
                    continue;
                }
                if (video.video1 !== null && video.video2 === null && video.video3 === null) {
                    score += 1;
                    continue;
                }
            }
            user_score.push({
                user_id: users[i].user_id, // 로그인한 유저의 rank를 알 수 있는 정보
                nickname: users[i].nickname,
                profile_image: users[i].profile_image,
                score,
            });
        }

        let init_rank = Array.from({ length: users.length }, () => 1);

        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (user_score[j].score > user_score[i].score) init_rank[i]++;
            }
        }

        user_score.sort((a, b) => {
            return b.score - a.score;
        });

        init_rank.sort((a, b) => {
            return a - b;
        });

        const find_my_rank_info = user_score.find((value, index) => {
            if (value.user_id === user_id) {
                my_rank = init_rank[index];
                return true;
            }
        });

        res.status(200).json({
            top10: user_score
                .map((user, index) => {
                    return {
                        user_id: user.user_id, // 나중에 지울 예정
                        nickname: user.nickname,
                        profile_image: user.profile_image,
                        score: user.score,
                        rank: init_rank[index],
                    };
                })
                .slice(0, 10),

            my_rank: {
                my_rank,
                nickname: find_my_rank_info.nickname,
                profile_image: find_my_rank_info.profile_image,
                score: find_my_rank_info.score,
            },
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};
