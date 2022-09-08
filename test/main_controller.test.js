import {
    main_register,
    find_goal_day,
    video_register,
    progress_fail,
} from "../src/controllers/main.controller.js";

jest.mock("../src/services/main.service.js");
import * as main_services from "../src/services/main.service.js";

describe("main_controller , main_register", () => {
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };
    const req = { body: { day1: "1", day2: "2", day3: "3", goal_name: "목표" } };
    const service_layer = main_services.main_register;

    test("post api/main/register /// 성공시, 서비스 계층 한번 호출, status 200, json 객체 반환", async () => {
        await main_register(req, res);

        expect(service_layer).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            success: true,
            messgae: "작심삼일 등록 완료",
        });
        res.status.mockClear();
        service_layer.mockClear();
    });

    test("post api/main/register /// 실패시, catch error  => status 400", async () => {
        req.body = null;
        await main_register(req, res);

        expect(service_layer).toBeCalledTimes(0);
        expect(res.status).toBeCalledWith(400);
    });
});

describe("main_controller , find_goal_day", () => {
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };
    const req = { params: { day: "" } };

    const service_layer = main_services.find_goal_day.mockReturnValue({
        goal: "목표",
        day: "날짜",
    });

    test("get api/main/goal_day/:day /// 성공시, 서비스 계층 한번 호출, status 200, json 객체 반환", async () => {
        await find_goal_day(req, res);

        expect(service_layer).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            success: true,
            result: { goal: "목표", date_n: "날짜" },
        });
        res.status.mockClear();
        service_layer.mockClear();
    });

    test("get api/main/goal_day/:day /// 실패시, catch error  => status 400", async () => {
        req.params = null;
        await find_goal_day(req, res);

        expect(service_layer).toBeCalledTimes(0);
        expect(res.status).toBeCalledWith(400);
    });
});

describe("main_controller , video_register", () => {
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };
    const service_layer = main_services.video_register;

    test("post api/main/video/:day /// 성공시, req.file이 있고, day가 3이 아닐때", async () => {
        const req = { params: { day: "" }, file: { location: "" } };

        await video_register(req, res);

        expect(service_layer).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            success: true,
            message: "동영상 업로드 완료",
        });
        service_layer.mockClear();
        res.status.mockClear();
    });

    test("post api/main/video/:day /// 성공시, req.file이 있고, day가 3일 때", async () => {
        const req = { params: { day: "3" }, file: { location: "" } };

        await video_register(req, res);

        expect(service_layer).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            success: true,
            message: "동영상 합치기 완료",
        });
        service_layer.mockClear();
        res.status.mockClear();
    });

    test("post api/main/video/:day /// 실패시, req.file이 없을 때", async () => {
        const req = { params: { day: "3" } };

        await video_register(req, res);

        expect(service_layer).toBeCalledTimes(0);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            success: false,
            message: `비디오 파일을 올려주세요`,
        });
        service_layer.mockClear();
        res.status.mockClear();
    });

    test("post api/main/video/:day /// 실패시, catch error  => status 400", async () => {
        const req = { params: null };

        await video_register(req, res);

        expect(service_layer).toBeCalledTimes(0);
        expect(res.status).toBeCalledWith(400);
    });
});

describe("main_controller , progress_fail", () => {
    const res = {
        json: jest.fn(),
        locals: { user_id: 1 },
        status: jest.fn(() => res),
    };
    const req = "";
    const service_layer = main_services.progress_fail;

    test("patch api/main/video/:day/fail /// 성공시, 서비스 계층 한번 호출, status 200, json 객체 반환 ", async () => {
        await progress_fail(req, res);

        expect(service_layer).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);

        service_layer.mockClear();
        res.status.mockClear();
    });

    test("patch api/main/video/:day/fail /// 실패시, status 400 ", async () => {
        res.locals = null;
        await progress_fail(req, res);

        expect(service_layer).toBeCalledTimes(0);
        expect(res.status).toBeCalledWith(400);
    });
});
