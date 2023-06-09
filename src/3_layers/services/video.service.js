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
    const goal_info = await Goal.findOne({
        where: { user_id, status: "progress" },
        include: [{ model: User, attributes: ["social_id"] }],
    });

    if (Number(day) === 1 || Number(day) === 2) {
        await video_modules.video_trans(video, goal_info.User.social_id);

        const readed_videod = await video_modules.read_video(goal_info.User.social_id); //비디오 s3에 올리기 위한 파일 읽기

        //  비디오 s3 업로드
        const uploaded_video = await video_modules.upload_video(readed_videod.video);

        const created_s3_object = video_modules.create_video_s3_objects(video.split("videos/")[1]);

        video_modules.delete_video_s3(created_s3_object);

        await video_modules.delete_video(goal_info.User.social_id); // s3에 올린후 로컬에 저장되어 있는 비디오 파일 삭제

        await video_repositories.video_register(
            user_id,
            day,
            uploaded_video.s3_upload_video.Location,
        );
        return;
    }

    if (Number(day) === 3) {
        // 저장되어있는 유저의 비디오 경로 정보
        const goal_info = await Goal.findOne({
            where: { user_id, status: "progress" },
            include: [
                { model: Video, attributes: ["video1", "video2"] },
                { model: User, attributes: ["social_id"] },
            ],
        });

        // 셋째날 올라온 비디오 인코딩
        await video_modules.video_trans(video, goal_info.User.social_id);

        // 인코딩 된 셋째날 비디오를 읽음
        const readed_videod_three = await video_modules.read_video(goal_info.User.social_id);

        // 인코딩 된 셋째날 비디오를 s3 업로드
        const uploaded_video_three = await video_modules.upload_video(readed_videod_three.video);

        // s3에 업로드가 되면 로컬에 있는 셋째날 비디오 삭제
        await video_modules.delete_video(goal_info.User.social_id);

        // 비디오 병합 함수 실행
        await video_modules.merge_videos(
            goal_info.Video.video1,
            goal_info.Video.video2,
            uploaded_video_three.s3_upload_video.Location,
            goal_info.User.social_id,
        );

        // 병합된 비디오 썸네일 생성
        await video_modules.create_thumbnail(goal_info.User.social_id);

        // 삭제할 비디오 s3 object 생성
        const created_s3_object = video_modules.create_video_s3_objects(
            goal_info.Video.video1.split("videos/")[1],
            goal_info.Video.video2.split("videos/")[1],
            uploaded_video_three.s3_upload_video.Location.split("videos/")[1],
        );

        // 비디오 파일 s3에서 삭제
        video_modules.delete_video_s3(created_s3_object);

        // 병합된 비디오 s3에 올리기 위한 파일 읽기
        const readed_files = await video_modules.read_video_thumbnail(goal_info.User.social_id);

        // 병합된 비디오 및 썸네일 s3 업로드
        const uploaded_file = await video_modules.upload_video_s3(
            readed_files.video,
            readed_files.thumbnail,
        );

        // s3에 올린후 로컬에 저장되어 있는 비디오 파일 및 썸네일 이미지 삭제
        await video_modules.delete_video_thumbnail(goal_info.User.social_id);

        // 맨 처음 업로드한 셋째날 비디오 s3 객체 만들기
        const created_s3_object__three = video_modules.create_video_s3_objects(
            video.split("videos/")[1],
        );

        // 맨 처음 생성된 s3 비디오 삭제
        video_modules.delete_video_s3(created_s3_object__three);

        // 저장소 계층 호출
        await video_repositories.video_register(
            user_id,
            day,
            video,
            uploaded_file.s3_upload_video.Location,
            uploaded_file.s3_upload_thumbnail.Location,
        );
    }
};

export const video_share = async (user_id, goal_id) => {
    await video_repositories.video_share(user_id, goal_id);
};
