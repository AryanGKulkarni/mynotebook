import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote} = context;
  useEffect(() => {
    getNotes();
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  
  const [note, setNote] = useState({etitle:"", edescription:"", etag:"default"})
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  }

  const handleClick = (e)=>{
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    e.preventDefault();
  }    
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }   

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                  <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">Title</label>
                      <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">Description</label>
                      <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
