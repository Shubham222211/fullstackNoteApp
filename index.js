const express=require('express')
const app=express()
const dotenv=require("dotenv")
const connection = require('./db.js')
const userRouter = require('./userRouter')
const cors=require('cors')
const notesRouter = require('./notesRouter.js')
const Auth = require('./authMiddleware.js')
dotenv.config()


const PORT=process.env.PORT || 4000


app.use(cors({
    origin:'*'
}))


app.use(express.json())
app.use('/user',userRouter)
app.use("/notes",Auth,notesRouter)

app.get('/',(req,res)=>{
    res.send('server running fine !!')
})


app.listen(PORT,async()=>{

    try {
        await connection
        console.log(`running port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})