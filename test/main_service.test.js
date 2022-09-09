import {
    main_register,
    find_goal_day,
    video_register,
    progress_fail,
} from "../src/services/main.service.js";

jest.mock("../src/repositories/main.repository.js");
jest.mock("../src/middlewares/s3.middleware.js");
jest.mock("../src/models/user.js");
jest.mock("../src/models/goal.js");

import User from "../src/models/user.js";
import Goal from "../src/models/goal.js";
import * as main_repositories from "../src/repositories/main.repository.js";
import * as s3_middlewares from "../src/middlewares/s3.middleware.js";

describe("main_service , main_register", () => {
    const user_id = 1;
    const day1 = "1";
    const day2 = "2";
    const day3 = "3";
    const goal_name = "목표";

    const repositories_layer = main_repositories.main_register;

    test("post api/main/register /// 성공시 저장소 계층 한번 호출", async () => {
        await main_register(user_id, day1, day2, day3, goal_name);

        expect(repositories_layer).toBeCalledTimes(1);
    });
});

describe("main_service , find_goal_day", () => {
    const user_id = 1;
    const day = "1";
    const repositories_layer = main_repositories.find_goal_day;

    test("get api/main/goal_day/:day /// 성공시 저장소 계층 한번 호출", async () => {
        await find_goal_day(user_id, day);

        expect(repositories_layer).toBeCalledTimes(1);
    });
});

describe("main_service , video_register", () => {
    const user_id = 1;

    const repositories_layer = main_repositories.video_register;

    test("post api/main/video/:day /// 성공시, day가 3이 아닐 때 repository 계층 한번 호출", async () => {
        const day = "1 or 2";
        const video = "1 or 2";

        await video_register(user_id, day, video);

        expect(repositories_layer).toBeCalledTimes(1);
        repositories_layer.mockClear();
    });

    test("post api/main/video/:day /// 성공시, day가 3일 때 repository 계층 한번 호출", async () => {
        const day = "3";
        const video = "3";

        Goal.findOne.mockReturnValue(Promise.resolve({ video1: "1", video2: "2" }));
        User.findOne.mockReturnValue(Promise.resolve({ kakao_id: "12345" }));
        s3_middlewares.read_video.mockReturnValue(Promise.resolve("video_file.mp4"));
        s3_middlewares.s3_upload.mockReturnValue(
            Promise.resolve({ Location: "업로드된 비디오 주소" }),
        );

        await video_register(user_id, day, video);

        expect(repositories_layer).toBeCalledTimes(1);
    });
});

describe("main_service , progress_fail", () => {
    const user_id = 1;
    const repositories_layer = main_repositories.progress_fail;

    test("patch api/main/video/:day/fail /// 성공시 repository 계층 한번 호출", async () => {
        await progress_fail(user_id);

        expect(repositories_layer).toBeCalledTimes(1);
    });
});
