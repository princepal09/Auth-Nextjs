import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    idAdmin: {
      type: Boolean,
      default: false,
    },

    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifiedToken : String,
    verifyTokenExpiry : Date
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
