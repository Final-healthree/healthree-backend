import * as video_repositories from "../repositories/video.repository.js";
import * as video_modules from "../../modules/video.module.js";
import Goal from "../../models/goal.js";
import User from "../../models/user.js";
import Video from "../../models/video.js";

export const get_my_videos = async (user_id, page_count, page) => {
    const videos = await video_repositories.get_my_videos(user_id, page_count, page);
    const video_list = videos.map((v, index) => {
        return {
            goal_id: v.goal_id,
            goal_name: v.goal_name,
            is_share: v.is_share,
            day1: v.day1,
            day3: v.day3,
            final_video: v.Video.final_video,
            thumbnail: v.Video.thumbnail,
        };
    });
    return {
        video_list,
    };
};

export const video_register = async (user_id, day, video) => {
    if (Number(day) === 3) {
        // 저장되어있는 유저의 비디오 경로 정보
        const goal_info = await Goal.findOne({
            where: { user_id, status: "progress" },
            include: [
                { model: Video, attributes: ["video1", "video2"] },
                { model: User, attributes: ["social_id"] },
            ],
        });

        // 비디오 병합 함수 실행
        await video_modules.merge_videos(
            goal_info.Video.video1,
            goal_info.Video.video2,
            video,
            goal_info.User.social_id,
        );

        await video_modules.create_thumbnail(goal_info.User.social_id); // 비디오 썸네일 생성 함수 실행

        // 삭제할 비디오 s3 object 생성
        const created_s3_object = video_modules.create_video_s3_objects(
            goal_info.Video.video1.split("videos/")[1],
            goal_info.Video.video2.split("videos/")[1],
            video.split("videos/")[1],
        );

        video_modules.delete_video_s3(created_s3_object); // 비디오 파일 s3 삭제

        const readed_videod = await video_modules.read_file(goal_info.User.social_id); // 병합된 비디오 s3에 올리기 위한 파일 읽기

        // 병합된 비디오 및 썸네일 s3 업로드
        const uploaded_video = await video_modules.upload_video_s3(
            readed_videod.video,
            readed_videod.thumbnail,
        );

        await video_modules.delete_video_thumbnail(goal_info.User.social_id); // s3에 올린후 로컬에 저장되어 있는 비디오 파일 및 썸네일 이미지 삭제

        // 저장소 계층 호출
        await video_repositories.video_register(
            user_id,
            day,
            video,
            uploaded_video.s3_upload_video.Location,
            uploaded_video.s3_upload_thumbnail.Location,
        );
    } else {
        await video_repositories.video_register(user_id, day, video);
    }
};

export const video_share = async (user_id, goal_id) => {
    await video_repositories.video_share(user_id, goal_id);
};
