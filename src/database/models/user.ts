import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firebaseUid: { type: String, unique: true },
    email: String,
  });
  
export const User = mongoose.model('User', userSchema);
  