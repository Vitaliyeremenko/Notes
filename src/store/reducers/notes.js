import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    notes: [],
    error: null,
    loadingList: false,
    loadingNewNote: false, 
    newNote: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_ALL_NOTES_START : {
            return {
                ...state,
                loadingList: true
            }
        }
        case actionTypes.GET_ALL_NOTES_SUCCESS : {
            return {
                ...state,
                notes: action.notes,
                loadingList: false
            }
        }
        case actionTypes.GET_ALL_NOTES_FAIL : {
            return {
                ...state,
                error: action.error,
                loadingList: false
            }
        }
        case actionTypes.UPDATE_NOTE_LOCAL : {
            let updatedField = state.notes[action.key];
            updatedField[action.field] = action.value;
            let notes = [...state.notes];
            notes[action.key] = updatedField;
            return {
                ...state,
                 notes: notes
            }
        }
        case actionTypes.UPDATE_NOTE_START : {
            return {
                ...state
            }
        }
        case actionTypes.UPDATE_NOTE_SUCCESS : {
            return {
                ...state
            }
        }
        case actionTypes.UPDATE_NOTE_FAIL : {
            return {
                ...state,
                error: action.error
            }
        }
        case actionTypes.CREATE_NOTE_START : {
            return {
                ...state,
                loadingList: true,
                loadingNewNote: true
            }
        }
        case actionTypes.CREATE_NOTE_SUCCESS : {
            let newNotes = [...state.notes];
            newNotes.unshift(action.newNote);
            return {
                ...state,
                notes: newNotes,
                loadingList: false,
                loadingNewNote: false,
                newNote : true
            }
        }
        case actionTypes.CREATE_NOTE_FAIL : {
            return {
                ...state,
                error: action.error,
                loadingList: false,
                loadingNewNote: false
            }
        }
        case actionTypes.DELETE_NOTE_START : {
            return {
                ...state,
                loadingList: true,
            }
        }
        case actionTypes.DELETE_NOTE_SUCCESS : {
            let newNotes = state.notes.filter(item => item.id !== action.noteId);
            
            return {
                ...state,
                notes: newNotes,
                loadingList: false,
            }
        }
        case actionTypes.DELETE_NOTE_FAIL : {
            return {
                ...state,
                error: action.error
            }
        }
        case actionTypes.NEW_NOTE_ADDED : {
            return {
                ...state,
                newNote: false
            }
        }
        default: 
            return {
                ...state
            }
    }
}

export default reducer;