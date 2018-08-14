import React from 'react';

import classes from './NoteListItem.css'

const notesListItem = (props) => {

    const titleClasses = props.item.archived ? [classes.Title, classes.TitleDue].join(' ') : classes.Title;
    const textClasses = props.item.archived ? [classes.Text, classes.TextDue].join(' ') : classes.Text;

    function refactDate(date){
        return date.split('-').reverse().join('.')
    }
    
    return (
        <div className={classes.Item} onClick={() => {props.clicked(props.index)}}>
            <h4 className={titleClasses}>{props.item.title ? props.item.title : 'New note'}</h4>
            <p className={textClasses}>{props.item.text ? props.item.text.split(' ').splice(0,3).join(' '): 'Some details here'}</p>
            <span className={classes.DueDate}>{props.item.due_date ? refactDate(props.item.due_date) : null}</span>
        </div>
    )
}


export default notesListItem;