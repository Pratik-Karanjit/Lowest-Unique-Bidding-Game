import { Schema } from "mongoose";

export let productsSchema = Schema({
  title: String,
  price: String,
  time: String,
});
