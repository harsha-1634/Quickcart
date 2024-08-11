const { verifyToken, verifyTokenAndAuthotization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Order = require("../models/Order");

//create
router.post("/",verifyToken,async(req,res)=>{
    console.log(req.body);
    const newOrder = new Order(req.body);
    console.log(newOrder);
    try{
        const savedOrder = await newOrder.save();
        // console.log(newOrder);
        res.status(200).json(savedOrder);
    } catch(err){
        res.status(500).json(err);
        console.log(err);
    }
})

//update
router.put("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const updatedOrder = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        res.status(200).json(updatedOrder);
    }catch(err) {
        res.status(500).json(err);
        // console.log(err);
    }
});

//delete
router.delete("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
       await Order.findByIdAndDelete(req.params.id)
       res.status(200).json("Order has been deleted...")
    } catch(err) {
        res.status(500).json(err);
        // console.log(err);
    }
});
// GET USER ORDERS
router.get("/find/:userid",verifyTokenAndAuthotization,async(req,res)=>{
    try{
        const orders=await Order.find({userId: req.params.userid});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

// GET ALL 
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    
    try{
        const orders=await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET MONTHLY INCOME
router.get("/income",verifyTokenAndAdmin, async (req,res)=>{
    const productId=req.query.pid;
    const date = new Date();
    const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousmonth = new Date(new Date().setMonth(lastmonth.getMonth() - 1));

    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousmonth },...CryptoJS(productId&&{ products:{$elemMatch:{productId}}}) } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            }
        ]);
        res.status(200).json(income)
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports=router;