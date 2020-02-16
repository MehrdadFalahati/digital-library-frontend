import * as actionTypes from './actionTypes';
import axios from '../../axios-library';

export const fetchContentTypesSuccess = ( contentTypes ) => {
    return {
        type: actionTypes.FETCH_CONTENTTYPES_SUCCESS,
        contentTypes: contentTypes,
    };
};

export const fetchContentTypesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CONTENTTYPES_FAIL,
        error: error
    };
};

export const fetchContentTypesStart = () => {
    return {
        type: actionTypes.FETCH_CONTENTTYPES_START
    };
};

export const fetchContentTypes = (token, page, size) => {
    return dispatch => {
        dispatch(fetchContentTypesStart());
        const params = {
            page:page,
            size:size
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params:params
        };

        axios.get( '/content-type/content-types' , config)
            .then( res => {
                console.log(res.data);
                dispatch(fetchContentTypesSuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchContentTypesFail(err));
            } );
    };
};