import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();

app.use(cors(
    {
        origin: "*",
        credentials: true
    }

))
app.use(cookieParser())
app.use(express.json())



// import the routers from the [// * Router foled //]
import UserRouter from "../src/routers/user.routers.js"
import AuthRouter from "../src/routers/auth.routers.js"
// ! very import to pass / before api word 
app.use("/api/v1/users", UserRouter)
app.use("/api/v1/auth", AuthRouter)

export { app }