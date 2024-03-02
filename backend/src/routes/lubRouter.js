import { Router } from "express";
import { userAmount } from "../controller/lubController.js";
let lubRouter = Router();

lubRouter.route("/amount").post(userAmount);

export default lubRouter;
