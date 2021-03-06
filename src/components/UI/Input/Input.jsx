import React from 'react';

import classes from './Input.css';

const input = ( props ) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];
    if(props.classes){
        props.classes.forEach(function(item){
            inputClasses.push(classes[item]);
        });
    }
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
  
    

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} 
                onBlur={props.focusout}/>;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                onBlur={props.focusout}
                 />;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );

};

export default input;