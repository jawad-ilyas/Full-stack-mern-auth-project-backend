import { User } from "../models/user.model.js"
import { ApiResponse } from "../utitlis/ApirResponse.utilis.js"
import { BodyConsole } from "../utitlis/BodyConsole.utilis.js"


const signUp = async (req, res) => {

    BodyConsole(req.body)
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

export { signUp }