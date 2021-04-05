import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "../services";
import { errorWrapper, errorGenerator } from "../errors";
import { Request, Response } from "express";
import { userCreateInput } from "../services/UserService";
const { AUTH_TOKEN_SALT } = process.env;

const signUp = errorWrapper(async (req: Request, res: Response) => {
  const {
    email,
    password,
    confirm_password,
    username,
  }: userCreateInput = req.body;

  if (password !== confirm_password)
    errorGenerator({
      statusCode: 400,
      message: "Password confirmation does not match password",
    });

  const foundUser = await UserService.findUser({ email });
  if (foundUser) errorGenerator({ statusCode: 409, message: "duplicated" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await UserService.createUser({
    email,
    password: hashedPassword,
    confirm_password: hashedPassword,
    username,
  });

  res.status(201).json({
    message: "user created",
    email: createdUser.email,
  });
});

const logIn = errorWrapper(async (req: Request, res: Response) => {
  const { email, password: inputPassword }: userCreateInput = req.body;
  const foundUser = await UserService.findUser({ email });
  if (!foundUser)
    errorGenerator({ statusCode: 400, message: "아이디를 확인해주세요" });

  const { id, password: hashedPassword } = foundUser;
  const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);
  if (!isValidPassword)
    errorGenerator({ statusCode: 400, message: "비밀번호를 확인해주세요" });

  const token = jwt.sign({ id }, AUTH_TOKEN_SALT);
  res.status(200).json({ message: "로그인 성공!", token });
});

const getUserInfo = errorWrapper(async (req: Request, res: Response) => {
  const { id } = req.foundUser;

  const userInfo = await UserService.findUser({ id });
  res.status(200).json({ userInfo });
});

export default {
  signUp,
  logIn,
  getUserInfo,
};
