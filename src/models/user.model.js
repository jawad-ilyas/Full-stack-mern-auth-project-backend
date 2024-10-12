import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

}, { timestamps: true })


userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordMatch = async function (password) {

    return bcrypt.compare(password, this.password)
}

userSchema.methods.generateAcccessToken = async function () {

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,

        },  process.env.ACCCSS_TOKEN_SECRETKEY , { expiresIn: "1d" }
    )
}

export const User = mongoose.model("User", userSchema)