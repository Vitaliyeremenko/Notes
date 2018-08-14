import React from 'react';

import Input from '../UI/Input/Input';
import Textrea from '../UI/Input/Textarea';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './CurrentNote.css';
import Spinner from '../../components/UI/Spinner/Spinner';

export const currentNote = (props) => {

    let render = (
        <Aux>
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
        </Aux>
    );

    if(props.loadingNewNote){
        render= <Spinner/>;
    }

    return (
      <div className={classes.CurrentNote}>
         {render}
      </div>
    )
}

export default currentNote;