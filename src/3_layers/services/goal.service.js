import * as goal_repositories from "../repositories/goal.repository.js";
import * as video_modules from "../../modules/video.module.js";
import Goal from "../../models/goal.js";
import Video from "../../models/video.js";
import moment from "moment";

export const find_goal_day = async (user_id) => {
    const goal_day_data = await goal_repositories.find_goal_day(user_id);

    return {
        goal: goal_day_data.goal_name,
        day1: {
            date: goal_day_data.day1,
            uploaded: goal_day_data.Video.video1 === null ? false : true,
        },
        day2: {
            date: goal_day_data.day2,
            uploaded: goal_day_data.Video.video2 === null ? false : true,
        },
        day3: {
            date: goal_day_data.day3,
            uploaded: false,
        },
    };
};

export const get_my_goals = async (user_id, nickname, profile_image) => {
    const success = await goal_repositories.get_success_goal(user_id);
    const get_fail_goal_2nd = await goal_repositories.get_fail_goal_2nd(user_id);
    const get_fail_goal_3rd = await goal_repositories.get_fail_goal_3rd(user_id);
    const fail = [...get_fail_goal_2nd, ...get_fail_goal_3rd];

    return {
        nickname,
        profile_image,
        date: { success, fail },
    };
};

export const goal_is_exist = async (user_id) => {
    const is_exist = await goal_repositories.goal_is_exist(user_id);
    if (is_exist === null) {
        return false;
    } else {
        return true;
    }
};

export const is_today_register = async (user_id) => {
    const recent_goal_info = await goal_repositories.is_today_register(user_id);

    moment.tz.setDefault("Asia/Seoul");
    const now = moment().format("YYYY-MM-DD");
    if (recent_goal_info.updatedAt.split(" ")[0] === now) return false; // 가장 최근에 등록된 목표의 updatedAt을 가지고 와서 날짜 비교

    return true;
};

export const goal_register = async (user_id, day1, day2, day3, goal_name) => {
    await goal_repositories.goal_register(user_id, day1, day2, day3, goal_name);
};

export const goal_fail = async (user_id, day) => {
    // 현재 등록된 유저 목표를 가지고옴
    const goal_info = await Goal.findOne({
        where: { user_id, status: "progress" },
        include: { model: Video },
    });

    // 유저가 첫째날 목표 달성을 실패했을 떄
    if (Number(day) === 1) {
        await goal_repositories.goal_fail(user_id, Number(day));
        return;
    }

    // 유저가 둘째날 목표 달성을 실패했을 떄
    if (Number(day) === 2) {
        const created_s3_object = video_modules.create_video_s3_objects(
            goal_info.Video.video1.split("videos/")[1],
        ); // 삭제할 s3 object를 생성
        video_modules.delete_video_s3(created_s3_object); // s3에 업로드 되어있는 유저의 비디오 삭제
        await goal_repositories.goal_fail(user_id, Number(day));
        return;
    }

    // 유저가 셋째날 목표 달성을 실패했을 떄
    if (Number(day) === 3) {
        const created_s3_object = video_modules.create_video_s3_objects(
            goal_info.Video.video1.split("videos/")[1],
            goal_info.Video.video2.split("videos/")[1],
        ); // 삭제할 s3 object를 생성
        video_modules.delete_video_s3(created_s3_object); // s3에 업로드 되어있는 유저의 비디오 삭제
        await goal_repositories.goal_fail(user_id, Number(day));
    }
};
