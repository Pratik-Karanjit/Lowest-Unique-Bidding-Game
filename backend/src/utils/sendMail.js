import nodemailer from "nodemailer";
import { emailHost, fromEmail, fromPassword } from "../config/constant.js";
let transporterInfo = {
  host: emailHost,
  port: 587,
  secure: false,
  auth: {
    user: fromEmail,
    pass: fromPassword,
  },
};

export let sendMail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo);
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error has occurred", error.message);
  }
};
