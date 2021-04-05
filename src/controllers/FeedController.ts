import { FeedService } from "../services";
import { errorWrapper } from "../errors";
import { Request, Response } from "express";

const getFeeds = errorWrapper(async (req: Request, res: Response) => {
  const feeds = await FeedService.findFeeds(req.query);
  res.status(200).json(feeds);
});

const getComments = errorWrapper(async (req: Request, res: Response) => {
  const { feedId } = req.params;
  const comments = await FeedService.findComments({ feed_id: Number(feedId) });
  res.status(200).json({ comments });
});

const postComment = errorWrapper(async (req: Request, res: Response) => {
  const { feedId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { contents } = req.body;

  const createdComment = await FeedService.createComment({
    feed_id: Number(feedId),
    user_id: userIdFromToken,
    contents,
  });
  res.status(201).json({ createdComment });
});

const changeLikeStatus = errorWrapper(async (req: Request, res: Response) => {
  const { feedId } = req.params;
  const { id: userIdFromToken } = req.foundUser;

  const foundLikeStatus = await FeedService.findLikeStatus({
    feed_id: Number(feedId),
    user_id: userIdFromToken,
  });

  const changeLikeInput = {
    feed_id: Number(feedId),
    user_id: userIdFromToken,
    id: foundLikeStatus?.id,
  };

  if (!foundLikeStatus) {
    const toLike = await FeedService.changeToLiked({ data: changeLikeInput });
    res.status(200).json({ toLike });
  }

  if (foundLikeStatus) {
    const toNotLiked = await FeedService.deleteLiked({ data: changeLikeInput });
    res.status(200).json({ toNotLiked });
  }
});

export default { getFeeds, getComments, postComment, changeLikeStatus };
