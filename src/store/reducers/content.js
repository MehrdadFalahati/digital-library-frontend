import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    contents: [],
    content: null,
    loading: false,
};

const fetchContentStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchContentSuccess = ( state, action ) => {
    return updateObject( state, {
        contents: action.contents,
        loading: false
    } );
};

const fetchContentFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const loadContentStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const loadContentSuccess = ( state, action ) => {
    return updateObject( state, {
        content: action.content,
        loading: false
    } );
};

const loadContentFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_CONTENT_START: return fetchContentStart( state, action );
        case actionTypes.FETCH_CONTENT_SUCCESS: return fetchContentSuccess( state, action );
        case actionTypes.FETCH_CONTENT_FAIL: return fetchContentFail( state, action );
        case actionTypes.LOAD_CONTENT_START: return loadContentStart( state, action);
        case actionTypes.LOAD_CONTENT_SUCCESS: return loadContentSuccess( state, action);
        case actionTypes.LOAD_CONTENT_FAIL: return loadContentFail( state, action);
        default: return state;
    }
};

export default reducer;