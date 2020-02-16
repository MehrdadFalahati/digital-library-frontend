import * as actionTypes from './actionTypes';
import axios from '../../axios-library';

export const fetchLibrarySuccess = ( libraryList ) => {
    return {
        type: actionTypes.FETCH_LIBRARY_SUCCESS,
        libraryList: libraryList
    };
};

export const fetchLibraryFail = ( error ) => {
    return {
        type: actionTypes.FETCH_LIBRARY_FAIL,
        error: error
    };
};

export const fetchLibraryStart = () => {
    return {
        type: actionTypes.FETCH_LIBRARY_START
    };
};

export const fetchLibrary = (token, page, size) => {
    return dispatch => {
        dispatch(fetchLibraryStart());
        const params = {
            page:page,
            size:size
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params:params
        };
        axios.get( '/library/libraries' , config)
            .then( res => {
                console.log(res.data);
                dispatch(fetchLibrarySuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchLibraryFail(err));
            } );
    };
};