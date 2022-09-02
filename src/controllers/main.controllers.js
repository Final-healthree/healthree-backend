import * as main_services from "../services/main.service.js";

export const main_register = async (req, res) => {
    try {
        // const { user_id } = res.locals;
        const user_id = 1;
        const { date_one, date_two, date_three, goal } = req.body;

        await main_services.main_register(user_id, date_one, date_two, date_three, goal);

        res.status(200).json({ success: true, messgae: "작심삼일 등록 완료" });
    } catch (error) {
        console.log(error);
    }
};
