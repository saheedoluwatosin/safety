const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("../model/usermodel")
const dotenv = require("dotenv")









const register = async (request,response)=>{
    const {name,employee_id,password}= request.body
    try {
        const alreadyuser = await User.findOne({employee_id})
        if(alreadyuser){
            return response.status(404).json({
                message:"User already exist"
            })
        }
        if(password.length < 8){
            return response.status(400).json({
                message:"message should be 8 character or more"
            })
        }

        const hashedpassword = await bcrypt.hash(password,12)
        const newuser = new User({name,employee_id,password:hashedpassword})
        await newuser.save()
        return response.status(200).json({
            message:"Successful"
        })
    } catch (error) {
        return response.status(500).json({message: error.message})
    }
}




const login =async (request,response)=>{
    try {
        const{employee_id,password} = request.body

        const user_login = await User.findOne({employee_id})
        if(!user_login){
            return response.status(400).json({message:"User not found"})
        }

        const comparedPaasword = await bcrypt.compare(password,user_login.password)
        if(!comparedPaasword){
            return response.status(400).json({
                message:"Incorrect Username or Password"
            })
        }

        const accessToken = jwt.sign({user_login},`${process.env.ACCESS_URL}`,{expiresIn:"7d"})

        return response.status(200).json({
            message:"Successful Login",
            accessToken,
            user: user_login._id
            
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message
        })
    }
}





module.exports = {
    register,
    login
}