import "dotenv/config.js"
import mongoose from "mongoose"

const uri = process.env.MONGO_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(uri)
        console.log("connected to database!");
    } catch (error) {
        console.log(error);
        
    }
}

export default connectDB;