import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Select from '../UI/Select/Select'

import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import  classes from './NoteControls.css';
import searchImage from '../../assets/images/Search.svg';
import newImage from '../../assets/images/New.svg';
import canImage from '../../assets/images/Can.svg';
import archiveImage from '../../assets/images/Archive.svg';
import archivedImage from '../../assets/images/Archived.svg';
import dueImage from '../../assets/images/Due.svg';


const noteControls = (props) => {


    return (
        <div className={classes.NoteControls}>  
            <div className={classes.NoteControlsWrapper}>
                <div className={classes.NoteControlsSelect}>
                    <Select 
                        elementConfig = {{
                            options : [
                                { displayValue : 'All', value: 'All'},
                                { displayValue : 'Active', value: 'Active'},
                                { displayValue : 'Archived', value: 'Archived'},
                            ],
                            default: { displayValue : 'All', value: 'All'}
                        }}
                        changed = {props.sortChanged}
                        classes = {['FilterSelect']}
                    />
                </div>
                <div className={classes.NoteControlsSearch}>
                    <img src={searchImage} alt="search"/>
                    <Input
                        elementType = 'input'
                        elementConfig = {{
                            placeholder : 'Search'
                        }}
                        changed = {props.searchHandler}
                        classes = {['Search']}
                        
                    />
                </div> 
                <Button 
                    clicked={props.newNote} 
                    btnType="Control"
                > 
                        <img src={newImage} alt="new"/> New Note
                </Button>
                <Button 
                    clicked={props.deleteNote} 
                    btnType="Control"
                >
                        <img src={canImage} alt="can"/> Delete 
                </Button>

                <label onClick={props.toogleArchived} className={classes.Control}>
                        <img src={props.archived ? archivedImage : archiveImage} alt=""/>
                        <span>{props.archived ? 'Archived' : 'Archive'}</span>
                </label>
                
                <div className={[classes.Control,classes.Due].join(' ')}>
                    <img src={dueImage} alt="due"/>
                    Due Date
                     <DatePicker 
                        selected={props.dueDate ? moment(props.dueDate)  : null} 
                        onChange={(date) => props.dueChange(date.format("YYYY-MM-DD"))}
                        dateFormat="DD.MM.YYYY"
                    />
                </div>
                
            </div>
        </div>
    )
}


export default noteControls;