import { Router } from "express";
import {
  createProduct,
  createUser,
  getAllProducts,
  loginAdmin,
  loginUser,
  logout,
  logoutAdmin,
  verifyEmail,
} from "../controller/userController.js";
import isAuthenticatedForEmail from "../middleware/isAuthenticatedForEmail.js";
import { upload } from "./fileRouter.js";

let userRouter = Router();

//localhost:8000/users/verify-email

userRouter.route("/").post(createUser);

userRouter.route("/verify-email").post(isAuthenticatedForEmail, verifyEmail);

userRouter.route("/login").post(loginUser);

userRouter.route("/adminLogin").post(loginAdmin);

userRouter.route("/logout").delete(isAuthenticatedForEmail, logout);

userRouter.route("/logoutAdmin").delete(isAuthenticatedForEmail, logoutAdmin);

// userRouter.post("/products/create", createProduct);
// userRouter.post("/products/create", fileRouter);
// userRouter.js
userRouter.post("/products/create", upload.single("img"), createProduct);

userRouter.route("/products").get(getAllProducts);

// userRouter.route("/logout").delete(isAuthenticatedForEmail, logout);

export default userRouter;
