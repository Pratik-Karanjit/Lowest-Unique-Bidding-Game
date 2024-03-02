import { model } from "mongoose";
import { userSchema } from "./userSchema.js";
import { tokenSchema } from "./tokenSchema.js";
import { productsSchema } from "./productsSchema.js";
import { lubSchema } from "./lubSchema.js";

export let User = model("User", userSchema);
export let Token = model("Token", tokenSchema);
export let Product = model("Product", productsSchema);
export let Lub = model("Lub", lubSchema);
