import * as users_repository from "../repositories/users.repository.js";

const get_my_calendar = async (user_id) => {
    try {
        const result = await users_repository.get_my_calendar(user_id);
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const get_my_video = async () => {};

const share_my_video = async () => {};

export { get_my_calendar, get_my_video, share_my_video };
