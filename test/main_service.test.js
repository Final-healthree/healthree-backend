import {
    main_register,
    find_goal_day,
    video_register,
    progress_fail,
} from "../src/services/main.service.js";

jest.mock("../src/repositories/main.repository.js");
jest.mock("../src/middlewares/s3.middleware.js");

import * as main_repositories from "../src/repositories/main.repository.js";
import * as s3_middlewares from "../src/middlewares/s3.middleware.js";

describe("main_service , main_register", () => {
    const user_id = "1";
    const day1 = "1";
    const day2 = "2";
    const day3 = "3";
    const goal_name = "목표";

    const repositories_layer = main_repositories.main_register;

    test("post api/main/register /// 성공시 저장소 계층 한번 호출", async () => {
        await main_register(user_id, day1, day2, day3, goal_name);

        expect(repositories_layer).toBeCalledTimes(1);
        repositories_layer.mockClear();
    });

    test("post api/main/register /// 실패시 ...", async () => {
        await main_register();

        expect(repositories_layer).toBeCalledTimes(0);
    });
});
