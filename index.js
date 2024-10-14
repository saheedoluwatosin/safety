const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./router/router")
const dotenv = require("dotenv").config()



const app = express()


app.use(express.json())
app.use(cors())


mongoose.connect(`${process.env.mongo_db}`)
        .then(()=> {
            console.log("Mongodb Connected.....")
        })


const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{console.log("Server Running")})
        
app.use(router)