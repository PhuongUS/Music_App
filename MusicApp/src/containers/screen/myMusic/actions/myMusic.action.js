import {ADD_FAVORITE} from './myMusic.actionType'
export const addFavorite = (item) => {
    return(dispatch)=>{
        dispatch({type:ADD_FAVORITE,payload:item})
    }
}