import mongoose,{Schema} from "mongoose";
const postSchema = new Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true,
    },
    description:{
      type:String,
      required:true,
      trim:true
    },
      age:{
      type:Number,
      required:true,
      minimun:1,
      maximum:100,
      }

  },
  {
    timestamps: true
  }
)

export const Post = mongoose.model("Post", postSchema)