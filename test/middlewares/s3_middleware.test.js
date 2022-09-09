import {
    merge_videos,
    delete_videos_s3,
    read_video,
    s3_upload,
    delete_file,
} from "../../src/middlewares/s3.middleware.js";

jest.mock("multer");
jest.mock("multer-s3");
jest.mock("aws-sdk");
jest.mock("dotenv");
jest.mock("fluent-ffmpeg");
jest.mock("fs");

import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";
import fluent_ffmpeg from "fluent-ffmpeg";
import fs from "fs";

describe("s3_middleware merge_videos", () => {
    const video_one = "";
    const video_two = "";
    const video_three = "";
    const kakao_id = "";
});
