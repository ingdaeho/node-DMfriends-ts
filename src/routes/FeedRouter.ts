import { Router } from "express";
import { FeedController } from "../controllers";
import { validateToken } from "../middlewares";

const router = Router({ mergeParams: true });

router.get("/", FeedController.getFeeds);
router.get("/:feedId/comments", FeedController.getComments);
router.post("/:feedId/comments", validateToken, FeedController.postComment);
router.post("/:feedId/likes", validateToken, FeedController.changeLikeStatus);

export default router;
