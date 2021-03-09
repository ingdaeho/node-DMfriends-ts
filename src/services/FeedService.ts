import prisma from "../prisma";

const FEEDS_DEFAULT_OFFSET: number = 0;
const FEEDS_DEFAULT_LIMIT: number = 5;

export interface feedServiceInputs {
  offset?: number;
  limit?: number;
  feed_id?: number;
  user_id?: number;
  contents?: string;
}

const findFeeds = (query: feedServiceInputs) => {
  const { offset, limit } = query;

  return prisma.feeds.findMany({
    where: {
      deleted_at: null,
    },
    include: {
      characters: {
        select: {
          name: true,
        },
      },
      feed_images: {
        select: {
          image_url: true,
        },
      },
      feed_comments: {
        select: {
          user_id: true,
          contents: true,
        },
      },
      likes: {},
    },
    skip: offset || FEEDS_DEFAULT_OFFSET,
    take: limit || FEEDS_DEFAULT_LIMIT,
    orderBy: {
      created_at: "desc",
    },
  });
};

export interface commentSearchInput {
  feed_id: number;
}

const findComments = (fields: commentSearchInput) => {
  const { feed_id } = fields;
  return prisma.feed_comments.findMany({
    where: { feed_id, deleted_at: null },
    orderBy: {
      created_at: "desc",
    },
  });
};

export interface commentCreateInput {
  feed_id: number;
  user_id: number;
  contents: string;
}

const createComment = (data: commentCreateInput) => {
  return prisma.feed_comments.create({ data });
};

export interface likeStatusSearchInput {
  feed_id: number;
  user_id: number;
}

const findLikeStatus = (fields: likeStatusSearchInput) => {
  const { feed_id, user_id } = fields;
  return prisma.likes.findFirst({
    where: {
      feed_id,
      user_id,
    },
  });
};

const changeToLiked = (fields) => {
  const { feed_id, user_id } = fields;
  return prisma.likes.create({
    data: {
      feed_id,
      user_id,
    },
  });
};

const deleteLiked = (fields) => {
  const { id: foundStatusId } = fields;
  return prisma.likes.delete({
    where: {
      id: foundStatusId,
    },
  });
};

export default {
  findFeeds,
  findComments,
  createComment,
  changeToLiked,
  deleteLiked,
  findLikeStatus,
};
