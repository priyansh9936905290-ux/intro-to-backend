import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 1,
      maxlength: 50

    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50


    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    }
  },
  {
    timestamps: true
  }
)
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
})
userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)