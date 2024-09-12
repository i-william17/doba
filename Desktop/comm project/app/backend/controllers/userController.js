import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login
const loginUser = async (req,res) => {
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email});

        //Check user validity
        if (!user){
            return res.json({success:false, message:"User not found"})
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success:false, message:"Invalid password"})
        }

        //create token
        const token =  createToken(user._id);
        res.json({success:true,token})
    }
    catch (error) {
        console.log(error);
        res.json({success:false, message:"Something went wrong. Try again"})
    }
}

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register
const registerUser = async (req,res) => {
    const {name, password, email} = req.body;

    try {
        //checking user
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User Exists"})
        }

        //validate email and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Invalid Email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Password too short"})
        }

        //encrpting password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //new user
        const newUser = new userModel({
            name:name , 
            email :email, 
            password:hashedPassword
        })

        //saving user in database 
        const user = await newUser.save();
        const token =  createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Something went wrong. Try again"})

    }  
}

export {loginUser, registerUser}