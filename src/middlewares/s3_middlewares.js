import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
import fluent_ffmpeg from "fluent-ffmpeg";

dotenv.config();

// s3 접근하기 위한 키 설정
const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
        region: "ap-northeast-2",
    },
});

// s3 버켓에 저장하기 위한 객체
const s3_videoUploader = multerS3({
    s3: s3,
    bucket: "healthree/videos",
    acl: "public-read", // 누구나 파일을 읽을 수 있게 하는 설정
});

export const video_upload = multer({
    limits: {
        fileSize: 2000000,
        // 1초 : 166666
    },
    storage: s3_videoUploader,
});
