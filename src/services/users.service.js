import * as users_repository from "../repositories/users.repository.js";

const get_my_calendar = async (user_id) => {
    try {
        return await users_repository.get_my_calendar(user_id);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const get_my_video = async () => {};

const share_my_video = async () => {};

export { get_my_calendar, get_my_video, share_my_video };
