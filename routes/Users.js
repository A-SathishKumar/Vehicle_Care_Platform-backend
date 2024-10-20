import express from "express";
import {db} from '../db-utils/db.connections.js';
import {v4} from 'uuid';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { mailoptions,transporter } from "../utils/mail-utils.js";
import { createjwtToken } from "../utils/jwt-utils.js";
import otpGenerator from 'otp-generator';

const UserRouter = express.Router();
const userCollections = db.collection("Users");
const carCollections = db.collection("Cars");

//Regiter

UserRouter.post("/",async (req,res)=>{
    const userData = req.body;
    const userDetails = await userCollections.findOne({email:userData.email});
    if(userDetails){
        res.status(404).json({msg:"User Already Exists!! Try to Login"})
    }else{
        bcrypt.hash(userData.password,10,async(err,hash)=>{
            userData.password = hash;
            await userCollections.insertOne({
                ...userData,
                id:v4(),
                isVerified:false,
                role:'user',
                createdAt: new Date()
            })
            const token = createjwtToken({email:userData.email},"1d");
            const link = `${process.env.FE_URL}/verify-account?token=${token}`;
            await transporter.sendMail({
                ...mailoptions,
                to:userData.email,
                subject:"Welcome to Vechicle Care Platform",
                text:`Hello ${userData.name} \n Thanks for Registering With Us... \n Kindly Activate your account to use Oue Service \n Here is the Activation link: ${link} `
            });

            res.json({msg:"User Registed Sucessfully!!!"});
        });
    };
});

//Login

UserRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userCollections.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    console.log(err);
                    res.status(400).json({msg:"Somthing Went Wrong"});
                }else if(result){
                    delete user.password;

                    const token = createjwtToken({email:user.email, role:user.role},"1h");
                    
                      //res.json({ token });
                    const role = user.role;
                    res.status(200).json({msg:"User Logged Sucessfully",user,role,token});
                }else{
                    res.status(400).json({msg:"Invalid Credentials"});
                }
            })
        }else{
            res.status(400).json({msg:"User Not Found! Do Register and try to Login"});
        }
    }catch(e){
        res.status(500).json({msg:"Some Internal Issus, Please Try after some times"});
    }
});

//verify-Account

UserRouter.post("/verify-account/send",async (req,res)=>{
    const {email,name} = req.body;
    const token = createjwtToken({email:email},"1d");
    const link = `${process.env.FE_URL}/verify-account?token=${token}`;
    await transporter.sendMail({
        ...mailoptions,
        to:email,
        subject:"Welcome to Vechicle Care Platform",
        text:`Hello ${name} \n Thanks for Registering With Us... \n Kindly Activate your account to use Oue Service \n Here is the Activation link: ${link} `
    });
    res.status(200).json({msg:"Link Sent Succesfully..."});
})

UserRouter.get("/verify-account",(req,res)=>{
    const {token} = req.query;
    jwt.verify(token,process.env.JWT_SECRET,async (err,data)=>{
        if(err){
            res.status(400).json({msg:"Link Seems To Be Expired, Please try again"});
        } 
        const {email} = data;
        await userCollections.updateOne({email},{$set:{isVerified:true}});
        res.json({msg:"User Verified Successfully"});
    })
})

//Forget-Password

UserRouter.post('/forget-password/send-otp',async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await userCollections.findOne({email});
       
        if(user){
            const otp = otpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: false });
            await userCollections.updateOne({email},{$set:{otp:otp}});
            await transporter.sendMail({
                ...mailoptions,
                to:user.email,
                subject:"OTP-Vehicle Care Platform",
                text:`Hello ${user.name} \n  You will Get this mail, By Your Recent Action Towords your Account Password Resest Requect \n This your OTP : ${otp}`
            });
            res.status(200).json({msg:"OTP sent Successfully",success:true});
        }else{
            res.status(400).json({msg:"User Not Found! Do Register and try to Login",success:false});
        }
    }catch(e){
        res.status(500).json({msg:"Some Internal Issus, Please Try after some times",e,success:false});
    }
});

UserRouter.post('/forget-password/verifyotp',async(req,res)=>{
    const {email,otp} = req.body;
    try{
        const user = await userCollections.findOne({email});
        if(user){
            if(otp === user.otp){
                res.status(200).json({msg:"OTP Verified Successfully",success:true});
                userCollections.d
            }else{
                res.status(400).json({msg:"OPT Don't Match"})
            }
        }
    }catch(e){
        console.log(e);
        res.status(500).json({msg:"Some Internal Issus, Please Try after some times",e})
    }
});

UserRouter.post('/forget-password/reset-password',async(req,res)=>{
    var {email, password} = req.body;
    const user = userCollections.findOne({email});    
    bcrypt.hash(password,10,async(err,hash)=>{
        userCollections.updateOne({email},{$set:{password:hash}});
        userCollections.updateOne({ email },{ $unset: { otp: "" }});
        res.status(200).json({msg:"Password Reset Successfully",success:true});
    });
})

//Add Car to Profile
UserRouter.post('/profile/add-car',async(req,res)=>{
    var {make,model,year,email} = req.body;
    const cardetails = {
        email,
        make,
        model,
        year
    };
    await carCollections.insertOne(cardetails);
    res.status(200).json({msg:"Car Add Successfully",success:true});   
})

//Fetch Cars From Profile

UserRouter.post('/profile/fetchcars',async(req,res)=>{
    const { email } = req.body;
    try {
        const response = await carCollections.find({ email }).toArray(); // Convert the cursor to an array
        if (response.length > 0) {
            res.status(200).json(response); // Return the results as a JSON response
        } else {
            res.status(404).json({ msg: "No Data Found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error fetching data", error: error.message });
    }
})

//Delete Car form Profile

UserRouter.post('/profile/deletecar',async(req,res)=>{
    const { make,model,year,email } = req.body;
    try {
        const response = await carCollections.find({ email }).toArray();
        
        await carCollections.deleteOne({email: email, make:make,year:year});


        // Convert the cursor to an array
        if (response.length > 0) {
            res.status(200).json({msg:"Car Removed Successfully"}); // Return the results as a JSON response
        } else {
            res.status(404).json({ msg: "Something Went Wrong" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error fetching data", error: error.message });
    }
})
export default UserRouter;
