import {
    main_register,
    find_goal_day,
    video_register,
    progress_fail,
} from "../src/repositories/main.repository.js";

jest.mock("../src/models/goal.js");
import Goal from "../src/models/goal.js";

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

    test("post api/main/register /// 실패시, Goal 모델 호출 안 함", async () => {
        model_goal.mockReturnValue(Promise.reject());

        await main_register(user_id, day1, day2, day3, goal_name);
        expect(model_goal).toBeCalledTimes(0);
    });
});
