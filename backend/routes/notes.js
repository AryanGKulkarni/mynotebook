const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body, validationResult} = require('express-validator');

//ROUTE 1: GET all Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser ,async (req,res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
    
})

//ROUTE 2: Add Notes using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser ,[
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
] ,async (req,res)=>{

    try {
        const {title,description,tag} = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const note= new Note({
            title,description,tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

    
})

//ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote/id:". Login required
router.put('/updatenote/:id', fetchuser, async (req,res)=>{

    try {
        const {title,description,tag} = req.body;

        const newNote = {};
        if(title) {newNote.title = title};
        if(description) {newNote.description = description};
        if(tag) {newNote.tag = tag};

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

    

})

//ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote/id:". Login required
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{
    try {
        const {title,description,tag} = req.body;

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }
        
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Succes": "Your Note Has been Deleted", note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }   

})

module.exports = router;