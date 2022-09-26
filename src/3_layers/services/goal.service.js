import * as goal_repositories from "../repositories/goal.repository.js";
import * as video_modules from "../../modules/video.module.js";
import Goal from "../../models/goal.js";
import Video from "../../models/video.js";

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
        day3: goal_day_data.day3,
    };
};

export const get_my_goals = async (user_id, nickname, profile_image) => {
    const get_user_goal = await goal_repositories.get_my_goals(user_id);
    const success = [];
    const fail = [];
    for (let i = 0; i < get_user_goal.length; i++) {
        if (
            get_user_goal[i].status === "success" &&
            get_user_goal[i].Video.video1 !== null &&
            get_user_goal[i].Video.video2 !== null &&
            get_user_goal[i].Video.video3 !== null &&
            get_user_goal[i].Video.final_video !== null
        ) {
            success.push({
                goal_id: get_user_goal[i].goal_id,
                date: [get_user_goal[i].day1, get_user_goal[i].day2, get_user_goal[i].day3],
            });
        }

        if (get_user_goal[i].status === "fail")
            if (
                get_user_goal[i].Video.video1 !== null &&
                get_user_goal[i].Video.video2 === null &&
                get_user_goal[i].Video.video3 === null
            ) {
                fail.push({ goal_id: get_user_goal[i].goal_id, date: get_user_goal[i].day1 });
            }
        if (
            get_user_goal[i].Video.video1 !== null &&
            get_user_goal[i].Video.video2 !== null &&
            get_user_goal[i].Video.video3 === null
        ) {
            fail.push({
                goal_id: get_user_goal[i].goal_id,
                date: [get_user_goal[i].day1, get_user_goal[i].day2],
            });
        }
    }
    return { nickname, profile_image, date: { success, fail } };
};

export const goal_is_exist = async (user_id) => {
    const is_exist = await goal_repositories.goal_is_exist(user_id);
    if (is_exist === null) {
        return false;
    } else {
        return true;
    }
};

export const goal_register = async (user_id, day1, day2, day3, goal_name) => {
    await goal_repositories.goal_register(user_id, day1, day2, day3, goal_name);
};

export const goal_fail = async (user_id, day) => {
    const goal_info = await Goal.findOne({
        where: { user_id, status: "progress" },
        include: { model: Video },
    });

    if (Number(day) === 1) {
        await goal_repositories.goal_fail(user_id, Number(day));
        return;
    }

    if (Number(day) === 2) {
        const created_s3_object = video_modules.create_video_s3_objects(
            goal_info.Video.video1.split("videos/")[1],
        );
        video_modules.delete_video_s3(created_s3_object);
        await goal_repositories.goal_fail(user_id, Number(day));
        return;
    }

    if (Number(day) === 3) {
        const created_s3_object = video_modules.create_video_s3_objects(
            goal_info.Video.video1.split("videos/")[1],
            goal_info.Video.video2.split("videos/")[1],
        );
        video_modules.delete_video_s3(created_s3_object);
        await goal_repositories.goal_fail(user_id, Number(day));
    }
};
