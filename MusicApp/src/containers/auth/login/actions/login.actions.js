import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_TOKEN_FAILURE,
    GET_TOKEN_REQUEST,GET_TOKEN_SUCCESS
} from './login.actionTypes'


import {APIController,APIControllerWithToken,APIControllerGetToken} from '../../../../network/axios.config'
import errorHandler from '../../../../network/network.errorHandler'
import {AUTH_PATH} from '../../../../network/network.path'
import { Buffer } from 'buffer';

const ClIENT_ID = 'c106055a73514c3d96172527734bc5bd'; // Your client id
const CLIENT_SECRET = '122609d12887460ca60cbd6ddcd0b8c3'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Or Your redirect uri
// export const loginRequest = (email, password) => {
//     return (dispatch, getState) => {
//         dispatch({type: LOGIN_REQUEST})

//         const lang = getState().langReducer.locale

//         let params = JSON.stringify({
//             email: email,
//             password: password,
//         })

//         APIController.post(AUTH_PATH, params)
//             .catch(err => {
//                 dispatch(errorHandler(err))
//                 dispatch({type: LOGIN_FAILURE, payload: null})
//             })
//             .then(res => {
//                 console.log(res)
//                 dispatch({type: LOGIN_SUCCESS, payload: res})
//             })
//     }
// }
export const checkGetToken=()=>{
    return (dispatch)=>{
        dispatch({type:'RECEIVED'})
    }
}
export const cleanCheck=()=>{
    return (dispatch)=>{
        dispatch({type:'CLEAN_CHECK'})
    }
}
export const loginRequest =(access_token,token_type)=>{
    return (dispatch)=>{
        dispatch({type:LOGIN_REQUEST})
        APIControllerWithToken(access_token,token_type).get()
            .catch(err=>{
                dispatch(errorHandler(err))
                dispatch({type:LOGIN_FAILURE,payload:null})
            })
            .then(res=>{
                //console.log(res)
                dispatch({type:LOGIN_SUCCESS,payload:res})
            })
    }   

}
export const loginGetAccessToken=(params)=>{
    return(dispatch)=>{
        dispatch({type:GET_TOKEN_REQUEST})
        fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(ClIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
                })
        .catch(err=>{
            dispatch(errorHandler(err))
            dispatch({type:GET_TOKEN_FAILURE,payload:null})
        })
        .then((res)=>res.json())
        .then(res=>{
            //console.log(res)
            dispatch({type:GET_TOKEN_SUCCESS,payload:res})
        })
    }
}
// export const loginRequest =(access_token,token_type)=>{
//     return dispatch=>{
//         dispatch({type:LOGIN_REQUEST})
//         return  fetch('https://api.spotify.com/v1/me', {
//             method: 'GET',
//             headers: {
//                 'Authorization': token_type+' '+ access_token,  
//             },
//             })
//         .catch(err=>{
//             dispatch(errorHandler(err))
//             dispatch({type:LOGIN_FAILURE,payload:null})
//         })
//         .then(res=>{
//             console.log(res)
//             dispatch({type:LOGIN_SUCCESS,payload:res})
//         })
//     }

// }