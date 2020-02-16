import * as actionTypes from './actionTypes';
import axios from '../../axios-library';

export const fetchContentSuccess = ( contents ) => {
    return {
        type: actionTypes.FETCH_CONTENT_SUCCESS,
        contents: contents,
    };
};

export const fetchContentFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CONTENT_FAIL,
        error: error
    };
};

export const fetchContentStart = () => {
    return {
        type: actionTypes.FETCH_CONTENT_START
    };
};

export const fetchContents = (token) => {
    return dispatch => {
        dispatch(fetchContentStart());
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios.get( '/content/contents' , config)
            .then( res => {
                console.log(res.data);
                dispatch(fetchContentSuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchContentFail(err));
            } );
    };
};