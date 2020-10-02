import * as actionTypes from './actionTypes';
import { updateObject } from './utility';
const initialState = {
    images: [],
    loading: false,
    error:undefined
}


const fetchStart = (state, action) => {
    return updateObject(state, { loading: true });
};
const fetchSuccess = (state, action) => {
    return updateObject(state, {
        images: action.images,
        loading: false
    });
};

const fetchFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const deleteFail = (state, action) => {
    return updateObject(state, { error: action.error});
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_IMAGES_START: return fetchStart(state, action);
        case actionTypes.FETCH_IMAGES_SUCCESS: return fetchSuccess(state, action);
        case actionTypes.FETCH_IMAGES_FAIL: return fetchFail(state, action);
        case actionTypes.DELETE_IMAGE_FAIL: return deleteFail(state, action);
        default: return state;
    }
};
export default reducer;