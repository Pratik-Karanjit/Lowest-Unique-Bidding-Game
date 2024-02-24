import { model } from "mongoose";
import { userSchema } from "./userSchema.js";
import { tokenSchema } from "./tokenSchema.js";

export let User = model("User", userSchema);
export let Token = model("Token", tokenSchema);
