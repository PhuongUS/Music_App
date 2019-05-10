import{
    PLAYLIST_GENRES_REQUEST,
    PLAYLIST_GENRES_SUCCESS,
    PLAYLIST_GENRES_FAILURE,
    MUSIC_GENRES_SUCCESS,
    MUSIC_GENRES_FALURE,
    MUSIC_GENRES_REQUEST,
    ADD_LIST_GENRES
} from './genres.actionType'

import{APIPlaylistOfGenres,APIgetMusicOfGenres} from '../../../../network/axios.config';
import errorHandler from '../../../../network/network.errorHandler';
export const getPlaylistOfGenres = (token,category_id) => {
    return (dispatch) => {
        dispatch({type: PLAYLIST_GENRES_REQUEST})

        APIPlaylistOfGenres(token,category_id).get()
            .catch(err => {
                dispatch(errorHandler(err))
                dispatch({type: PLAYLIST_GENRES_FAILURE, payload: null})
            })
            //.then(res=>res.json())
            .then(res => {
                console.log(res)
                dispatch({type: PLAYLIST_GENRES_SUCCESS, payload: res.data})
            })
    }
}

export const getListMusicOfGenres=(token,playlist_id)=>{
    return(dispatch)=>{
        dispatch({type:MUSIC_GENRES_REQUEST})
        APIgetMusicOfGenres(token,playlist_id).get()
        .catch(err=>{
            dispatch(errorHandler(err))
            dispatch({type:MUSIC_GENRES_FALURE,payload:null})
        })
        .then(res=>{
            var dataMusic =[];
            res.data.tracks.items.forEach(item => {
                dataMusic=dataMusic.concat(item.track)
              });
            dispatch({type:'SEND_DATA',payload:dataMusic}) //lấy action ListMusic
        })
    }
}
export const addListGenres=(item)=>{
    return (dispatch)=>{
        dispatch({type:ADD_LIST_GENRES,payload:item})
    }
}


