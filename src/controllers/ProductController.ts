import { ProductService } from "../services";
import { errorWrapper } from "../errors";
import { Request, Response } from "express";

const getProducts = errorWrapper(async (req: Request, res: Response) => {
  const products = await ProductService.findProducts(req.query);
  res.status(200).json({ products });
});

const getOneProduct = errorWrapper(async (req: Request, res: Response) => {
  const { id: userIdFromToken } = req.foundUser;
  const { productId } = req.params;
  const { query } = req;

  const productDetail = await ProductService.findDetailInfo({
    product_id: productId,
    user_id: userIdFromToken,
    query,
  });
  res.status(200).json({ productDetail });
});

const getRecentViews = errorWrapper(async (req: Request, res: Response) => {
  const { id: userIdFromToken } = req.foundUser;
  const { productId } = req.params;
  const { query } = req;

  const recentViews = await ProductService.findRecentViews({
    product_id: productId,
    user_id: userIdFromToken,
    query,
  });
  res.status(200).json({ recentViews });
});

export default { getProducts, getOneProduct, getRecentViews };
