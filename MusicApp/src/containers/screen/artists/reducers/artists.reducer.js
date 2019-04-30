import {
    ARTIST_REQUEST,
    ARTIST_SUCCESS,
    ARTIST_FAILURE,
    TRACK_ARTIST_REQUEST,
    TRACK_ARTIST_SUCCESS,
    TRACK_ARTIST_FAILURE,
}
from '../actions/artists.actionTypes'
initialArtistState = {
    isLoading: false,
    error: null,
    data: null,
}
export const getArtistReducer = (state = initialArtistState, action) => {
    const {type, payload} = action

    switch (type) {
        case ARTIST_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case ARTIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case ARTIST_FAILURE:
            return {
                ...state,
                isLoading:false,
                error : 'fail',
            }
        default:
            return state
    }
}
initialArtistState = {
    isLoading: false,
    error: null,
    data: null,
}
export const getTrackArtistReducer = (state = initialArtistState, action) => {
    const {type,payload} = action

    switch (type) {
        case TRACK_ARTIST_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case TRACK_ARTIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case TRACK_ARTIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: 'fail',
            }
        default:
            return state
    }
}