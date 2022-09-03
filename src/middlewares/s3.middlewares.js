import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
import fluent_ffmpeg from "fluent-ffmpeg";
import fs from "fs";

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

export const merge_videos = async (video_one, video_two, video_three, kakao_id) => {
    try {
        const concatMP4FileTmpPath = "./tmp";
        const concatMP4FilePath = `./src/combine/${kakao_id}.mp4`; //합쳐질 파일 위치,이름
        const targetFiles = [video_one, video_two, video_three];

        let mergedVideo = fluent_ffmpeg();

        targetFiles.forEach((element) => {
            //목록 추가하기
            mergedVideo = mergedVideo.addInput(element);
        });

        // 이 부분 함수 알아보기
        function sleep(ms) {
            return new Promise((r) => setTimeout(r, ms));
        }

        //파일 1개로 만들기
        mergedVideo.mergeToFile(concatMP4FilePath, concatMP4FileTmpPath).on("end", function () {
            console.log("finished");
        });
        await sleep(3000);
        return true;
    } catch (error) {
        return { error };
    }
};

export const delete_videos = (video_one, video_two, video_three) => {
    try {
        const objects = {
            Bucket: "healthree",
            Delete: {
                Objects: [
                    {
                        Key: `videos/${video_one}`,
                    },
                    {
                        Key: `videos/${video_two}`,
                    },
                    {
                        Key: `videos/${video_three}`,
                    },
                ],
            },
        };
        s3.deleteObjects(objects, (error, data) => {
            if (error) {
                console.log(error);
            }
        });
    } catch (error) {
        return { error };
    }
};

export const s3_upload = async (kakao_id) => {
    const file = fs.createReadStream(`./src/combine/${kakao_id}.mp4`, { flags: "r" });
    const params = {
        Bucket: "healthree/videos",
        Key: String(new Date().getTime() + Math.random()),
        ACL: "public-read", // 권한: 도메인에 객체경로 URL 을 입력하여 접근 가능하게 설정
        Body: file,
        ContentType: "video/mp4",
    };
    function sleep(ms) {
        return new Promise((r) => setTimeout(r, ms));
    }
    s3.upload(params, async (error, data) => {
        if (error) {
            console.log(error);
        }
        console.log(data.Location);
    });

    await sleep(6000);
};
