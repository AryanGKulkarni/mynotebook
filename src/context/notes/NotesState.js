import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Get Notes
    const getNotes = async ()=>{

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYjk5ZDljM2M4NWZlYzhiZWM5YzJhIn0sImlhdCI6MTY4ODk3NTIxMn0.fUxELmBWXhuufGoPbgHOYp0Oybf7LPgIK0yFvxnNK7w"    
        },
      });
      const json = await response.json();
      // console.log(json)
      setNotes(json)         
    }
    // Add a Note
    const addNote = async (title, description, tag)=>{

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYjk5ZDljM2M4NWZlYzhiZWM5YzJhIn0sImlhdCI6MTY4ODk3NTIxMn0.fUxELmBWXhuufGoPbgHOYp0Oybf7LPgIK0yFvxnNK7w"    
        },
        body: JSON.stringify({title, description, tag}),
      });
      const json = response.json();

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
    const deleteNote = async (id)=>{

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYjk5ZDljM2M4NWZlYzhiZWM5YzJhIn0sImlhdCI6MTY4ODk3NTIxMn0.fUxELmBWXhuufGoPbgHOYp0Oybf7LPgIK0yFvxnNK7w"    
        },
      });
      const json = response.json();
      console.log(json)


      console.log("Deleting note with id "+ id)
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
    }

    // Edit a Note
    const editNote = async (id, title, description, tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhYjk5ZDljM2M4NWZlYzhiZWM5YzJhIn0sImlhdCI6MTY4ODk3NTIxMn0.fUxELmBWXhuufGoPbgHOYp0Oybf7LPgIK0yFvxnNK7w"    
        },
        body: JSON.stringify({title, description, tag}),
      });
      
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
        
      }
    }

    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;