import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

import { sequelize } from "./models/index.js";
sequelize
    .sync({ force: false })
    .then(() => console.log("db connect"))
    .catch((err) => console.error(err));

// cors는 나중에 프론트엔드 서버 배포 되면 white list 설정
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

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
