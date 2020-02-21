import * as actionTypes from './actionTypes';
import axios from '../../axios-library';

export const fetchContentAttachmentSuccess = ( contentAttachments ) => {
    return {
        type: actionTypes.FETCH_CONTENTATTACHMENT_SUCCESS,
        contentAttachments: contentAttachments,
    };
};

export const fetchContentAttachmentFail = ( error ) => {
    return {
        type: actionTypes.FETCH_CONTENTATTACHMENT_FAIL,
        error: error
    };
};

export const fetchContentAttachmentStart = () => {
    return {
        type: actionTypes.FETCH_CONTENTATTACHMENT_START
    };
};

export const fetchContentAttachments = (token, id) => {
    return dispatch => {
        dispatch(fetchContentAttachmentStart());
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios.get( '/content-attachment/content-attachments/'+ id +'/content' , config)
            .then( res => {
                console.log(res.data);
                dispatch(fetchContentAttachmentSuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchContentAttachmentFail(err));
            } );
    };
};