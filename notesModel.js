const mongoose=require('mongoose')


const notesShema=mongoose.Schema({
    title:{type:String,required:true},
    status:{type:Boolean,required:true},
    content:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
})

const notesModel=mongoose.model("note",notesShema)

module.exports=notesModel