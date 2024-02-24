import { Router } from "express";
import { createUser } from "../controller/userController.js";

let userRouter = Router();

//localhost:8000/users/verify-email

userRouter.route("/").post(createUser);

// userRouter.route("/verify-email").post(isAuthenticatedForEmail, verifyEmail);

// userRouter.route("/login").post(loginUser);

// userRouter.route("/logout").delete(isAuthenticatedForEmail, logout);

export default userRouter;
