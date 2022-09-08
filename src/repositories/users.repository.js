import Goal from "../models/goal.js";
import User from "../models/user.js";

const get_my_calendar = async (user_id) => {
    try {
        const user_info = await User.findOne({
            where: { user_id },
            attributes: ["nickname", "profile_image"],
            include: {
                model: Goal,
                attributes: [
                    "goal_id",
                    "status",
                    "day1",
                    "day2",
                    "day3",
                    "video1",
                    "video2",
                    "video3",
                ],
            },
        });
        return user_info;
    } catch (err) {
        throw err;
    }
};

const get_my_video = async (req, res) => {};

const share_my_video = async (req, res) => {};

export { get_my_calendar, get_my_video, share_my_video };
