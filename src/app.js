import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import passport_config from "./passport/index.js";
import path from "path";
import { sequelize } from "./models/index.js";

dotenv.config({ path: path.resolve(".env") });

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

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

/* app.use("/", (req, res) => {
    const cors = req.headers;
    const host = req.headers.host;
    const userIP = req.socket.remoteAddress;
    console.log(cors);
    console.log(host, "///", userIP);
    res.json("");
}); */

const whitelist = [
    "http://prac-ye.s3-website.ap-northeast-2.amazonaws.com/",
    "http://wetube-phenomenonlee.shop:80/",
];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            // 만일 whitelist 배열에 origin인자가 있을 경우
            callback(null, true); // cors 허용
        } else {
            callback(new Error("Not Allowed Origin!")); // cors 비허용
        }
    },
};
app.use(cors(corsOptions));

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
