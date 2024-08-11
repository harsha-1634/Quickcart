const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken");

router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.pass_sec).toString(),
    });
    console.log(newUser);
    try{
        const savedUser =await newUser.save()
        res.status(201).json(savedUser);
        console.log(savedUser);
    } catch(err) {
        res.status(500).json(err);
        // console.log(err);
    }
});

router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        // console.log(user);
        !user && res.status(401).json("wrong credentials");
        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.pass_sec);
        const Originalpassword=hashedPassword.toString(CryptoJS.enc.Utf8);
        // console.log(Originalpassword);
        Originalpassword !==req.body.password && 
            res.status(401).json("Enter valid credentials");
        
            const accessToken = jwt.sign({
                id:user.id,
                isAdmin:user.isAdmin,
            },process.env.jwt_sec,{expiresIn:"3d"});

        const { password, ...others} = user._doc;
        res.status(200).json({...others,accessToken});
        // console.log(username);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});





module.exports=router;