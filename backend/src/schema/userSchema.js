import { Schema } from "mongoose";

export let userSchema = Schema({
  userName: {
    type: String,
    trim: true,
    required: [true, "User Name field is required"],
    minLength: [2, "fname must be at least 4 character long"],
    maxLength: [20, "fname must be at most 20 character"],

    validate: (value) => {
      if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
        throw new Error("Only alphabet and space is allowed.");
      }
    },
  },

  password: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
    validate: (value) => {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        throw new Error("Email is wrong.");
      }
    },
  },
  role: {
    type: String,
    enum: {
      values: ["player", "admin"],
      default: "customer",
      message: (notEnum) => {
        return `${notEnum.value} is not valid enum`;
      },
    },
  },

  isVerify: {
    type: Boolean,
    default: false,
  },
  isDeactivate: {
    type: Boolean,
    default: false,
  },
});
