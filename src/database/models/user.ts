import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true },
    userId: {
        type: String,
        ref: "User",
        required: false
    },
    name: {type: String, required: false},
    email: {type: String, required: true},
    username: {type: String, unique: true},
    picture: {type: String, required: false}
  },
  { timestamps: true }
);
  

export const User = mongoose.models.User || mongoose.model("User", userSchema);