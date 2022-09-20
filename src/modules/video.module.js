import aws from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs";
import editly from "editly";

dotenv.config();

// s3 접근하기 위한 키 설정
const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
        region: "ap-northeast-2",
    },
});

export const merge_videos = async (video_one, video_two, video_three, kakao_id) => {
    const edit_spec = {
        width: 480,
        height: 720,
        fps: 15,
        outPath: `./src/combine/${kakao_id}.mp4`, //합쳐질 파일 위치,이름
        clips: [
            {
                transition: { name: "fade" },
                layers: [
                    {
                        type: "video",
                        path: video_one,
                        resizeMode: "stretch",
                    },
                ],
            },
            {
                transition: { name: "fade" },
                layers: [
                    {
                        type: "video",
                        path: video_two,
                        resizeMode: "stretch",
                    },
                ],
            },
            {
                transition: { name: "fade" },
                layers: [
                    {
                        type: "video",
                        path: video_three,
                        resizeMode: "stretch",
                    },
                ],
            },
        ],
    };
    await editly(edit_spec);
};

export const create_video_s3_objects = (video_one, video_two, video_three) => {
    if (video_one !== undefined && video_two === undefined && video_three === undefined) {
        const objects = {
            Bucket: "healthree",
            Delete: {
                Objects: [
                    {
                        Key: `videos/${video_one}`,
                    },
                ],
            },
        };
        return objects;
    }

    if (video_one !== undefined && video_two !== undefined && video_three === undefined) {
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
                ],
            },
        };
        return objects;
    }

    if (video_one !== undefined && video_two !== undefined && video_three !== undefined) {
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
        return objects;
    }
};

export const delete_video_s3 = (object) => {
    s3.deleteObjects(object, (error, data) => {
        if (error) {
            throw error;
        }
    });
    return;
};

export const read_video = async (kakao_id) => {
    const file = fs.createReadStream(`./src/combine/${kakao_id}.mp4`, { flags: "r" });

    return file;
};

export const upload_video_s3 = async (file) => {
    const params = {
        Bucket: "healthree/videos",
        Key: String(new Date().getTime() + Math.random()),
        ACL: "public-read", // 권한: 도메인에 객체경로 URL 을 입력하여 접근 가능하게 설정
        Body: file,
        ContentType: "video/mp4",
    };
    const s3_upload = await s3.upload(params).promise();

    return s3_upload;
};

export const delete_video_file = async (file_name) => {
    fs.unlink(file_name, (error) => {
        if (error) {
            throw error;
        }
    });
};
