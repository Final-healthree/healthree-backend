import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import passport_config from "./passport/index.js";

import { sequelize } from "./models/index.js";
import User from "./models/user.js";
import Goal from "./models/goal.js";
import Video from "./models/video.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

dotenv.config();
passport_config();

app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());

sequelize;
console.log("db 연결", sequelize.config.port);

const db_test = async (req, res) => {
    await Goal.create({ goal_name: "수영", day1: "0", day2: "0", day3: "0", user_id: 1 });
    await Video.create({ goal_id: 1, user_id: 1, status: "progress" });
};
// db_test();

const status_test = async (req, res) => {
    await Goal.update(
        {
            status: "fail",
        },
        {
            where: { user_id: 1, status: "progress" },
        },
    );
};
// status_test();

const include_test = async (req, res) => {
    const test = await Goal.findOne({ where: { user_id: 1 }, include: { model: Video } });
    console.log(test);
};
// include_test();

app.use(
    cors({
        origin: "*",
        credentials: true,
    }),
);
// cors는 나중에 프론트엔드 서버 배포 되면 white list 설정

app.use("/api", router);

app.use((req, res, next) => {
    const error = new Error(`메서드 ${req.method} 경로 ${req.url} 존재하지 않습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    return res.json({
        success: false,
        message: err.message,
        result: err,
    });
});

app.listen(app.get("port"), () => console.log(3000));
