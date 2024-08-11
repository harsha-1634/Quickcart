const { verifyToken, verifyTokenAndAuthotization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Cart = require("../models/Product");

//create
router.post("/",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const savedCart = await newCart.save();
        console.log(savedCart);
        res.status(200).json(savedCart);
    } catch(err){
        res.status(500).json(err);
    }
})

//update
router.put("/:id",verifyTokenAndAuthotization, async (req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new:true});
        res.status(200).json(updatedCart);
    }catch(err) {
        res.status(500).json(err);
        // console.log(err);
    }
});

//delete
router.delete("/:id",verifyTokenAndAuthotization, async (req,res)=>{
    try{
       await Cart.findByIdAndDelete(req.params.id)
       res.status(200).json("Cart has been deleted...")
    } catch(err) {
        res.status(500).json(err);
        // console.log(err);
    }
});
// GET USER CART
router.get("/find/:userid",verifyTokenAndAuthotization,async(req,res)=>{
    try{
        const cart=await Cart.findOne({userId: req.params.userid});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
})

// GET ALL 
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts=await Cart.find();
        res.status(200).json(carts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports=router;