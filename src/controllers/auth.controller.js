import { User } from "../models/user.model.js"
import { ApiResponse } from "../utitlis/ApirResponse.utilis.js"
import { BodyConsole } from "../utitlis/BodyConsole.utilis.js"



const GenerateAccessTokenWithUserId = async (userId) => {

    try {
        const user = await User.findById({ _id: userId })
        const accessToken = await user.generateAcccessToken();
        // console.log("accessToken", accessToken)
        return accessToken
    } catch (error) {
        console.log("error into generate acccess token")
    }
}

const signUp = async (req, res, next) => {

    // BodyConsole(req.body)
    // firsly i get all information from the user 

    const { name, password, email } = req.body
    const validatedUser = await User.findOne({ email })
    if (validatedUser) {
        return res.status(404).json(
            new ApiResponse(404, null, "user is already  found ")
        )
    }
    // ! now need to insert into db 
    const newUser = new User({ email, password, name })
    try {
        await newUser.save();
        return res.status(201).json(
            new ApiResponse(200, newUser, "User is created Successfully")
        )

    } catch (error) {
        return res.status(400).json(
            new ApiResponse(400, null, error?.message)
        )
    }



}


const signIn = async (req, res) => {

    BodyConsole(req.body);
    const { email, password } = req.body
    try {

        if ([email, password].some(fields => !fields || fields.trim() === "")) {
            return res.status(404).json(
                new ApiResponse(404, null, "all fields are required ")
            )
        }

        const validatedUser = await User.findOne({ email })
        if (!validatedUser) {
            return res.status(404).json(
                new ApiResponse(404, null, "user is not found ")
            )
        }
        const validatePassword = await validatedUser.isPasswordMatch(password)
        console.log("validatePassword", validatePassword);
        if (!validatePassword) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid Creditionals")
            )
        }
        const accessToken = await GenerateAccessTokenWithUserId(validatedUser?._id)
        console.log("function acccesstoken ", accessToken)
        if (accessToken) {
            console.log("into access token function ")
            const { password, ...rest } = validatedUser._doc;
            const expiryData = new Date(Date.now() + 3600000)
            return res.status(200).cookie("token", accessToken, { experies: expiryData }).json(
                new ApiResponse(200, { token: accessToken, rest }, "user is successfully login")
            )
        }
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, error.message || "An error occurred during sign-in")
        );

    }

}


const google = async (req, res, next) => {

    console.log(req.body)
    const { email, photoURL, name, uid } = req.body;
    try {
        const user = await User.findOne({ email })
        console.log("user is found ", email)
        if (user) {
            console.log("user is find into google case ")
            const accessToken = await GenerateAccessTokenWithUserId(user?._id);
            const { password, ...rest } = user?._doc;

            const expiryData = new Date(Date.now() + 360000)
            return res.status(200).cookie("token", accessToken, { experies: expiryData }).json(
                new ApiResponse(200, { token: accessToken, rest }, "user is successfully login")
            )
        }
        else {
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            console.log("generate Password ", generatePassword)
            if ([email, photoURL, name, uid].some(fields => !fields || fields.trim() === "")) {
                return res.status(404).json(
                    new ApiResponse(404, null, "all fields are requried")
                )
            }
            const newUser = new User({
                email, photoURL, name, uid, password: generatePassword
            })
            await newUser.save();
            const accessToken = await GenerateAccessTokenWithUserId(user?._id);
            const expiryData = new Date(Date.now() + 360000)
            const { password, ...rest } = newUser?._doc;
            return res.status(200).cookie("token", accessToken, { experies: expiryData }).json(
                new ApiResponse(200, { token: accessToken, rest }, "user is successfully login")
            )

        }
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, error.message || "An error occurred during google sign-in")
        );
    }
}
const logout = async (req, res, next) => {

    res.status(200).clearCookie("token").json(
        new ApiResponse(200 , null , "user is logout ")
    )
 
}

export { signUp, signIn, google, logout }