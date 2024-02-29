import { Router } from "express";
import successResponse from "../helper/successResponse.js";
import { HttpStatus } from "../config/constant.js";
import upload from "../middleware/uploadFile.js";

let fileRouter = Router();

//localhost:8000/files/single
fileRouter.route("/single").post(upload.single("img"), (req, res, next) => {
  let fileName = req.file.filename;
  successResponse(res, HttpStatus.OK, "File uploaded successfully", fileName);
});

fileRouter.route("/multiple").post(upload.array("img", 5), (req, res, next) => {
  console.log(req.files);
  let links = req.files.map((value, i) => {
    let link = `localhost:8000/${value.filename}`;
    return link;
  });

  successResponse(res, HttpStatus.OK, "files Uploaded successfully", links);
});
export default fileRouter;
export { upload };
