
import mongoose from "mongoose";


const connectDb = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("db is connected")

    } catch (error) {
        console.log("some into connection with db", error)
    }
}

export { connectDb }