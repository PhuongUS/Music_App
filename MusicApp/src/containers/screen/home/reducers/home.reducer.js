import { 
    ALBUM_REQUEST,
    ALBUM_SUCCESS,
    ALBUM_FAILURE,
    FEATURED_ALBUM_REQUEST,
    FEATURED_ALBUM_SUCCESS,
    FEATURED_ALBUM_FAILURE,
    GENRES_REQUEST,
    GENRES_SUCCESS,
    GENRES_FAILURE,

} from '../actions/home.actionTypes'

initialAlbumState = {
    isLoading: false,
    error: null,
    data: null,
}
initialAlbumFeaturedState = {
    isLoading: false,
    error: null,
    data: null,
}
initialGenresState = {
    isLoading: false,
    error: null,
    data: null,
}
export const getAbumReducer = (state = initialLoginState, action) => {
    const {type, payload} = action

    switch (type) {
        case ALBUM_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case ALBUM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case ALBUM_FAILURE:
            return {
                ...state,
                isLoading:false,
                error : 'fail',
            }
        default:
            return state
    }
}


export const getAbumFeaturedReducer = (state = initialAlbumFeaturedState, action) => {
    const {type, payload} = action

    switch (type) {
        case FEATURED_ALBUM_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case FEATURED_ALBUM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case FEATURED_ALBUM_FAILURE:
            return {
                ...state,
                isLoading:false,
                error : 'fail',
            }
        default:
            return state
    }
}
export const getGenresReducer = (state = initialGenresState, action) => {
    const {type, payload} = action

    switch (type) {
        case GENRES_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case GENRES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case GENRES_FAILURE:
            return {
                ...state,
                isLoading:false,
                error : 'fail',
            }
        default:
            return state
    }
}