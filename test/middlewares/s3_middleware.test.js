import {
    check_registerd,
    check_progress,
    check_progress_video,
    check_progress_fail,
} from "../../src/validation/main.validation.js";

jest.mock("../../src/models/goal.js");
jest.mock("moment");

import Goal from "../../src/models/goal.js";
import moment from "moment";

describe("main.validation, check_registerd 체크", () => {
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };

    test("check_registerd /// 예외상황 처리, 하루에 두번이상 작심삼일을 등록하려 했을 때 status 400 return", async () => {
        moment().format.mockReturnValue("YYYY-MM-DD");
        Goal.findOne({});
    });
});
