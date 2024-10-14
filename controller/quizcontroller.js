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
         .limit(10)
          .select('name employee_id totalScore -_id');
        response.status(200).json(leaderboard);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}





module.exports = {
    createQuiz,
    getallQuiz,
    getQuizbyId,
    leaderboard,
    updatescore
}










