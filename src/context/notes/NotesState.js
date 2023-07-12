import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial = [
          {
            "_id": "64abd1e528add6a4f30b643ba",
            "user": "64ab99d9c3c85fec8bec9c2a",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-07-10T09:39:49.254Z",
            "__v": 0
          },
          {
            "_id": "64abd1e528add6a4f30b643bb",
            "user": "64ab99d9c3c85fec8bec9c2a",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-07-10T09:39:49.254Z",
            "__v": 0
          },
          {
            "_id": "64abd1e528add6a4f30b643bc",
            "user": "64ab99d9c3c85fec8bec9c2a",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-07-10T09:39:49.254Z",
            "__v": 0
          },
          {
            "_id": "64abd1e528add6a4f30b643bd",
            "user": "64ab99d9c3c85fec8bec9c2a",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-07-10T09:39:49.254Z",
            "__v": 0
          },
          {
            "_id": "64abd1e528add6a4f30b643be",
            "user": "64ab99d9c3c85fec8bec9c2a",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-07-10T09:39:49.254Z",
            "__v": 0
          },
          {
            "_id": "64ad01b4f441239de5e7aee8",
            "user": "64ab99d9c3c85fec8bec9c2a",
            "title": "My Title",
            "description": "Please wake up early",
            "tag": "personal",
            "date": "2023-07-11T07:16:04.714Z",
            "__v": 0
          }
    ]

    const [notes, setNotes] = useState(notesInitial);

    // Add a Note
    const addNote = (title, description, tag)=>{
        console.log("Adding a new Note")
        const note = {
            "_id": "64ad01b4f4412339de537aee82",
            "user": "64ab99d9c3c85fec8bec9c2a",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-07-11T07:16:04.714Z",
            "__v": 0
        };
        setNotes(notes.concat(note))          
    }

    // Delete a Note
    const deleteNote = (id)=>{
      console.log("Deleting note with id "+ id)
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
    }

    // Edit a Note
    const editNote = ()=>{

    }

    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;