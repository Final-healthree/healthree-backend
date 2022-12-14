import User from "../../models/user.js";

// 랭크 페이지
export const get_rank = async (req, res) => {
    try {
        const { user_id } = res.locals;
        let my_rank = 0;

        // 유저들의 점수 및 정보
        const users = await User.findAll({
            order: [["score", "DESC"]],
            attributes: ["user_id", "nickname", "profile_image", "score"],
        });

        // 유저들 순위 메기기
        let init_rank = Array.from({ length: users.length }, () => 1);
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].score > users[i].score) init_rank[i]++;
            }
        }
        init_rank.sort((a, b) => {
            return a - b;
        });

        // 나의 순위 찾기
        const find_my_rank_info = users.find((value, index) => {
            if (value.user_id === user_id) {
                my_rank = init_rank[index];
                return true;
            }
        });

        res.status(200).json({
            top10: users
                .map((user, index) => {
                    return {
                        user_id: user.user_id,
                        nickname: user.nickname,
                        profile_image: user.profile_image,
                        score: user.score,
                        rank: init_rank[index],
                    };
                })
                .slice(0, 10),
            my_rank: {
                nickname: find_my_rank_info.nickname,
                profile_image: find_my_rank_info.profile_image,
                score: find_my_rank_info.score,
                my_rank,
            },
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};
