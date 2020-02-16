import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    attachmentTypes: [],
    loading: false,
};

const fetchAttachmentTypesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchAttachmentTypesSuccess = ( state, action ) => {
    return updateObject( state, {
        attachmentTypes: action.attachmentTypes,
        attachmentTypeTableParams: action.attachmentTypeTableParams,
        loading: false
    } );
};

const fetchAttachmentTypesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_ATTACHMENTTYPES_START: return fetchAttachmentTypesStart( state, action );
        case actionTypes.FETCH_ATTACHMENTTYPES_SUCCESS: return fetchAttachmentTypesSuccess( state, action );
        case actionTypes.FETCH_ATTACHMENTTYPES_FAIL: return fetchAttachmentTypesFail( state, action );
        default: return state;
    }
};

export default reducer;