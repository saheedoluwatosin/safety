const express = require("express")

const { login, register } = require("../controller/controller")
const { getallQuiz, getQuizbyId, createQuiz, updatescore, leaderboard } = require("../controller/quizcontroller")
const { validtoken, authorizeRoles } = require("../authen/auth")

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/createquiz",validtoken,createQuiz)
router.get("/getallquiz",getallQuiz)
router.get("/getquiz/:id",getQuizbyId)
router.post('/updatescore',validtoken,updatescore)
router.get('/leaderboard',leaderboard)







module.exports = router








