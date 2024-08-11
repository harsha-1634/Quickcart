const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
const cors = require("cors");

const userRoute=require('./routes/user');
const authRoute=require('./routes/auth');
const productRoute=require('./routes/product');
const orderRoute=require('./routes/order');
const cartRoute=require('./routes/cart');
const stripe=require('./routes/stripe');



const mongoose=require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Db connection succesful"))
.catch((err)=>{
    console.log(err);
});




app.use(express.json());
app.use(cors());
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/checkout", stripe);
app.use("/api/auth",authRoute);
app.listen(process.env.PORT||5000,()=>{
    console.log("Backend server is running");
});