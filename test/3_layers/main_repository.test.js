import {
    main_register,
    find_goal_day,
    video_register,
    progress_fail,
} from "../../src/3_layers/repositories/main.repository.js";

jest.mock("../../src/models/goal.js");
import Goal from "../../src/models/goal.js";

describe("main_repository , main_register", () => {
    const user_id = 1;
    const day1 = "1";
    const day2 = "2";
    const day3 = "3";
    const goal_name = "목표";

    const model_goal = Goal.create;

    test("post api/main/register /// 성공시, Goal model 한번 호출", async () => {
        await main_register(user_id, day1, day2, day3, goal_name);

        expect(model_goal).toBeCalledTimes(1);
        model_goal.mockClear();
    });
});

describe("main_repository , find_goal_day", () => {
    const user_id = 1;

    Goal.findOne.mockReturnValue({
        day1: "1",
        day2: "2",
        day3: "3",
        goal_name: "목표",
    });

    test("get api/main/goal_day/:day /// 성공시, day가 1일 때 day1에 맞는 반환값을 리턴", async () => {
        const result = await find_goal_day(user_id);

        expect(result).toEqual({
            goal: "목표",
            day1: "1",
            day2: "2",
            day3: "3",
        });
    });
});

describe("main_repository , video_register", () => {
    const user_id = 1;
    const video = "비디오주소";
    const final_video = " 비디오 3개 합친 주소";

    const model_goal = Goal.update;

    test("post api/main/video/:day /// 성공시, day가 1일 떄 goal_model 한번 호출", async () => {
        const day = "1";

        await video_register(user_id, day, video, final_video);

        expect(model_goal).toBeCalledTimes(1);
        model_goal.mockClear();
    });

    test("post api/main/video/:day /// 성공시, day가 2일 떄 goal_model 한번 호출", async () => {
        const day = "2";

        await video_register(user_id, day, video, final_video);

        expect(model_goal).toBeCalledTimes(1);
        model_goal.mockClear();
    });

    test("post api/main/video/:day /// 성공시, day가 3일 떄 goal_model 한번 호출", async () => {
        const day = "3";

        await video_register(user_id, day, video, final_video);

        expect(model_goal).toBeCalledTimes(1);
        model_goal.mockClear();
    });
});

describe("main_repository , progress_fail", () => {
    const user_id = 1;
    const model_goal = Goal.update;

    test("patch api/main/video/:day/fail /// 성공시 goal_model 한번 호출", async () => {
        await progress_fail(user_id);

        expect(model_goal).toBeCalledTimes(1);
    });
});
