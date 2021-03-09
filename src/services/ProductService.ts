import prisma from "../prisma";

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 8;

const findProducts = (query) => {
  const { offset, limit, ...fields } = query;
  return prisma.products.findMany({
    include: {
      product_images: {
        select: {
          image_url: true,
          product_image_types: true,
        },
        where: {
          product_image_types: {
            name: {
              equals: "thumbnail",
            },
          },
        },
      },
    },
    skip: Number(offset) || DEFAULT_OFFSET,
    take: Number(limit) || DEFAULT_LIMIT,
  });
};

const findDetailInfo = async (fields) => {
  const { product_id, user_id, query } = fields;
  const { offset, limit } = query;

  const getDetailInfo = await prisma.products.findUnique({
    where: { id: Number(product_id) },
    include: {
      product_images: {
        select: {
          image_url: true,
          product_image_types: true,
        },
      },
      reviews: {
        select: {
          id: true,
          users: {
            select: {
              username: true,
            },
          },
          contents: true,
          review_rate: true,
          liked_num: true,
          isLiked: true,
          created_at: true,
        },
        skip: Number(offset) || DEFAULT_OFFSET,
        take: Number(limit) || DEFAULT_LIMIT,
        orderBy: {
          liked_num: "desc",
        },
      },
    },
  });
  return getDetailInfo;
};

const findRecentViews = async (fields) => {
  const { product_id, user_id, query } = fields;
  const { offset, limit } = query;
  const foundRecentViews = await prisma.recent_views.findFirst({
    where: {
      product_id: Number(product_id),
      user_id,
    },
  });

  if (!foundRecentViews)
    await prisma.recent_views.create({
      data: {
        product_id: Number(product_id),
        user_id,
      },
    });

  await prisma.recent_views.update({
    where: {
      id: foundRecentViews.id,
    },
    data: {
      viewed_at: new Date(),
    },
  });

  return prisma.recent_views.findMany({
    where: {
      user_id,
      product_id: {
        not: Number(product_id),
      },
    },
    select: {
      products: {
        select: {
          name: true,
          price: true,
          product_images: {
            select: {
              image_url: true,
            },
            where: {
              product_image_types: {
                name: {
                  equals: "thumbnail",
                },
              },
            },
          },
        },
      },
    },
    skip: Number(offset) || DEFAULT_OFFSET,
    take: Number(limit) || DEFAULT_LIMIT,
    orderBy: {
      viewed_at: "desc",
    },
  });
};

export default { findProducts, findDetailInfo, findRecentViews };
