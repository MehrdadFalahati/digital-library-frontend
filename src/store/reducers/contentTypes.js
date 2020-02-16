import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    contentTypes: [],
    loading: false,
};

const fetchContentTypesStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchContentTypesSuccess = ( state, action ) => {
    return updateObject( state, {
        contentTypes: action.contentTypes,
        loading: false
    } );
};

const fetchContentTypesFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CONTENTTYPES_START: return fetchContentTypesStart( state, action );
        case actionTypes.FETCH_CONTENTTYPES_SUCCESS: return fetchContentTypesSuccess( state, action );
        case actionTypes.FETCH_CONTENTTYPES_FAIL: return fetchContentTypesFail( state, action );
        default: return state;
    }
};

export default reducer;