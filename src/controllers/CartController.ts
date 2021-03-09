import { CartService } from "../services";
import { errorWrapper, errorGenerator } from "../errors";
import { Request, Response } from "express";

const getCartItems = errorWrapper(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { query } = req;

  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const cartItems = await CartService.getItems({
    user_id: userIdFromToken,
    query,
  });
  res.status(200).json({ cartItems });
});

const addItem = errorWrapper(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { product_id, quantity, price } = req.body;
  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const foundCart = await CartService.findCart({
    user_id: userIdFromToken,
    product_id,
  });

  const addItemInput = {
    user_id: userIdFromToken,
    product_id,
    quantity,
    price,
    cartId: foundCart?.product_id === product_id && foundCart.id,
  };

  const itemAdded = await CartService.addItem(addItemInput);
  res.status(201).json({ itemAdded });
});

const changeQuantity = errorWrapper(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const { quantity, product_id } = req.body;

  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const foundCart = await CartService.findCart({
    user_id: userIdFromToken,
    product_id,
  });
  const { id: idFromCart } = foundCart;

  const changedQuantity = await CartService.changeProductValue({
    id: idFromCart,
    quantity,
  });
  res.status(201).json({ changedQuantity });
});

const deleteChosenItem = errorWrapper(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { id: userIdFromToken } = req.foundUser;
  const selectedItems = req.body;
  console.log(req.body);
  if (Number(userId) !== userIdFromToken)
    errorGenerator({ statusCode: 403, message: "Unauthorized" });

  const deletedSelectedItem = await CartService.deleteSelectedItem({
    user_id: userIdFromToken,
    selectedItems,
  });
  res.status(201).json({ deletedSelectedItem });
});

export default {
  getCartItems,
  addItem,
  changeQuantity,
  deleteChosenItem,
};
