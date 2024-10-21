import mongoose from "mongoose";
import dot from "dotenv";

dot.config();

const connectToMongoDB = async (req,res)=>{
   try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connected to MongoDB");
    
   } catch (error) {
    console.log("Error connection to MongoDB" , error.message);
    
   }
}

export default connectToMongoDB