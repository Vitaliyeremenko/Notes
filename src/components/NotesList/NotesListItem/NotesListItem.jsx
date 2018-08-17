import React from 'react';

import classes from './NoteListItem.css'


//just example
const Paragraph = ({defaultText, text, wordsAmount, classes}) => 
    <p className={classes}>{text ? text.split(' ').splice(0,wordsAmount).join(' '): defaultText}</p>;

const notesListItem = (props) => {

    const titleClasses = props.item.archived ? [classes.Title, classes.TitleDue].join(' ') : classes.Title;
    const textClasses = props.item.archived ? [classes.Text, classes.TextDue].join(' ') : classes.Text;

    function refactDate(date){
        return date.split('-').reverse().join('.')
    }
    
    return (
        <div className={classes.Item} onClick={() => {props.clicked(props.index)}}>
            <h4 className={titleClasses}>{props.item.title ? props.item.title : 'New note'}</h4>
            <Paragraph 
                classes = {textClasses}
                text= {props.item.text}
                defaultText = "Some details here"
                wordsAmount = {3}
            />
            <span className={classes.DueDate}>{props.item.due_date ? refactDate(props.item.due_date) : null}</span>
        </div>
    )
}

export default notesListItem;