const express=require("express");
const app=express();


const eventRoute=require("./routes/event");

app.use(express.json());
app.use("/",eventRoute);

module.exports=app;