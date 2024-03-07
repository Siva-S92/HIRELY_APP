import { ObjectId } from "bson";
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    profile_photo: {
        type:String,
    },
    skills: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: "user",
    }
})

const Content = mongoose.model("content", contentSchema);
export { Content };