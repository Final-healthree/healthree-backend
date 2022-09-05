import * as main_services from "../services/main.service.js";

export const main_register = async (req, res) => {
    // 이미 진행중인 작심삼일이 있으면 등록 못하게 하기
    try {
        // const { user_id } = res.locals;
        const user_id = 1;
        const { day1, day2, day3, goal_name } = req.body;

        const main_register = await main_services.main_register(
            user_id,
            day1,
            day2,
            day3,
            goal_name,
        );

        if (main_register !== true) {
            return res
                .status(400)
                .json({ success: false, message: `error : ${main_register.error}` });
        }

        res.status(200).json({ success: true, messgae: "작심삼일 등록 완료" });
    } catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
};

export const find_goal_day = async (req, res) => {
    try {
        // const { user_id } = res.locals;
        const user_id = 1;
        const { day } = req.params;
        const goal_day_data = await main_services.find_goal_day(user_id, day);

        if (goal_day_data.error === undefined) {
            return res.status(200).json({
                success: true,
                result: { goal: goal_day_data.goal, date_n: goal_day_data.day },
            });
        }
        return res.status(400).json({
            success: false,
            message: `${goal_day_data.error}`,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: `catch::: ${error}` });
    }
};

export const video_register = async (req, res) => {
    try {
        // const { user_id } = res.locals;
        const user_id = 1;
        const { day } = req.params;

        if (req.file) {
            const video = req.file.location;

            if (Number(day) === 3) {
                await main_services.video_register(user_id, day, video);

                return res.status(200).json({
                    success: true,
                    message: "동영상 합치기 완료",
                });
            }

            await main_services.video_register(user_id, day, video);

            return res.status(200).json({
                success: true,
                message: "동영상 업로드 완료",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: `비디오 파일을 올려주세요`,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: `${error.name}, ${error.message}`,
        });
    }
};
