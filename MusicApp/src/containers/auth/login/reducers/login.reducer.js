import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_TOKEN_FAILURE,
    GET_TOKEN_REQUEST,
    GET_TOKEN_SUCCESS,
} from '../actions/login.actionTypes'

initialLoginState = {
    isLoading: false,
    error: null,
    data: null,
}

export const loginReducer = (state = initialLoginState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading:false,
                error : 'fail',
            }
        default:
            return state
    }
}
// export const logoutUser=(state=initialLoginState,action)=>{
//     if(action.type='LOGOUT')
//     {
//         return{
//             ...state,
//             isLoading:true,
//             data:null
//         }
//     }

//     return state;
// }

initialTokenState = {
    isLoading: false,
    error: null,
    data: null,
}

export const getTokenReducer = (state = initialTokenState, action) => {
    const {type, payload} = action

    switch (type) {
        case GET_TOKEN_REQUEST:
            return {
                ...state,
                isLoading:true,
            }
        case GET_TOKEN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload,
            }
        case GET_TOKEN_FAILURE:
            return {
                ...state,
                isLoading:false,
                error : 'fail',
            }
        default:
            return state
    }
}
// export const logoutToken=(state=initialTokenState,action)=>{
//     if(action.type=='LOGOUT'){
//         return {
//             ...state,
//             isLoading:true,
//             data:null,
//         }
//     }

//     return state;
// }
initialCheck={
    check:false,
}
export const CheckGetTokenSuccess=(state=initialCheck,action)=>{
    if(action.type=='RECEIVED'){
        return{
            ...state,
            check:true,
        }
    }
    if(action.type=='CLEAN_CHECK'){
        return{
            ...state,
            check:false,
        }
    }
    return state;
}