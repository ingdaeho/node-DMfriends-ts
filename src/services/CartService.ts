import prisma from "../prisma";

const PRODUCTS_DEFAULT_OFFSET = 0;
const PRODUCTS_DEFAULT_LIMIT = 5;

const findCart = (fields) => {
  const { user_id, product_id } = fields;
  return prisma.cart.findFirst({
    where: {
      user_id,
      product_id,
      deleted_at: null,
    },
  });
};

const getItems = (fields) => {
  const { user_id, query } = fields;
  const { offset, limit } = query;
  return prisma.cart.findMany({
    where: {
      user_id,
      deleted_at: null,
    },
    select: {
      id: true,
      products: {
        select: {
          id: true,
          name: true,
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
      },
      quantity: true,
      price: true,
    },
    skip: Number(offset) || PRODUCTS_DEFAULT_OFFSET,
    take: Number(limit) || PRODUCTS_DEFAULT_LIMIT,
    orderBy: {
      created_at: "desc",
    },
  });
};

const addItem = async (fields) => {
  const { user_id, product_id, quantity, price } = fields;
  const foundCart = await prisma.cart.findFirst({
    where: {
      user_id,
      product_id,
      deleted_at: null,
    },
  });

  if (!foundCart)
    return prisma.cart.create({
      data: {
        product_id,
        user_id,
        quantity,
        price,
      },
    });

  if (foundCart)
    return prisma.cart.update({
      where: {
        id: foundCart.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
        updated_at: new Date(),
      },
    });
};

const changeProductValue = (fields) => {
  const { id, quantity } = fields;
  return prisma.cart.update({
    where: { id },
    data: {
      quantity,
      updated_at: new Date(),
    },
  });
};

const deleteSelectedItem = async (fields) => {
  const { selectedItems, user_id } = fields;

  const deleteItems = selectedItems.map(({ product_id }) => {
    return prisma.cart.updateMany({
      where: {
        user_id,
        product_id,
        deleted_at: null,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  });
  await prisma.$transaction(deleteItems);
  return prisma.cart.findMany({
    where: {
      user_id,
      deleted_at: null,
    },
  });
};
export default {
  findCart,
  getItems,
  addItem,
  changeProductValue,
  deleteSelectedItem,
};
