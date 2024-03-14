import { Schema } from "mongoose";

export let lubSchema = Schema({
  lubInput: Number,
  isLub: {
    type: Boolean, // Indicate that it's a boolean field
    default: false, // Set the default value to false (not the LUB initially)
  },
});
