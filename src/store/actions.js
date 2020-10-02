import * as actionTypes from './actionTypes';
import axios from '../axios-images';


export const fetchImagesSuccess = (images) => {
    return {
        type: actionTypes.FETCH_IMAGES_SUCCESS,
        images: images
    };
};
export const fetchImagesFail = (error) => {
    return {
        type: actionTypes.FETCH_IMAGES_FAIL,
        error: error
    };
};
export const fetchImagesStart = () => {
    return {
        type: actionTypes.FETCH_IMAGES_START
    };
};
export const fetchImages = () => {
    return dispatch => {
        dispatch(fetchImagesStart());
        axios.get('/images.json')
            .then(res => {
                const fetchedimages = [];
                for (let key in res.data) {
                    fetchedimages.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchImagesSuccess(fetchedimages));
            })
            .catch(err => {
                dispatch(fetchImagesFail(err));
            });
    };
};
export const deleteImageFail = (error) => {
    return {
        type: actionTypes.DELETE_IMAGE_FAIL,
        error: error
    };
};
export const deleteImageSuccess = () => {
    return {
        type: actionTypes.DELETE_IMAGE_SUCCESS
    };
};
export const deleteImage = (id) => {
    return dispatch => {
        axios.delete("/images/" + id + ".json?").then(resp => {
            dispatch(deleteImageSuccess());
            dispatch(fetchImages());
        }).catch(err => {
            dispatch(deleteImageFail(err));
        });
    };
};
