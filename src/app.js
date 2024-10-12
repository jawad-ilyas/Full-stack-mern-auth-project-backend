import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

// app.use(cors(
//     {
//         origin: "*",
//         credentials: true
//     }

// ))
app.use(cookieParser())
app.use(express.json())



// import the routers from the [// * Router foled //]
import UserRouter from "../src/routers/user.routers.js"
import AuthRouter from "../src/routers/auth.routers.js"
// ! very import to pass / before api word 
app.use("/api/v1/users", UserRouter)
app.use("/api/v1/auth", AuthRouter)

// ! this is the middleware i am not using this right now 
// ! if you want to use this middlerware called the next(error )
app.use((err, req, res, next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.status(statusCode)
        .json({
            succcess: false,
            error: message,
            statusCode: statusCode
        })
})
export { app }