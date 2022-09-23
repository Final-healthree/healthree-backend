import express from "express";
import * as comment_controller from "../3_layers/controllers/comment.controller.js";
import * as comment_exception_handler from "../middlewares/comment.exception.middleware.js";
import { auth_middleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:post_id", comment_exception_handler.get_comments, comment_controller.get_comments);
router.post(
    "/:post_id",
    auth_middleware,
    comment_exception_handler.create_comment,
    comment_controller.create_comment,
);
router.put(
    "/:comment_id",
    auth_middleware,
    comment_exception_handler.update_comment,
    comment_controller.update_comment,
);

router.delete(
    "/:comment_id",
    auth_middleware,
    comment_exception_handler.delete_comment,
    comment_controller.delete_comment,
);
export default router;
