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
    let checker = await Lub.find({});
    console.log("data", data);
    let checkerResult = console.log("checker", checker);
    let extractAmounts = checker.map((item) => item.lubInput);
    let filteredResult = extractAmounts.some((value) =>
      amount < value ? "The amount is LUB!" : "The amount is not the LUB"
    );

    console.log(extractAmounts);
    console.log("filteredResult", filteredResult);
    if (!data) {
      let newLub = await Lub.create({ lubInput: amount });
      if (filteredResult) {
        successResponse(
          res,
          HttpStatus.CREATED,
          "Lowest Unique Bid amount added successfully",
          amount
        );
      } else {
        successResponse(
          res,
          HttpStatus.CREATED,
          "Non-LUB amount added successfully",
          amount
        );
      }
      // console.log("Newly created Lub:", newLub);
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
