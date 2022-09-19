import {
    check_registerd,
    check_progress,
    check_progress_video,
    check_progress_fail,
} from "../../src/validation/main.validation.js";

jest.mock("../../src/models/goal.js");

import Goal from "../../src/models/goal.js";
import moment from "moment";
import tz from "moment-timezone";
const now = moment().format("YYYY-MM-DD");

describe("main.validation, check_registerd 체크", () => {
    const req = "";
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };
    const next = jest.fn();
    const goal_info = Goal.findOne;

    test("check_registerd, post api/main/register /// Failed to pass exception, 이미 등록된 작심삼일이 있으면 status 400과 message 리턴 ", async () => {
        goal_info.mockReturnValueOnce(Promise.resolve("registered"));

        await check_registerd(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "이미 진행중인 작심삼일이 있습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
    });

    test("check_registerd, post api/main/registerd /// Failed to pass exception, 가장 최근 등록된 작심삼일이 하루가 지나지 않았으면 status 400 message 리턴 ", async () => {
        goal_info.mockReturnValueOnce(Promise.resolve(null));
        goal_info.mockReturnValueOnce(Promise.resolve({ createdAt: now }));

        await check_registerd(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "하루가 지난뒤에 등록 할수 있습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
    });

    test("check_registerd, post api/main/register /// Exception passed,  next 1번 호출 ", async () => {
        await check_registerd(req, res, next);

        expect(next).toBeCalledTimes(1);
    });

    test("check_registerd, post api/main/register /// unknown error 발생시,  catch error => status 400 ", async () => {
        res.locals = null;
        await check_registerd(req, res, next);

        expect(res.status).toBeCalledWith(400);
    });
});

describe("main.validation, check_progress 체크", () => {
    const req = "";
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };
    const next = jest.fn();
    const goal_info = Goal.findOne;

    test("check_progress, get api/main/goal_day /// Failed to pass exception, 등록된 작심삼일이 없을 때 status 400 message 리턴", async () => {
        goal_info.mockReturnValue(Promise.resolve(null));
        await check_progress(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "진행중인 작심삼일이 없습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
        next.mockClear();
    });

    test("check_progress, get api/main/goal_day /// Exception passed, next 1번 호출", async () => {
        goal_info.mockReturnValue(Promise.resolve("등록된 작심삼일"));
        await check_progress(req, res, next);

        expect(next).toBeCalledTimes(1);
    });

    test("check_progress, get api/main/goal_day /// unknown error 발생시,  catch error => status 400 ", async () => {
        const req = { params: { day: "" } };
        res.locals = null;

        await check_progress(req, res, next);

        expect(res.status).toBeCalledWith(400);
    });
});

describe("main.validation, check_progress_video 체크", () => {
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };
    const next = jest.fn();
    const goal_info = Goal.findOne;

    test("check_progress_video, post api/main/video/:day/// Failed to pass exception, day가 1,2,3이 아닐때", async () => {
        const req = { params: { day: "" } };

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ success: false, message: "날짜를 확인해주세요" });
        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_video, post api/main/video/:day/// Failed to pass exception, day가 1 or 2 or 3이고, 진행중인 작심삼일이 없을 때", async () => {
        const req = { params: { day: "1" } };
        goal_info.mockReturnValue(null);

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "진행중인 작심삼일이 없습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_video, post api/main/video/:day/// Failed to pass exception, day가 1 이고, video1에 등록된 비디오가 있을 때", async () => {
        const req = { params: { day: "1" } };
        goal_info.mockReturnValue({ video1: 1 });

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "이미 동영상이 등록되어 있습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_video, post api/main/video/:day/// Failed to pass exception, day가 2 이고, video1에 등록된 비디오가 없을 때", async () => {
        const req = { params: { day: "2" } };
        goal_info.mockReturnValue({ video1: null });

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "전 동영상을 올리지 않았습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_video, post api/main/video/:day/// Failed to pass exception, day가 2 이고, video1, video2에 등록된 비디오가 있을 때", async () => {
        const req = { params: { day: "2" } };
        goal_info.mockReturnValue({ video1: 1, video2: 2 });

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "이미 동영상이 등록되어 있습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_video, post api/main/video/:day/// Failed to pass exception, day가 3 이고, video1에 비디오가 있고 video2에 비디오가 없을 때", async () => {
        const req = { params: { day: "3" } };
        goal_info.mockReturnValue({ video1: 1, video2: null });

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "전 동영상을 올리지 않았습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_video, post api/main/video/:day/// Failed to pass exception, day가 3 이고, video1에 비디오가 없고 video2에 비디오가 있을 때", async () => {
        const req = { params: { day: "3" } };
        goal_info.mockReturnValue({ video1: null, video2: 2 });

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "전 동영상을 올리지 않았습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_video, post api/main/video/:day/// Failed to pass exception, day가 3 이고, video1,2,3 모두 비디오가 있을 때", async () => {
        const req = { params: { day: "3" } };
        goal_info.mockReturnValue({ video1: 1, video2: 2, video3: 3 });

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "이미 동영상이 등록되어 있습니다.",
        });
        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_video, post api/main/video/:day/// Exception passed, next 1번 호출", async () => {
        const req = { params: { day: "3" } };
        goal_info.mockReturnValue({ video1: 1, video2: 2, video3: null });

        await check_progress_video(req, res, next);

        expect(next).toBeCalledTimes(1);
    });

    test("check_progress_video, post api/main/video/:day/// unknown error 발생시,  catch error => status 400 ", async () => {
        const req = { params: { day: "" } };
        res.locals = null;

        await check_progress_video(req, res, next);

        expect(res.status).toBeCalledWith(400);
    });
});

describe("main.validation, check_progress_fail 체크", () => {
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };
    const next = jest.fn();
    const goal_info = Goal.findOne;

    test("check_progress_fail, patch api/main/video/:day/fail /// Failed to pass exception, day가 1,2,3이 아닐때", async () => {
        const req = { params: { day: "" } };

        await check_progress_fail(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "날짜를 확인해주세요",
        });

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// Failed to pass exception, day가 1 or 2 or 3이고, 진행중인 작심삼일이 없을 때", async () => {
        const req = { params: { day: "1" } };

        goal_info.mockReturnValue(Promise.resolve(null));

        await check_progress_fail(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "진행중인 작심삼일이 없습니다.",
        });

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// Failed to pass exception, day가 1 이고, video1에 등록된 비디오가 있을 때", async () => {
        const req = { params: { day: "1" } };

        goal_info.mockReturnValue(Promise.resolve({ video1: 1 }));

        await check_progress_fail(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "첫째날은 이미 성공했습니다.",
        });

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// Failed to pass exception, day가 2 이고, video1에 등록된 비디오가 없을 때", async () => {
        const req = { params: { day: "2" } };

        goal_info.mockReturnValue(Promise.resolve({ video1: null }));

        await check_progress_fail(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "전 동영상을 올리지 않았습니다.",
        });

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// Failed to pass exception, day가 2 이고, video1,2에 등록된 비디오가 있을 때", async () => {
        const req = { params: { day: "2" } };

        goal_info.mockReturnValue(Promise.resolve({ video1: 1, video2: 2 }));

        await check_progress_fail(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "둘째날은 이미 성공했습니다.",
        });

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// Failed to pass exception, day가 3 이고, video1에 비디오가 있고 video2에 비디오가 없을 때", async () => {
        const req = { params: { day: "3" } };

        goal_info.mockReturnValue(Promise.resolve({ video1: 1, video2: null }));

        await check_progress_fail(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "전 동영상을 올리지 않았습니다.",
        });

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// Failed to pass exception, day가 3 이고, video1에 비디오가 없고 video2에 비디오가 있을 때", async () => {
        const req = { params: { day: "3" } };

        goal_info.mockReturnValue(Promise.resolve({ video1: null, video2: 2 }));

        await check_progress_fail(req, res, next);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: "전 동영상을 올리지 않았습니다.",
        });

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
        next.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// Failed to pass exception, day가 3 이고, video1,2 둘다 비디오가 있을 때", async () => {
        const req = { params: { day: "3" } };

        goal_info.mockReturnValue(Promise.resolve({ video1: 1, video2: 2 }));

        await check_progress_fail(req, res, next);

        expect(next).toBeCalledTimes(1);

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
        next.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// Exception passed, next 1번 호출", async () => {
        const req = { params: { day: "1" } };

        goal_info.mockReturnValue(Promise.resolve({ video1: null }));

        await check_progress_fail(req, res, next);

        expect(next).toBeCalledTimes(1);

        res.status.mockClear();
        res.json.mockClear();
        goal_info.mockClear();
    });

    test("check_progress_fail, patch api/main/video/:day/fail /// unknown error 발생시, catch error => status 400", async () => {
        const req = { params: { day: "" } };
        res.locals = null;

        await check_progress_fail(req, res, next);

        expect(res.status).toBeCalledWith(400);
    });
});
