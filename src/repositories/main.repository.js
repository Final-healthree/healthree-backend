import Ing from "../models/ing.js";
import User from "../models/user.js";

export const main_register = async (user_id, date_one, date_two, date_three, goal) => {
    try {
        await Ing.create({ user_id, date_one, date_two, date_three, goal });
    } catch (error) {
        console.log(error);
    }
};
