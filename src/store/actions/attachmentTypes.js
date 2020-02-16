import * as actionTypes from './actionTypes';
import axios from '../../axios-library';

export const fetchAttachmentTypesSuccess = ( attachmentTypes ) => {
    return {
        type: actionTypes.FETCH_ATTACHMENTTYPES_SUCCESS,
        attachmentTypes: attachmentTypes,
    };
};

export const fetchAttachmentTypesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ATTACHMENTTYPES_FAIL,
        error: error
    };
};

export const fetchAttachmentTypesStart = () => {
    return {
        type: actionTypes.FETCH_ATTACHMENTTYPES_START
    };
};

export const fetchAttachmentTypes = (token, page, size) => {
    return dispatch => {
        dispatch(fetchAttachmentTypesStart());
        const params = {
            page:page,
            size:size
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            params:params
        };
        axios.get( '/attachment-type/attachment-types' , config)
            .then( res => {
                console.log(res.data);
                dispatch(fetchAttachmentTypesSuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchAttachmentTypesFail(err));
            } );
    };
};