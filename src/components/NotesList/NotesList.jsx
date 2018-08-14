import React from 'react';
import NotesListItem from './NotesListItem/NotesListItem';

import classes from './NotesList.css';

const notesList = (props) => {

    let notes = props.notes;

    if(props.sortedBy !== "All")
    {
        const filter = props.sortedBy === "Archived"
        notes = props.notes.filter((item) => {
                return item.archived === filter;
        })
    }


    let notesToRender = notes.map((item,index)=>{

        return (
            <NotesListItem 
                key = {index}
                item = {item}
                clicked = { props.choosed }
                index = {index}
            />
        )
    })

    return (
        <div className={classes.NotesList}>
            {props.notes.length < 1 ? null : notesToRender}
        </div>
    )
}


export default notesList;