import { Router } from "express";
import { ProductController } from "../controllers";
import { validateToken } from "../middlewares";

const router = Router({ mergeParams: true });

router.get("/", ProductController.getProducts);
router.get("/:productId", validateToken, ProductController.getOneProduct);
router.get(
  "/:productId/recentViews",
  validateToken,
  ProductController.getRecentViews
);

export default router;
