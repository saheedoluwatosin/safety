const Quiz = require("../model/quizschema");
const quizschema = require("../model/quizschema");




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












module.exports = {
    createQuiz,
    getallQuiz,
    getQuizbyId
}










