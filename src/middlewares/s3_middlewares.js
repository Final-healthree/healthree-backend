import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
import fluent_ffmpeg from "fluent-ffmpeg";
import path from "path";

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

export const merge_videos = (video_one, video_two, video_three, kakao_id) => {
    try {
        const concatMP4FileTmpPath = "./tmp";
        const concatMP4FilePath = "../combine/output.mp4"; //합쳐질 파일 위치,이름
        const targetFiles = [video_one, video_two, video_three];
        console.log(typeof video_one, typeof video_two, typeof video_three);

        let mergedVideo = fluent_ffmpeg();

        targetFiles.forEach((element) => {
            //목록 추가하기
            mergedVideo = mergedVideo.addInput(element);
        });

        mergedVideo
            .mergeToFile(concatMP4FilePath, concatMP4FileTmpPath) //파일 1개로 만들기
            .on("error", function (error) {
                console.log(error);
            })
            .on("end", function () {
                console.log("finished");
            });
    } catch (error) {
        return { error };
    }
};
