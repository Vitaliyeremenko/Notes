import React from 'react';

import NotesListItem from './NotesListItem/NotesListItem';
import Spinner from '../../components/UI/Spinner/Spinner';

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

    if(props.notes.length < 1){
        notesToRender = <p>Ooops...  You havn`t any items</p>
    }

    if(props.loading){
        notesToRender = <Spinner />
    }




    return (
        <div className={classes.NotesList}>
            {notesToRender}
        </div>
    )
}


export default notesList;