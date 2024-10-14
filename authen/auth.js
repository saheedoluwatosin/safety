const User = require("../model/usermodel")
const jwt = require("jsonwebtoken")







const validtoken = async (request,response,next)=>{
    try {
        const token= request.header("Authorization")
        if(!token){
            return response.status(404).json({message:"Access denied"})
        }
        //console.log(token)
        const tkk =token.split(" ")
        const token1 =tkk[1]

        const decoded = jwt.verify(token1,process.env.ACCESS_URL)
        console.log(decoded)
        const user = await User.findOne({_id:decoded.user_login._id})
        console.log(user)
        
        if(!decoded){
            return response.status(401).json({
                message:"Invalid Login"
            })
        }
        request.user = user  
        next()
    } catch (error) {
        return response.status(500).json({error:error.message})
    }
    
}


const authorizeRoles = (...roles) => {
    return (request, response, next) => {
        if (!roles.includes(request.user.role)) {
            return response.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};


module.exports = {
    validtoken,
    authorizeRoles

}