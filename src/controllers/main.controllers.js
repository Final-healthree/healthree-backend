import * as main_services from "../services/main.service.js";
import * as main_validation from "../validation/main.validation.js";

export const main_register = async (req, res) => {
    // 이미 ing가 등록되어 있을 시 에러 처리 해줄 것
    try {
        // const { user_id } = res.locals;
        const user_id = 1;
        const { date_one, date_two, date_three, goal } = req.body;

        await main_services.main_register(user_id, date_one, date_two, date_three, goal);

        res.status(200).json({ success: true, messgae: "작심삼일 등록 완료" });
    } catch (error) {
        return res.status(400).json({ success: false, message: `catch::: ${error}` });
    }
};

export const find_goal_day = async (req, res) => {
    try {
        // const { user_id } = res.locals;
        const user_id = 1;
        const { day } = req.params;
        const goal_day_data = await main_services.find_goal_day(user_id, day);

        res.status(200).json({
            success: true,
            result: { goal: goal_day_data.goal, date_n: goal_day_data.day },
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: `catch::: ${error}` });
    }
};

export const video_register = async (req, res) => {
    try {
        const user_id = 1;
        const { day } = req.params;
        const video = req.file.location;

        const result = main_validation(user_id);
        if (!result) {
            return res
                .status(400)
                .json({ success: false, message: `이미 동영상이 등록되어 있습니다.` });
        }

        await main_services.video_register(user_id, day, video);

        res.status(200).json({
            success: true,
            message: "동영상 업로드 완료",
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: `catch::: ${error}` });
    }
};
