import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl)
.then(()=>{
    console.log("Database Conected !");
})
.catch((err) => console.log("Database not Conected !", err));

export default mongoose;