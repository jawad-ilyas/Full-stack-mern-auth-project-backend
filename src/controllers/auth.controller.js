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
            res.status(404).json(
                new ApiResponse(404, null, "all fields are required ")
            )
        }

        const validatedUser = await User.findOne({ email })
        if (!validatedUser) {
            res.status(404).json(
                new ApiResponse(404, null, "user is not found ")
            )
        }
        const validatePassword = await validatedUser.isPasswordMatch(password)
        console.log("validatePassword", validatePassword);
        if (!validatePassword) {
            res.status(401).json(
                new ApiResponse(401, null, "Invalid Creditionals")
            )
        }
        const accessToken = await GenerateAccessTokenWithUserId(validatedUser?._id)
        console.log("function acccesstoken ", accessToken)
        if (accessToken) {
            const { password, ...rest } = validatedUser._doc;
            const expiryData = new Date(Data.now() + 3600000)
            res.status(200).cookie("token", accessToken, { experies: expiryData }).json(
                new ApiResponse(200, { token: accessToken, rest }, "user is successfully login")
            )
        }
    } catch (error) {
        new ApiResponse(404, null, "user is not successfully wrong")

    }

}

export { signUp, signIn }