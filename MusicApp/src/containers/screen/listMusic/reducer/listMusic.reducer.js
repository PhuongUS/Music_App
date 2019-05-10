import {PLAYING,PAUSED} from '../../../../utils/utils'
initialMiniDetailState = {
    data:'hiden',
}

export const hidenShowMini = (state = initialMiniDetailState, action) => {
    const {type } = action

    switch (type) {
        case 'HIDEN_MINI':
            return{
                ...state,
                data:'hiden'
            }
        case 'SHOW_MINI':
            return{
                ...state,
                data:'show'
            }
        default:
            return state
    }
}
initialDataMusicState = {
    data: [],
}

export const sendDataMusic = (state = initialDataMusicState, action) => {
    const {type,payload } = action

    switch (type) {
        case 'SEND_DATA':
            return{
                ...state,
                data:payload,
            }
        default:
            return state
    }
}
initialIndexMusicState = {
    index: null,
}

export const sendIndexMusic = (state = initialIndexMusicState, action) => {
    const {type,payload } = action

    switch (type) {
        case 'SEND_INDEX_MUSIC':
            return{
                ...state,
                index:payload,
            }
        default:
            return state
    }
}
initialSoundState={
    isPlaying:false,
}
export const nowPlayingReducer = (state = initialSoundState, action) => {
    const {type,payload } = action

    switch (type) {
        case PLAYING:
            return{
                ...state,
                isPlaying:true,
            }
        case PAUSED:
        return{
            ...state,
            isPlaying:false
        }
        default:
            return state
    }
}
