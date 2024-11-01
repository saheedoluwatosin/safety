const { message } = require("statuses");
const Quiz = require("../model/quizschema");
const quizschema = require("../model/quizschema");
const User = require("../model/usermodel");




const createQuiz = async(request,response)=>{
    const { title, questions, category } = request.body;
    try {
        const quiz = await Quiz.create({
            title,
            questions,
            category,
            creator: request.user._id
          });
        
        response.status(201).json(quiz);
    } catch (error) {
        return response.status(500).json({error:error.messsage})
    }
}








const getallQuiz = async (request,response)=>{

    try {
        const quizzes = await Quiz.find()
        return response.status(200).json(quizzes);
    } catch (error) {
        response.status(400).json({ message: 'Error fetching quizzes', error });
    }
    
}




const getQuizbyId = async (request,response)=>{
    try {
        const quiz = await Quiz.findById(request.params.id);
        response.status(200).json(quiz);
    } catch (error) {
        return response.status(500).json({error:error.message})
    }
}





const updatescore = async (request,response)=>{
    const{score}=request.body
    try {
        const user = await User.findById(request.user._id)
        user.totalScore +=score;
        await user.save()
        response.status(200).json({message:"Score updated successfully"})
    } catch (error) {
        response.status(500).json({message:error.message})
    }
}


const leaderboard = async(request,response)=>{
    try {
        const leaderboard = await User.find()
          .sort({ totalScore: -1 })
         .limit(100)
          .select('name employee_id totalScore -_id');
        response.status(200).json(leaderboard);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}



const getalluser = async(request,response)=>{
    const users = await User.find()
    response.status(200).json({
        "message":"All user",
        users
    })
}


const deleteuser = async(request,response)=>{
    const {id} = request.params
    const user = await User.findByIdAndDelete(id)
    if(!user){
        return response.status(404).json({
            "message":"User not found" 
        }) 

    }

    return response.status(200).json({
        "message":"User deleted"
    })

}



const deletequiz = async(request,response) =>{
    const {id} = request.params
    const quiz = await Quiz.findByIdAndDelete(id)
    if(!quiz){
        return response.status(400).json({
            "message":"user not found"
        })
    }

    return response.status(200).json({
        "message":"Quiz deleted"
    })

}



module.exports = {
    createQuiz,
    getallQuiz,
    getQuizbyId,
    leaderboard,
    updatescore,
    getalluser,
    deleteuser,
    deletequiz
}










