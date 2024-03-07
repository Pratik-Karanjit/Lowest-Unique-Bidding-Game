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
    // let checkerResult = console.log("checker", checker);
    let extractAmounts = checker.map((item) => item.lubInput);
    let filteredResult = extractAmounts.every((value) => amount < value);

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
          "Unique amount added successfully but it is not the LUB.",
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
      //scenario: the LUB is 100 and other amounts in DB are 101 and 102
      //check if the newly entered amount is LUB(Lowest Unique Bid) i.e. 100 and if it is then check the next lowest bid which is 101 and console a message saying the new LUB is 101
      //If the amount is not LUB and is 102 which does not need any checking as it is not the LUB. In this case just display amount already exists.
      errorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        " amount already exists",
        amount
      );
    }
  } catch (error) {
    console.error("Error:", error);
    errorResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      amount
    );
  }
});

// export let userAmount = expressAsyncHandler(async (req, res, next) => {
//   let amount = req.body.lubInput;
//   console.log("amount", amount);

//   try {
//     let data = await Lub.findOne({ lubInput: Number(amount) });
//     let checker = await Lub.find({});
//     console.log("data", data);
//     let extractAmounts = checker.map((item) => item.lubInput);
//     let filteredResult = extractAmounts.every((value) => amount < value);

//     console.log(extractAmounts);
//     console.log("filteredResult", filteredResult);

//     if (!data) {
//       let newLub = await Lub.create({ lubInput: amount });
//       if (filteredResult) {
//         successResponse(
//           res,
//           HttpStatus.CREATED,
//           "Lowest Unique Bid amount added successfully",
//           amount
//         );
//       } else {
//         // Find the next lowest unique bid
//         let nextLowestUniqueBid = extractAmounts
//           .filter((value) => value !== amount)
//           .sort((a, b) => a - b)[0];

//         successResponse(
//           res,
//           HttpStatus.CREATED,
//           `Unique amount added successfully but it is not the LUB. The new LUB is ${nextLowestUniqueBid}`,
//           amount
//         );
//       }
//     } else {
//       // Check if the amount is the current LUB
//       if (amount === data.lubInput.toString()) {
//         // Check if the current LUB is unique or not
//         let isCurrentLubUnique =
//           extractAmounts.filter((value) => value === amount).length === 1;

//         if (isCurrentLubUnique) {
//           // Find the next lowest unique bid
//           let nextLowestUniqueBid = extractAmounts
//             .filter((value) => value !== amount)
//             .sort((a, b) => a - b)[0];

//           successResponse(
//             res,
//             HttpStatus.CREATED,
//             `Lowest Unique Bid amount added successfully. The new LUB is ${nextLowestUniqueBid}`,
//             amount
//           );
//         } else {
//           errorResponse(
//             res,
//             HttpStatus.BAD_REQUEST,
//             "LUB amount already exists."
//           );
//         }
//       } else {
//         // If the entered amount is not the current LUB, display an error
//         errorResponse(res, HttpStatus.BAD_REQUEST, "LUB amount already exists");
//       }
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     errorResponse(
//       res,
//       HttpStatus.INTERNAL_SERVER_ERROR,
//       "Internal Server Error"
//     );
//   }
// });
