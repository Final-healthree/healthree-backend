import * as users_repository from "../repositories/users.repository.js";
import Goal from "../models/goal.js";

const get_my_calendar = async (user_id) => {
    try {
        const user_info = await users_repository.get_my_calendar(user_id);
        console.log(user_info);
        const user = {
            nickname: user_info.nickname,
            profile_image: user_info.profile_image,
        };

        const success = [];
        const fail = [];
        for (let i = 0; i < user_info.Goals.length; i++) {
            if (user_info.Goals[i].status === "success") {
                success.push({
                    goal_id: user_info.Goals[i].goal_id,
                    day1: user_info.Goals[i].day1,
                    day2: user_info.Goals[i].day2,
                    day3: user_info.Goals[i].day3,
                });
                console.log(success);
            } else if (user_info.Goals[i].video2 === null && user_info.Goals[i].video3 === null) {
                fail.push({
                    goal_id: user_info.Goals[i].goal_id,
                    day1: user_info.Goals[i].day1,
                });
            } else {
                fail.push({
                    goal_id: user_info.Goals[i].goal_id,
                    day1: user_info.Goals[i].day1,
                    day2: user_info.Goals[i].day2,
                });
            }
        }
        return { nickname: user.nickname, profile: user.profile_image, success, fail };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const get_my_video = async () => {};

const share_my_video = async () => {};

export { get_my_calendar, get_my_video, share_my_video };
