import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter,Redirect} from 'react-router-dom';

import NotesList from '../../components/NotesList/NotesList'
import Aux from '../../hoc/Auxiliary/Auxiliary';
import NoteContols from '../../components/NoteControls/NoteControls';
import CurrentNote from '../../components/CurrentNote/CurrentNote';
import * as actions from '../../store/actions';

import classes from './Notes.css';


class Notes extends Component {

    state = {
        currentNote: null,
        currentNoteKey: null,
        sortedBy: "All"
    }

    componentDidUpdate(){
        if(this.props.newNote){
            this.setState({
                currentNote: this.props.notes[0],
                currentNoteKey: 0
            });
            this.props.newNoteAdded();
        }
    }

    componentWillMount(){
        this.props.getNotes(this.props.auth,'');
        this.props.setHeader();
    }
   
    newNoteHandler = () => {
        this.props.createNote(this.props.auth);
    }

    chooseNoteHandler = (key) => {
        this.setState({
            currentNote: this.props.notes[key],
            currentNoteKey: key
        })
    }

    deleteNoteHandler = () => {
        if(this.state.currentNoteKey !== null){
            this.props.deleteNote(this.state.currentNote.id,this.props.auth);
            this.setState({ currentNote: null, currentNoteKey: null});
        }       
    }

    changeNoteHandler = (event,field) => {
            this.props.updateNoteLocal(field, event.target.value, this.state.currentNoteKey);
    }

    toogleArchivedHandler = () => {
        if(this.state.currentNoteKey){
            this.props.updateNoteLocal('archived', !this.state.currentNote.archived, this.state.currentNoteKey);
            this.props.updateNote(this.state.currentNote, this.props.auth);
        }
    }

    blurCurrentNoteHandler = () => {
        this.props.updateNote(this.state.currentNote, this.props.auth);
    }

    dueDateChangeHandler = (date) => {
        this.props.updateNoteLocal('due_date', date, this.state.currentNoteKey);
        this.props.updateNote(this.state.currentNote, this.props.auth);
    }

    sortChangeHandler = (value) => {
        this.setState({ sortedBy: value})
    }

    searchChangeHandler = (e) => {
        this.props.getNotes(this.props.auth,e.target.value);
    }

    render() {
        console.log(this.props.auth.token,'token');
        return (
            <Aux>
                {!this.props.auth.token ? <Redirect to="auth" /> : null}
                <NoteContols
                     newNote={this.newNoteHandler}
                     deleteNote={this.deleteNoteHandler}
                     archived ={ this.state.currentNote ?  this.state.currentNote.archived : false}
                     toogleArchived = {this.state.currentNote ? this.toogleArchivedHandler : null}
                     dueDate = {  this.state.currentNote ?  this.state.currentNote.due_date : false}
                     dueChange = {this.state.currentNote ? this.dueDateChangeHandler : null}
                     sortChanged = {this.sortChangeHandler}
                     searchHandler = {this.searchChangeHandler}
                 />
                <div className={classes.NotesBody}>
                    {this.props.notes ?
                        <NotesList 
                        notes = {this.props.notes}
                        choosed = {this.chooseNoteHandler}
                        sortedBy = {this.state.sortedBy}
                        loading = {this.props.loadingList}
                    />
                     : null}
                    
                    {this.state.currentNote ? 
                    <CurrentNote 
                        note={this.state.currentNote}
                        titleChanged={this.changeTitleHandler}
                        textChanged={this.changeTextHandler}
                        changed={this.changeNoteHandler}
                        focusout={this.blurCurrentNoteHandler}
                        loadingNewNote = {this.props.loadingNewNote}
                    /> : null}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
        notes: state.notes.notes,
        auth: state.auth,
        loadingList:  state.notes.loadingList,
        loadingNewNote:  state.notes.loadingNewNote,
        newNote: state.notes.newNote
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        getNotes:        (auth,search_keywords) => dispatch(actions.getAllNotes(auth,search_keywords)),
        updateNoteLocal: (field,value,key) => dispatch(actions.updateNoteLocal(field,value,key)),
        updateNote:      (note,auth) => dispatch(actions.updateNote(note,auth)),
        createNote:      (auth) => dispatch(actions.createNote(auth)),
        deleteNote:      (noteId, auth) => dispatch(actions.deleteNote(noteId,auth)),
        setHeader:       () => dispatch(actions.setHeader('notes')),
        newNoteAdded:      () => dispatch(actions.newNoteAdded())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Notes));