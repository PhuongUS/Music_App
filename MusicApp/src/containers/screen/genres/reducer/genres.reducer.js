import {
    PLAYLIST_GENRES_REQUEST,
    PLAYLIST_GENRES_SUCCESS,
    PLAYLIST_GENRES_FAILURE,
    MUSIC_GENRES_SUCCESS,
    MUSIC_GENRES_FALURE,
    MUSIC_GENRES_REQUEST
} from '../actions/genres.actionType'
initialPlaylistState = {
    isLoading: false,
    error: null,
    data: null,
}
export const getPlaylistOfGenres = (state = initialPlaylistState, action) => {
    const {type, payload} = action

    switch (type) {
        case PLAYLIST_GENRES_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case PLAYLIST_GENRES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case PLAYLIST_GENRES_FAILURE:
            return {
                ...state,
                isLoading:false,
                error : 'fail',
            }
        default:
            return state
    }
}
initialMusicGenresState = {
    isLoading: false,
    error: null,
    data: null,
}
export const getPlayMusicOfGenres = (state = initialMusicGenresState, action) => {
    const {type, payload} = action

    switch (type) {
        case MUSIC_GENRES_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case MUSIC_GENRES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case MUSIC_GENRES_FALURE:
            return {
                ...state,
                isLoading:false,
                error : 'fail',
            }
        default:
            return state
    }
}