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
});
