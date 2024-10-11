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



export { app }