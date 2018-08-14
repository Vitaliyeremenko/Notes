import * as actionTypes from './actionsTypes';
import axios from '../../axios-instance';


export const getAllNotesStart = () =>{
    return{
        type: actionTypes.GET_ALL_NOTES_START
    }
}

export const getAllNotesSuccess = (notes) =>{
    return{
        type: actionTypes.GET_ALL_NOTES_SUCCESS,
        notes: notes
    }
}

export const getAllNotesFail = () =>{
    return{
        type: actionTypes.GET_ALL_NOTES_FAIL
    }
}

export const getAllNotes = (auth,search_keywords) => {
    return dispatch => {
       
        const config = {
            headers: {
                client : auth.client,
                expiry : auth.expiry,
                uid    : auth.uid
            },
            params : {
                search_keywords: search_keywords
            }
        };
        config.headers['access-token'] = auth['token'];
        
        dispatch(getAllNotesStart());
        axios.get('/notes', config)
            .then(res => {
                console.log(res);
                dispatch(getAllNotesSuccess(res.data))
            })
            .catch(err => {
                dispatch(getAllNotesFail(err.data))
            })

    }
}


export const updateNoteLocal = (field,value,key) => {
    return {
        type: actionTypes.UPDATE_NOTE_LOCAL,
        field: field,
        value: value,
        key: key
    }
}

export const updateNoteStart = () => {
    return {
        type: actionTypes.UPDATE_NOTE_START
    }
}

export const updateNoteSuccess = () => {
    return {
        type: actionTypes.UPDATE_NOTE_SUCCESS
    }
}

export const updateNoteFail = (error) => {
    return {
        type: actionTypes.UPDATE_NOTE_FAIL,
        error: error
    }
}

export const updateNote = (note, auth) => {
    return dispatch => {
        dispatch(updateNoteStart());

        const config = {
            headers: {
                client : auth.client,
                expiry : auth.expiry,
                uid    : auth.uid
            }
        };
        config.headers['access-token'] = auth['token'];

        const sendData = {
            title : note.title,
            text: note.text,
            archived: note.archived,
            due_date: note.due_date
        }

        axios.patch('/notes/' + note.id, sendData ,config)
            .then(response => {
                dispatch(updateNoteSuccess());
            })
            .catch(err => {
                dispatch(updateNoteFail(err));
            })
    }
}


export const createNoteStart = () => {
    return {
        type: actionTypes.CREATE_NOTE_START
    }
}

export const createNoteSuccess = (newNote) => {
    return {
        type: actionTypes.CREATE_NOTE_SUCCESS,
        newNote: newNote
    }
}

export const createNoteFail = (err) => {
    return {
        type: actionTypes.CREATE_NOTE_FAIL,
        error: err
    }
}

export const createNote = (auth) => {
    return dispatch => {

        dispatch(createNoteStart());
        const config = {
            headers: {
                client : auth.client,
                expiry : auth.expiry,
                uid    : auth.uid
            }
        };
        config.headers['access-token'] = auth['token'];

        const data = {
            title: '',
            text: '',
            archived: false,
            due_date: ''
        }
        axios.post('/notes',data,config)
            .then(res => {
                console.log(res)
                dispatch(createNoteSuccess(res.data))
            })
            .catch(err => {
                dispatch(createNoteFail(err))
            })

    }
}





export const deleteNoteStart = () => {
    return {
        type: actionTypes.DELETE_NOTE_START
    }
}

export const deleteNoteSuccess = (noteId) => {
    return {
        type: actionTypes.DELETE_NOTE_SUCCESS,
        noteId : noteId
    }
}

export const deleteNoteFail = (error) => {
    return {
        type: actionTypes.DELETE_NOTE_FAIL,
        error: error
    }
}

export const deleteNote = (noteId, auth) => {
    console.log(noteId, auth);
    return dispatch => {
        dispatch(deleteNoteStart());

        const config = {
            headers: {
                client : auth.client,
                expiry : auth.expiry,
                uid    : auth.uid
            }
        };
        config.headers['access-token'] = auth['token'];
        axios.delete('/notes/' + noteId ,config)
            .then(response => {
                dispatch(deleteNoteSuccess(noteId));
            })
            .catch(err => {
                dispatch(deleteNoteFail(err));
            })
    }
}

export const newNoteAdded = () => {
    return {
        type: actionTypes.NEW_NOTE_ADDED
    }
}