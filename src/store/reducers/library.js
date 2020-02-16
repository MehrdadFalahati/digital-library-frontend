import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    libraryList: [],
    loading: false,
};

const fetchLibraryStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchLibrarySuccess = ( state, action ) => {
    return updateObject( state, {
        libraryList: action.libraryList,
        loading: false
    } );
};

const fetchLibraryFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_LIBRARY_START: return fetchLibraryStart( state, action );
        case actionTypes.FETCH_LIBRARY_SUCCESS: return fetchLibrarySuccess( state, action );
        case actionTypes.FETCH_LIBRARY_FAIL: return fetchLibraryFail( state, action );
        default: return state;
    }
};

export default reducer;