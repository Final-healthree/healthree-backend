import * as video_service from "../services/video.service.js";

// 유저 비디오 전체 조회
export const get_my_videos = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const page_count = req.query.pagecount;
        const page = req.query.page;

        const video_list = await video_service.get_my_videos(
            user_id,
            Number(page_count),
            Number(page),
        );
        return res.status(200).json({ success: true, result: video_list });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};

// 비디오 업로드
export const video_register = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { day } = req.params;

        // 비디오 파일 유무 체크
        if (req.file) {
            const video = req.file.location;

            // 셋째날 비디오 업로드
            if (Number(day) === 3) {
                await video_service.video_register(user_id, day, video);

                return res.status(201).json({
                    success: true,
                    message: "동영상 업로드 완료",
                });
            }

            // 첫째 둘째날 비디오 업로드
            await video_service.video_register(user_id, day, video);

            return res.status(201).json({
                success: true,
                message: "동영상 업로드 완료",
            });
        } else {
            return res.status(411).json({
                success: false,
                message: `비디오 파일을 올려주세요`,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `${error.name}, ${error.message}`,
        });
    }
};

// 유저 비디오 공유
export const video_share = async (req, res) => {
    try {
        const { user_id } = res.locals;
        const { goal_id } = req.params;

        await video_service.video_share(user_id, goal_id);
        return res.status(201).json({ success: true, result: "마이 비디오 공유 성공" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `${error.name}, ${error.message}` });
    }
};
