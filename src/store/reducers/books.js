import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    books: [],
    libraries: [],
    book: null,
    loading: false,
};

const fetchBooksStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchBooksSuccess = ( state, action ) => {
    return updateObject( state, {
        books: action.books,
        loading: false
    } );
};

const fetchBooksFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchLibraryBooksStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchLibraryBooksSuccess = ( state, action ) => {
    return updateObject( state, {
        libraries: action.libraries,
        loading: false
    } );
};

const fetchLibraryBooksFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const loadBookStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const loadBookSuccess = ( state, action ) => {
    return updateObject( state, {
        book: action.book,
        loading: false
    } );
};

const loadBookFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_BOOKS_START: return fetchBooksStart( state, action );
        case actionTypes.FETCH_BOOKS_SUCCESS: return fetchBooksSuccess( state, action );
        case actionTypes.FETCH_BOOKS_FAIL: return fetchBooksFail( state, action );
        case actionTypes.FETCH_LIBRARY_BOOKS_START: return fetchLibraryBooksStart( state, action );
        case actionTypes.FETCH_LIBRARY_BOOKS_SUCCESS: return fetchLibraryBooksSuccess( state, action );
        case actionTypes.FETCH_LIBRARY_BOOKS_FAIL: return fetchLibraryBooksFail( state, action );
        case actionTypes.LOAD_BOOKS_START: return loadBookStart( state, action);
        case actionTypes.LOAD_BOOKS_SUCCESS: return loadBookSuccess( state, action);
        case actionTypes.LOAD_BOOKS_FAIL: return loadBookFail( state, action);
        default: return state;
    }
};

export default reducer;