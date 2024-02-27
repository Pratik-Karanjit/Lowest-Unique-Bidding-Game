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

export let verifyEmail = expressAsyncHandler(async (req, res, next) => {
  let id = req.info.id; //getting id from query and setting it in a variable
  // console.log(id)
  let tokenId = req.token.tokenId; //sent token inside isAuthenticated and received tokenId through it
  // console.log(tokenId)
  let result = await User.findByIdAndUpdate(
    //This line updates the user document in the database with the provided id.
    id,
    { isVerify: true }, //isVerify is set to true, initially its false
    { new: true } //this updates the response at once and need not hit the postman twice
  );
  // delete result._doc.password;    //password should not be shown so we delete it
  await Token.findByIdAndDelete(tokenId); //No use

  successResponse(
    res,
    HttpStatus.CREATED,
    "Email verified successfully.",
    result
  );
});

export let loginUser = expressAsyncHandler(async (req, res, next) => {
  let userName = req.body.userName;
  let password = req.body.password;
  let data = await User.findOne({ userName: userName });
  if (data.isDeactivate) {
    await User.findByIdAndUpdate(data._id, { isDeactivate: false });
  }

  if (!data) {
    let error = new Error("Credential doesn't match");
    error.statusCode = 401;
    throw error;
  } else {
    let isValidPassword = await comparePassword(password, data.password);
    if (!isValidPassword) {
      let error = new Error("Credential doesn't match");
      error.statusCode = 401;
      throw error;
    } else {
      if (!data.isVerify) {
        let error = new Error("Please Verify Your Account First.");
        error.statusCode = 401;
        throw error;
      } else {
        let infoObj = {
          id: data._id,
          role: data.role,
        };
        let expireInfo = {
          expiresIn: "365d",
        };
        let token = await generateToken(infoObj, expireInfo);
        await Token.create({ token });
        res.json({ token, userName, role: data.role });
        successResponse(
          res,
          HttpStatus.CREATED,
          "Login Successfully",
          token,
          userName
        );
      }
    }
  }
});

export let loginAdmin = expressAsyncHandler(async (req, res, next) => {
  let userName = req.body.userName;
  let password = req.body.password;

  console.log("userName here", userName);
  console.log(password);

  if (userName === "adminUser" && password === "admin123") {
    let infoObj = {
      id: "admin_id",
      role: "admin",
    };
    let expireInfo = {
      expiresIn: "365d",
    };
    let token = await generateToken(infoObj, expireInfo);
    await Token.create({ token });
    res.json({ token, role: infoObj.role });
    successResponse(res, HttpStatus.CREATED, "Login Successfully", token);
  } else {
    let error = new Error("Credentials don't match");
    error.statusCode = 401;
    throw error;
  }
});

export let logout = expressAsyncHandler(async (req, res, next) => {
  let tokenId = req.token.tokenId;
  console.log(tokenId);
  let result = await Token.findByIdAndDelete(tokenId);
  successResponse(res, HttpStatus.OK, "logout successfully", result);
});
