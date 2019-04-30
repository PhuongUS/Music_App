import {
    ALBUM_REQUEST,
    ALBUM_SUCCESS,
    ALBUM_FAILURE,
    FEATURED_ALBUM_REQUEST,
    FEATURED_ALBUM_SUCCESS,
    FEATURED_ALBUM_FAILURE,
    GENRES_REQUEST,
    GENRES_SUCCESS,
    GENRES_FAILURE
} from './home.actionTypes'

import {APIAlbum,APIAlbumFeatured,APIListGenres} from '../../../../network/axios.config';
import errorHandler from '../../../../network/network.errorHandler'

export const AlbumRequest = (token) => {
    return (dispatch) => {
        dispatch({type: ALBUM_REQUEST})

        APIAlbum(token).get()
            .catch(err => {
                dispatch(errorHandler(err))
                dispatch({type: ALBUM_FAILURE, payload: null})
            })
            //.then(res=>res.json())
            .then(res => {
                console.log(res)
                dispatch({type: ALBUM_SUCCESS, payload: res.data})
            })
    }
}

export const AlbumFeature = (token) => {
    return (dispatch) => {
        dispatch({type: FEATURED_ALBUM_REQUEST})

        APIAlbumFeatured(token).get()
            .catch(err => {
                dispatch(errorHandler(err))
                dispatch({type: FEATURED_ALBUM_FAILURE, payload: null})
            })
            //.then(res=>res.json())
            .then(res => {
                console.log(res)
                dispatch({type: FEATURED_ALBUM_SUCCESS, payload: res.data})
            })
    }
}
export const getGenres = (token) => {
    return (dispatch) => {
        dispatch({type: GENRES_REQUEST})

        APIListGenres(token).get()
            .catch(err => {
                dispatch(errorHandler(err))
                dispatch({type: GENRES_FAILURE, payload: null})
            })
            //.then(res=>res.json())
            .then(res => {
                console.log(res)
                dispatch({type: GENRES_SUCCESS, payload: res.data})
            })
    }
}