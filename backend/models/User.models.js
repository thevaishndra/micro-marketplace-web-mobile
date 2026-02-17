import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    favorites : [
        {
        type : Schema.Types.ObjectId,
        ref : "Product"
        },
    ],
},{timestamps : true});

export const User = mongoose.model("User", userSchema);

//create user model