import { Router } from "express";
import { UserController, CartController } from "../controllers";
import { validateToken } from "../middlewares";
import { body } from "express-validator";

const router = Router({ mergeParams: true });

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isStrongPassword(),
  UserController.signUp
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isStrongPassword(),
  UserController.logIn
);

router.get("/", validateToken, UserController.getUserInfo);

// cart
router.get("/:userId/cart", validateToken, CartController.getCartItems);
router.post("/:userId/cart", validateToken, CartController.addItem);
router.put("/:userId/cart", validateToken, CartController.changeQuantity);
router.delete("/:userId/cart", validateToken, CartController.deleteChosenItem);

export default router;
