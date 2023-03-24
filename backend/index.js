const app=require("./app");
const dotenv=require('dotenv');
const mongoose=require("mongoose");


dotenv.config();

mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology:true})

app.listen(8000,()=>console.log("Server is listening"));