import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    contentAttachments: [],
    loading: false,
};

const fetchContentAttachmentStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchContentAttachmentSuccess = ( state, action ) => {
    return updateObject( state, {
        contentAttachments: action.contentAttachments,
        loading: false
    } );
};

const fetchContentAttachmentFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CONTENTATTACHMENT_START: return fetchContentAttachmentStart( state, action );
        case actionTypes.FETCH_CONTENTATTACHMENT_SUCCESS: return fetchContentAttachmentSuccess( state, action );
        case actionTypes.FETCH_CONTENTATTACHMENT_FAIL: return fetchContentAttachmentFail( state, action );
        default: return state;
    }
};

export default reducer;