const express = require('express');
const notesModel = require('./notesModel');
const notesRouter = express.Router();

notesRouter.post("/post", async (req, res) => {
    try {
        const data = await notesModel.create({...req.body,userId:req.userId}); // Wait for the promise to resolve
        res.status(200).json({ msg: 'Notes created successfully', data });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to create notes', error: error.message });
        console.log(error);
    }
});


notesRouter.get("/get", async (req, res) => {
    try {
        const data = await notesModel.find({ userId: req.userId }); // Find notes by userId
        res.status(200).json({ msg: 'Notes retrieved successfully', data });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to retrieve notes', error: error.message });
        console.log(error);
    }
});



notesRouter.patch('/patch',async (req,res)=>{

try {
    
    const {id,...updatedField}=req.body

    const data=await notesModel.findByIdAndUpdate(id,{userId:req.userId,...updatedField},{new:true})

    if (!data) {
        return res.status(404).json({ msg: 'Note not found or update failed' });
    }
    res.status(200).json({ msg: 'Note updated successfully', data });
} catch (error) {
    res.status(500).json({ msg: 'Failed to update note', error: error.message });
    console.log(error);
}


})




notesRouter.delete('/delete',async (req,res)=>{

    try {
        
        const {id}=req.body
    
        const data=await notesModel.findByIdAndDelete(id,{userId:req.userId})
    
        if (!data) {
            return res.status(404).json({ msg: 'Note not found or update failed' });
        }
        res.status(200).json({ msg: 'Note deleted successfully', data });
    } catch (error) {
        res.status(500).json({ msg: 'Failed to delete note', error: error.message });
        console.log(error);
    }
    
    
    })










module.exports = notesRouter;
