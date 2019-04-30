import {
    ARTIST_REQUEST,
    ARTIST_SUCCESS,
    ARTIST_FAILURE,
    TRACK_ARTIST_REQUEST,
    TRACK_ARTIST_SUCCESS,
    TRACK_ARTIST_FAILURE,

} from './artists.actionTypes'
import {APIgetArtist,APIgetTrackArtist} from '../../../../network/axios.config';
import errorHandler from '../../../../network/network.errorHandler';
export const getArtist = (token) => {
    return (dispatch) => {
        dispatch({
            type: ARTIST_REQUEST
        })

        APIgetArtist(token).get()
            .catch(err => {
                dispatch(errorHandler(err))
                dispatch({
                    type: ARTIST_FAILURE,
                    payload: null
                })
            })
            .then(res => {
                console.log(res)
                dispatch({
                    type: ARTIST_SUCCESS,
                    payload: res.data
                })
            })
    }
}
export const getTrackArtist = (token,track_id) => {
    return (dispatch) => {
        dispatch({
            type: TRACK_ARTIST_REQUEST
        })

        APIgetTrackArtist(token,track_id).get()
            .catch(err => {
                dispatch(errorHandler(err))
                dispatch({
                    type: TRACK_ARTIST_FAILURE,
                    payload: null
                })
            })
            .then(res => {
                console.log(res)
                dispatch({
                    type: TRACK_ARTIST_SUCCESS,
                    payload: res.data
                })
            })
    }
}