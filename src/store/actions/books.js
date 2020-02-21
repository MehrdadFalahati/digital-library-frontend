import * as actionTypes from './actionTypes';
import axios from '../../axios-library';

export const fetchBooksSuccess = ( books ) => {
    return {
        type: actionTypes.FETCH_BOOKS_SUCCESS,
        books: books,
    };
};

export const fetchBooksFail = ( error ) => {
    return {
        type: actionTypes.FETCH_BOOKS_FAIL,
        error: error
    };
};

export const fetchBooksStart = () => {
    return {
        type: actionTypes.FETCH_BOOKS_START
    };
};

export const fetchBooks = (libraryId) => {
    return dispatch => {
        dispatch(fetchBooksStart());
        axios.get( '/books/content/'+ libraryId +"/library")
            .then( res => {
                console.log(res.data);
                dispatch(fetchBooksSuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchBooksFail(err));
            } );
    };
};

export const fetchBooksLibrarySuccess = ( libraries ) => {
    return {
        type: actionTypes.FETCH_LIBRARY_BOOKS_SUCCESS,
        libraries: libraries,
    };
};

export const fetchBooksLibraryFail = ( error ) => {
    return {
        type: actionTypes.FETCH_LIBRARY_BOOKS_FAIL,
        error: error
    };
};

export const fetchBooksLibraryStart = () => {
    return {
        type: actionTypes.FETCH_LIBRARY_BOOKS_START
    };
};

export const fetchLibraryBooks = () => {
    return dispatch => {
        dispatch(fetchBooksLibraryStart());
        axios.get( '/books/libraries')
            .then( res => {
                console.log(res.data);
                dispatch(fetchBooksLibrarySuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchBooksLibraryFail(err));
            } );
    };
};


export const loadBookSuccess = ( book ) => {
    return {
        type: actionTypes.LOAD_BOOKS_SUCCESS,
        book: book,
    };
};

export const loadBookFail = ( error ) => {
    return {
        type: actionTypes.LOAD_BOOKS_FAIL,
        error: error
    };
};

export const loadBookStart = () => {
    return {
        type: actionTypes.LOAD_BOOKS_START
    };
};

export const loadBook = (id) => {
    return dispatch => {
        dispatch(loadBookStart());
        axios.get( '/books/content/'+ id)
            .then( res => {
                console.log(res.data);
                dispatch(loadBookSuccess(res.data));
            } )
            .catch( err => {
                dispatch(loadBookFail(err));
            } );
    };
};