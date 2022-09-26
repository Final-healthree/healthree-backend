import aws from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs";
import editly from "editly";
import path from "path";
import fluent_ffmpeg from "fluent-ffmpeg";
// let ffmpeg = fluent_ffmpeg();

dotenv.config({ path: path.resolve(".env") });

// s3 접근하기 위한 키 설정
const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
        region: "ap-northeast-2",
    },
});

export const merge_videos = async (video_one, video_two, video_three, social_id) => {
    const edit_spec = {
        width: 480,
        height: 720,
        fps: 15,
        outPath: `./src/combine/${social_id}.mp4`, //합쳐질 파일 위치,이름
        /*      audioFilePath: "./src/bgm/bgm.mp3",
        loopAudio: true, */
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
        /*  audioTracks: [
            {
                path: "./src/bgm/bgm.mp3",
                mixVolume: 50,
            },
        ], */
    };
    await editly(edit_spec);
};

export const create_thumbnail = async (kakao_id) => {
    return new Promise((resolve, reject) => {
        fluent_ffmpeg(`./src/combine/${kakao_id}.mp4`)
            .on("end", () => {
                resolve();
                console.log("create thumbnail");
            })
            .on("error", (error) => {
                console.log(error);
            })
            .screenshots({
                // timestamps: "50%",
                count: 1,
                filename: `${kakao_id}.jpg`,
                folder: "./src/thumbnail",
                size: "340x340",
            });
    });
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

export const read_file = async (kakao_id) => {
    const video = fs.createReadStream(`./src/combine/${kakao_id}.mp4`, { flags: "r" });
    const thumbnail = fs.createReadStream(`./src/thumbnail/${kakao_id}.jpg`, { flags: "r" });

    return { video, thumbnail };
};

export const upload_video_s3 = async (video, thumbnail) => {
    const video_object = {
        Bucket: "healthree/videos",
        Key: String(new Date().getTime() + Math.random()),
        ACL: "public-read", // 권한: 도메인에 객체경로 URL 을 입력하여 접근 가능하게 설정
        Body: video,
        ContentType: "video/mp4",
    };
    const thumbnail_object = {
        Bucket: "healthree/images",
        Key: String(new Date().getTime() + Math.random()),
        ACL: "public-read",
        Body: thumbnail,
        ContentType: "image/jpg",
    };
    const s3_upload_video = await s3.upload(video_object).promise();
    const s3_upload_thumbnail = await s3.upload(thumbnail_object).promise();

    return { s3_upload_video, s3_upload_thumbnail };
};

export const delete_video_thumbnail = async (kakao_id) => {
    fs.unlink(`./src/combine/${kakao_id}.mp4`, (error) => {
        if (error) {
            throw error;
        }
    });
    fs.unlink(`./src/thumbnail/${kakao_id}.jpg`, (error) => {
        if (error) {
            throw error;
        }
    });
};
