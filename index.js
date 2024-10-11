import { app } from "./src/app.js";
import dotenv from "dotenv"
import { connectDb } from "./src/db/index.db.js";


dotenv.config()

connectDb()
    .then(() => {

        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("error into server conection " , error)
    })
