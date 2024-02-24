import { HttpStatus, baseUrl } from "../config/constant.js";
import successResponse from "../helper/successResponse.js";
import { Token, User } from "../schema/model.js";
import expressAsyncHandler from "express-async-handler";
import { sendMail } from "../utils/sendMail.js";
import { comparePassword, hashPassword } from "../utils/hashing.js";
import { generateToken, verifyToken } from "../utils/token.js";
import bcrypt from "bcrypt";

export let createUser = expressAsyncHandler(async (req, res, next) => {
  let data = req.body;
  data.isVerify = false;
  data.isDeactivate = false;
  let email = data.email;
  let user = await User.findOne({ email: email });

  if (user) {
    let error = new Error("Duplicate email.");
    error.statusCode = 409;
    throw error;
  } else {
    let _hashPassword = await hashPassword(data.password);
    data.password = _hashPassword;
    let result = await User.create(req.body);
    delete result._doc.password;
    let infoObj = {
      id: result._id,
      role: result.role,
    };
    let expireInfo = {
      expiresIn: "1d",
    };
    let token = await generateToken(infoObj, expireInfo);
    await Token.create({ token });
    let link = `${baseUrl}/verify-email?token=${token}`;
    await sendMail({
      from: '"LUB Family" <lub@gmail.com>',
      to: [data.email],
      subject: "Email verification",
      html: `<h1>
      Verify Email 
      <a href = "${link}">Click to verify</a>               
      <h1>`,
    });

    successResponse(
      res,
      HttpStatus.CREATED,
      "User created successfully",
      result
    );
  }
});
