import React from 'react';

import Input from '../UI/Input/Input';
import Textrea from '../UI/Input/Textarea';
import classes from './CurrentNote.css';

export const currentNote = (props) => {

    return (
      <div className={classes.CurrentNote}>
          <Input 
            elementType="input"
            elementConfig={{
                type: 'text',
                placeholder: 'Title'
            }}
            value = {props.note.title}
            changed = {(e)=>props.changed(e,'title')}AC
            focusout = {props.focusout}
            classes= {['Title']}
            />
          <Textrea 
            elementConfig={{
                placeholder: 'Details',
                id: 'texarea'
            }}
            value = {props.note.text}
            changed = {(e)=>props.changed(e,'text')}
            focusout = {props.focusout}
            classes= {['Text']}
            />
      </div>
    )
}

export default currentNote;