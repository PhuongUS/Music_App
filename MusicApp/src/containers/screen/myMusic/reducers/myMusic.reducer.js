import {ADD_FAVORITE} from '../actions/myMusic.actionType'

const initialDataMusicState={
    items:[],
    loading:false,
    error:null,
}


export const addFavoriteReducer=(state=initialDataMusicState,action)=>{
    if(action.type===ADD_FAVORITE){
        state.items.forEach(item => {
            if(action.payload.id===item.id){
                state.items=state.items.filter(object=>object.id!=item.id)
            }
          });
        return{
          ...state,
          items: state.items.concat(action.payload)
        };  
      
    }
    return state;
}
