import { HttpStatus, baseUrl } from "../config/constant.js";
import successResponse from "../helper/successResponse.js";
import expressAsyncHandler from "express-async-handler";
import errorResponse from "../helper/ErrorResponse.js";
import { Lub } from "../schema/model.js";

export let userAmount = expressAsyncHandler(async (req, res, next) => {
  let amount = req.body.lubInput;
  console.log("amount", amount);

  try {
    let data = await Lub.findOne({ lubInput: Number(amount) });
    console.log(data);
    if (!data) {
      let newLub = await Lub.create({ lubInput: amount });
      console.log("Newly created Lub:", newLub);
      successResponse(
        res,
        HttpStatus.CREATED,
        "Unique LUB amount added successfully",
        amount
      );
    } else {
      errorResponse(res, HttpStatus.BAD_REQUEST, "LUB amount already exists");
    }
  } catch (error) {
    console.error("Error:", error);
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
});
