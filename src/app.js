import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import morgan from "morgan";
import { sequelize } from "./models/index.js";
import dotenv from "dotenv";
import passport from "passport";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

sequelize;
console.log("db 연결", sequelize.config.port);

app.use(
    cors({
        origin: true,
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
