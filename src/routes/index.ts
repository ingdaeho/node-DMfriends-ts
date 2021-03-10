import { Router } from "express";
import UserRouter from "./UserRouter";
import FeedRouter from "./FeedRouter";
import ProductRouter from "./ProductRouter";

const router = Router({ mergeParams: true });

router.use("/users", UserRouter);
router.use("/feeds", FeedRouter);
router.use("/products", ProductRouter);

export default router;
