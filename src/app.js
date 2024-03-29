import express from "express";
<<<<<<< HEAD

=======
import cors from "cors";
import router from "./routes/index.js";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import passport_config from "./passport/index.js";
import path from "path";
>>>>>>> aae08e81cf3fd918b0b85247706e7237f73e0ee0
import { sequelize } from "./models/index.js";
const port = 3000;

dotenv.config({ path: path.resolve(".env") });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set("port", process.env.PORT || 3000);

<<<<<<< HEAD
sequelize
    .sync({ force: true })
    .then(() => console.log("db connect"))
    .catch((err) => console.error(err));
=======
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

/* const corsOptions = {
    origin: ["http://localhost:3000", "https://www.healthree3.com"],
    credentials: true,
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD"],
};

app.use(cors(corsOptions)); */

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD"],
        optionSuccessStatus: 200,
    }),
);

app.use("/api", router);
>>>>>>> aae08e81cf3fd918b0b85247706e7237f73e0ee0

app.use((req, res, next) => {
    const error = new Error(
        `메서드 ${req.method} 경로 ${req.url} 존재하지 않습니다.`
    );
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

app.listen(port, () => {
    console.log(`listening ${port}`);
});
