import { useState } from "react"
import React from 'react'
import { Note} from "./types"
import { Textarea } from "./ui/textarea"




export default function Notes() {
    const [notes,setNotes]=useState<Note>({note:"",date:new Date().toISOString()})

    function saveNote(event:React.ChangeEvent<HTMLTextAreaElement>){
        const newnote:Note={
            note:event.target.value,
            date:new Date().toISOString(),
        }
        
        setNotes({
            ...notes,
            note:event.target.value,
            date:new Date().toISOString()
        })



    }

  return (
    <div>
        <Textareanotes.note} onChange={saveNote}></Textarea>
    </div>
  )
}
