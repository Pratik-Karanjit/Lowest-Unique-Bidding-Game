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
    console.log("data", data);

    let checker = await Lub.find({});
    // console.log("checker", checker);

    let extractAmounts = checker.map((item) => item.lubInput);
    console.log(extractAmounts);

    let filteredResult = extractAmounts.every((value) => amount < value);
    console.log("filteredResult", filteredResult);

    // Find the lowest number
    let lowestAmount = Math.min(...extractAmounts);
    console.log("lowestAmount", lowestAmount);

    // Filter out the lowest number from the array
    let filteredAmounts = extractAmounts.filter(
      (amount) => amount !== lowestAmount
    );
    console.log("filteredAmounts", filteredAmounts);

    // Find the new lowest number in the filtered array
    let secondLowestAmount = Math.min(...filteredAmounts);
    console.log("Second lowest amount:", secondLowestAmount);

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
    } else {
      if (amount === lowestAmount) {
        // Check if the current LUB is unique or not
        let isCurrentLubUnique =
          extractAmounts.filter((value) => value === amount).length === 1;
        console.log("isCurrentLubUnique:", isCurrentLubUnique);

        if (isCurrentLubUnique) {
          let newLub = secondLowestAmount;

          // Update isLub flag for previous LUB
          await Lub.findOneAndUpdate(
            { lubInput: lowestAmount },
            { isLub: false }
          );

          // Update isLub flag for new LUB
          await Lub.findOneAndUpdate({ lubInput: newLub }, { isLub: true });

          // Send success response with updated LUB
          successResponse(
            res,
            HttpStatus.CREATED,
            "Database updated with new LUB:",
            newLub
          );
        } else {
          errorResponse(
            res,
            HttpStatus.BAD_REQUEST,
            "LUB amount already exists."
          );
        }
      } else {
        // If the entered amount is not the current LUB, display an error
        errorResponse(res, HttpStatus.BAD_REQUEST, "LUB amount already exists");
      }
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
