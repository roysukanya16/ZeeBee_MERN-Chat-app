const mongoose = require("mongoose");
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewurlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify:true,
        })

        console.log(`MongoDB connected'${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(error);
    }
}

module.exports=connectDB;