import * as users_repository from "../repositories/users.repository.js";

const get_user_info = async (user_id) => {
    try {
        const get_user_info = await users_repository.get_user_info(user_id);
        return get_user_info;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const get_my_calendar = async (user_id) => {
    try {
        const get_days = await users_repository.get_my_calendar(user_id);
        return get_days;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const get_my_video = async () => {};

const share_my_video = async () => {};

export { get_user_info, get_my_calendar, get_my_video, share_my_video };
