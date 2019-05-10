export const hidenMiniDetail=()=>{
    return (dispatch)=>{
        dispatch({type:'HIDEN_MINI'})
    }
}
export const showMiniDetail=()=>{
    return(dispatch)=>{
        dispatch({type:'SHOW_MINI'})
    }
}
export const sendDataMusic=(data)=>{
    return(dispatch)=>{
        dispatch({type:'SEND_DATA',payload:data})
    }
}
export const sendIndexMusic=(index)=>{
    return(dispatch)=>{
        dispatch({type:'SEND_INDEX_MUSIC',payload:index})
    }
}
export const nowPlaying=()=>{
    return (dispatch)=>{
        dispatch({type:'PLAY'})
    }
}