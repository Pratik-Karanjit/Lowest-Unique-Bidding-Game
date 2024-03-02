import express, { json } from "express";
import { port } from "./src/config/constant.js";
import cors from "cors";
import connectDb from "./src/connectdb/connectdb.js";
import userRouter from "./src/routes/userRouter.js";
import fileRouter from "./src/routes/fileRouter.js";
import lubRouter from "./src/routes/lubRouter.js";

let app = express();

app.use(json());

app.use(cors());
app.use("/files", fileRouter);

app.use("/users", userRouter);

app.use("/lub", lubRouter);

connectDb();

app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
