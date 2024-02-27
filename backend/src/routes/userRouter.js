import { Router } from "express";
import {
  createUser,
  loginAdmin,
  loginUser,
  logout,
  verifyEmail,
} from "../controller/userController.js";
import isAuthenticatedForEmail from "../middleware/isAuthenticatedForEmail.js";

let userRouter = Router();

//localhost:8000/users/verify-email

userRouter.route("/").post(createUser);

userRouter.route("/verify-email").post(isAuthenticatedForEmail, verifyEmail);

userRouter.route("/login").post(loginUser);

userRouter.route("/adminLogin").post(loginAdmin);

userRouter.route("/logout").delete(isAuthenticatedForEmail, logout);

// userRouter.route("/logout").delete(isAuthenticatedForEmail, logout);

export default userRouter;
