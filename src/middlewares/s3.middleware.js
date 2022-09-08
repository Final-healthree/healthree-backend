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
    // 이 방법이 어떤 것인지 정확하게 알아보기
    return new Promise((resolve, reject) => {
        try {
            const concatMP4FileTmpPath = "./tmp";
            const concatMP4FilePath = `./src/combine/${kakao_id}.mp4`; //합쳐질 파일 위치,이름
            const targetFiles = [video_one, video_two, video_three];

            let merged_video = fluent_ffmpeg();

            targetFiles.forEach((element) => {
                //목록 추가하기
                merged_video = merged_video.addInput(element);
            });

            //파일 1개로 만들기
            merged_video
                .mergeToFile(concatMP4FilePath, concatMP4FileTmpPath)
                .on("error", (error) => {
                    resolve();
                    throw error;
                })
                .on("end", () => {
                    resolve();
                });
        } catch (error) {
            throw error;
        }
    });
};

export const delete_videos_s3 = (video_one, video_two, video_three) => {
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
                throw error;
            }
        });
    } catch (error) {
        throw error;
    }
};

export const read_video = async (kakao_id) => {
    try {
        const file = fs.createReadStream(`./src/combine/${kakao_id}.mp4`, { flags: "r" });

        return file;
    } catch (error) {
        throw error;
    }
};

export const s3_upload = async (file) => {
    try {
        const params = {
            Bucket: "healthree/videos",
            Key: String(new Date().getTime() + Math.random()),
            ACL: "public-read", // 권한: 도메인에 객체경로 URL 을 입력하여 접근 가능하게 설정
            Body: file,
            ContentType: "video/mp4",
        };
        const s3_upload = await s3.upload(params).promise();

        return s3_upload;
    } catch (error) {
        throw error;
    }
};

export const delete_file = async (file_name) => {
    try {
        fs.unlink(file_name, (error) => {
            if (error) {
                throw error;
            }
        });
    } catch (error) {
        throw error;
    }
};
